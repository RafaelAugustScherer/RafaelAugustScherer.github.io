import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, ComponentType } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Minus, Square, X } from 'lucide-react';
import type { AppId, WindowInstance } from '../types';
import { APPS } from '../registry';
import { useOS } from '../osStore';
import WelcomeApp from '../apps/WelcomeApp';
import AboutApp from '../apps/AboutApp';
import ExperienceApp from '../apps/ExperienceApp';
import ContactApp from '../apps/ContactApp';
import TerminalApp from '../apps/TerminalApp';
import BrowserApp from '../apps/BrowserApp';
import FilesApp from '../apps/FilesApp';
import TextApp from '../apps/TextApp';
import MusicApp from '../apps/MusicApp';

const BAR_H = 32;
const MIN_W = 280;
const MIN_H = 170;

const APP_VIEWS: Record<AppId, ComponentType<{ win: WindowInstance }>> = {
  welcome: WelcomeApp,
  about: AboutApp,
  experience: ExperienceApp,
  contact: ContactApp,
  terminal: TerminalApp,
  browser: BrowserApp,
  files: FilesApp,
  text: TextApp,
  music: MusicApp,
};

type Anim = 'in' | 'out-close' | 'out-min' | 'idle';

const winIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(6px); }
  to { opacity: 1; transform: none; }
`;

const winClose = keyframes`
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: scale(0.96) translateY(6px); }
`;

const winMin = keyframes`
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: scale(0.82) translateY(80px); }
`;

const Frame = styled.div<{ $active: boolean; $anim: Anim }>`
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
  transform-origin: center top;
  animation: ${({ $anim }) =>
    $anim === 'in'
      ? css`${winIn} 0.18s ease-out`
      : $anim === 'out-close'
        ? css`${winClose} 0.16s ease-in forwards`
        : $anim === 'out-min'
          ? css`${winMin} 0.18s ease-in forwards`
          : 'none'};
`;

const Bar = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 27px;
  padding: 0 0 0 10px;
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
  gap: 1px;
  flex: none;
`;

const WinBtn = styled.button<{ $danger?: boolean }>`
  width: 22px;
  height: 19px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  background: var(--surface-2);
  color: var(--text-faint);
  transition: background 0.12s ease, border-color 0.12s ease;
  svg { display: block; }
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
  const { t } = useTranslation();
  const { focus, close, minimize, toggleMax, move, resize } = useOS();
  const dragState = useRef({ ox: 0, oy: 0 });
  const View = APP_VIEWS[win.appId];
  const title = win.title === APPS[win.appId].title ? t(`os.apps.${win.appId}`) : win.title;

  const [anim, setAnim] = useState<Anim>('in');
  const exitTimer = useRef<number | undefined>(undefined);
  const prevMin = useRef(win.minimized);
  useEffect(() => {
    if (prevMin.current && !win.minimized) setAnim('in');
    prevMin.current = win.minimized;
  }, [win.minimized]);
  useEffect(() => () => window.clearTimeout(exitTimer.current), []);

  const requestMinimize = () => {
    setAnim('out-min');
    window.clearTimeout(exitTimer.current);
    exitTimer.current = window.setTimeout(() => {
      minimize(win.id);
      setAnim('idle');
    }, 180);
  };

  const requestClose = () => {
    setAnim('out-close');
    window.clearTimeout(exitTimer.current);
    exitTimer.current = window.setTimeout(() => close(win.id), 160);
  };

  const hidden = win.minimized && anim !== 'out-min';

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
      $anim={anim}
      style={{
        left: win.x,
        top: win.y + BAR_H,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        display: hidden ? 'none' : 'flex',
      }}
      onPointerDown={() => focus(win.id)}
    >
      <Bar
        $active={active}
        onPointerDown={onDragDown}
        onDoubleClick={() => toggleMax(win.id, surfaceBounds())}
      >
        <Title $active={active}>{title}</Title>
        <Btns>
          <WinBtn aria-label={t('os.window.minimize')} onClick={requestMinimize}>
            <Minus size={11} />
          </WinBtn>
          <WinBtn aria-label={t('os.window.maximize')} onClick={() => toggleMax(win.id, surfaceBounds())}>
            <Square size={9} />
          </WinBtn>
          <WinBtn $danger aria-label={t('os.window.close')} onClick={requestClose}>
            <X size={11} />
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
