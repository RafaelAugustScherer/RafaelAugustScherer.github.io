import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, ComponentType } from 'react';
import styled from 'styled-components';
import { Minus, Square, X } from 'lucide-react';
import type { AppId, WindowInstance } from '../types';
import { useOS } from '../osStore';
import AboutApp from '../apps/AboutApp';
import ExperienceApp from '../apps/ExperienceApp';
import ContactApp from '../apps/ContactApp';
import TerminalApp from '../apps/TerminalApp';
import ProjectsApp from '../apps/ProjectsApp';
import BrowserApp from '../apps/BrowserApp';
import FilesApp from '../apps/FilesApp';
import TextApp from '../apps/TextApp';
import MusicApp from '../apps/MusicApp';

const BAR_H = 32;
const MIN_W = 280;
const MIN_H = 170;

const APP_VIEWS: Record<AppId, ComponentType<{ win: WindowInstance }>> = {
  about: AboutApp,
  experience: ExperienceApp,
  contact: ContactApp,
  terminal: TerminalApp,
  projects: ProjectsApp,
  browser: BrowserApp,
  files: FilesApp,
  text: TextApp,
  music: MusicApp,
};

const Frame = styled.div<{ $active: boolean }>`
  position: absolute;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid ${({ $active }) => ($active ? 'var(--cyan-dim)' : 'var(--line)')};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 20px 50px rgba(0,0,0,.66), 0 0 0 1px rgba(1,251,251,.20), 0 0 26px rgba(1,251,251,.12)'
      : '0 16px 40px rgba(0,0,0,.6)'};
  overflow: hidden;
`;

const Bar = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 27px;
  padding: 0 6px 0 10px;
  flex: none;
  cursor: grab;
  user-select: none;
  background-color: ${({ $active }) => ($active ? 'var(--chrome-active)' : 'var(--chrome)')};
  background-image: repeating-linear-gradient(
    0deg,
    ${({ $active }) => ($active ? 'rgba(1,251,251,.14)' : 'rgba(255,255,255,.06)')} 0 1px,
    transparent 1px 3px
  );
  border-bottom: 1px solid var(--line-soft);
  &:active { cursor: grabbing; }
`;

const Title = styled.span<{ $active: boolean }>`
  flex: 1;
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.03em;
  color: ${({ $active }) => ($active ? 'var(--text)' : 'var(--text-dim)')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Btns = styled.div`
  display: flex;
  gap: 4px;
  flex: none;
`;

const WinBtn = styled.button<{ $danger?: boolean }>`
  width: 16px;
  height: 15px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  background: var(--surface-2);
  color: var(--text-faint);
  &:hover {
    color: #fff;
    background: ${({ $danger }) => ($danger ? 'var(--magenta-dim)' : 'var(--surface-3)')};
    border-color: ${({ $danger }) => ($danger ? 'var(--magenta)' : 'var(--line)')};
  }
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
`;

const Grip = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: repeating-linear-gradient(135deg, transparent 0 2px, var(--line) 2px 3px);
  z-index: 5;
`;

interface WindowProps {
  win: WindowInstance;
  active: boolean;
}

const Window = ({ win, active }: WindowProps) => {
  const { focus, close, minimize, toggleMax, move, resize } = useOS();
  const dragState = useRef({ ox: 0, oy: 0 });
  const View = APP_VIEWS[win.appId];

  const surfaceBounds = () => ({
    w: window.innerWidth,
    h: window.innerHeight - BAR_H,
  });

  const capture = (
    el: HTMLElement,
    pointerId: number,
    onMove: (e: PointerEvent) => void
  ) => {
    el.setPointerCapture(pointerId);
    const onUp = () => {
      el.releasePointerCapture(pointerId);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
  };

  const onDragDown = (e: ReactPointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (win.maximized) return;
    focus(win.id);
    dragState.current = { ox: e.clientX - win.x, oy: e.clientY - win.y - BAR_H };
    const bounds = surfaceBounds();
    capture(e.currentTarget as HTMLElement, e.pointerId, (ev) => {
      const nx = Math.max(0, Math.min(bounds.w - 60, ev.clientX - dragState.current.ox));
      const ny = Math.max(0, Math.min(bounds.h - 30, ev.clientY - BAR_H - dragState.current.oy));
      move(win.id, nx, ny);
    });
  };

  const onResizeDown = (e: ReactPointerEvent) => {
    e.stopPropagation();
    focus(win.id);
    const sx = e.clientX;
    const sy = e.clientY;
    const sw = win.w;
    const sh = win.h;
    capture(e.currentTarget as HTMLElement, e.pointerId, (ev) => {
      resize(win.id, Math.max(MIN_W, sw + ev.clientX - sx), Math.max(MIN_H, sh + ev.clientY - sy));
    });
  };

  return (
    <Frame
      className="os-window"
      $active={active}
      style={{
        left: win.x,
        top: win.y + BAR_H,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      onPointerDown={() => focus(win.id)}
    >
      <Bar
        $active={active}
        onPointerDown={onDragDown}
        onDoubleClick={() => toggleMax(win.id, surfaceBounds())}
      >
        <Title $active={active}>{win.title}</Title>
        <Btns>
          <WinBtn aria-label="Minimize" onClick={() => minimize(win.id)}>
            <Minus size={9} />
          </WinBtn>
          <WinBtn aria-label="Maximize" onClick={() => toggleMax(win.id, surfaceBounds())}>
            <Square size={8} />
          </WinBtn>
          <WinBtn $danger aria-label="Close" onClick={() => close(win.id)}>
            <X size={9} />
          </WinBtn>
        </Btns>
      </Bar>
      <Body>
        <View win={win} />
      </Body>
      {!win.maximized && <Grip onPointerDown={onResizeDown} />}
    </Frame>
  );
};

export default Window;
