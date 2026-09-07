import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { AppId } from '../types';
import { APPS, DOCK_APPS } from '../registry';
import { useOS } from '../osContext';

const MAGNIFY_RANGE = 96;
const MAGNIFY_AMP = 0.34;
const MAGNIFY_LIFT = 9;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const Bar = styled.div`
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 6px;
  max-width: calc(100vw - 28px);
  overflow: visible;
  background: rgba(28, 23, 52, 0.94);
  backdrop-filter: blur(11px);
  border: 1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(1, 251, 251, 0.1), 0 0 22px rgba(1, 251, 251, 0.07);
`;

const Btn = styled.button<{ $open: boolean }>`
  position: relative;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: ${({ $open }) => ($open ? 'var(--cyan)' : '#c6bfe6')};
  border: 1px solid transparent;
  flex: none;
  transform-origin: bottom center;
  transition: transform 0.13s ease, background 0.13s ease, color 0.13s ease;
  will-change: transform;
  @media (prefers-reduced-motion: reduce) {
    transition: background 0.13s ease, color 0.13s ease;
  }
  &:hover { background: var(--surface-3); color: var(--cyan); border-color: var(--line); }
  &::after {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 2px;
    background: ${({ $open }) => ($open ? 'var(--cyan)' : 'transparent')};
    box-shadow: ${({ $open }) => ($open ? '0 0 7px var(--cyan)' : 'none')};
  }
`;

const Dock = () => {
  const { t } = useTranslation();
  const { state, open, focus, minimize } = useOS();
  const barRef = useRef<HTMLDivElement>(null);

  const btnsOf = () =>
    barRef.current ? Array.from(barRef.current.querySelectorAll<HTMLElement>('.dock-btn')) : [];

  const onMove = (e: ReactPointerEvent) => {
    if (prefersReducedMotion()) return;
    const x = e.clientX;
    btnsOf().forEach((btn) => {
      const r = btn.getBoundingClientRect();
      const dist = Math.abs(x - (r.left + r.width / 2));
      const t = Math.max(0, 1 - dist / MAGNIFY_RANGE);
      btn.style.transform = `translateY(${-MAGNIFY_LIFT * t}px) scale(${1 + MAGNIFY_AMP * t})`;
    });
  };

  const onLeave = () => {
    btnsOf().forEach((btn) => {
      btn.style.transform = '';
    });
  };

  const windowsFor = (appId: AppId) => state.windows.filter((w) => w.appId === appId);

  const onClick = (appId: AppId) => {
    const wins = windowsFor(appId);
    if (wins.length === 0) {
      open(appId);
      return;
    }
    const visible = wins.filter((w) => !w.minimized);
    if (visible.length === 0) {
      focus(wins[0].id);
      return;
    }
    const top = [...visible].sort((a, b) => b.z - a.z)[0];
    const isFrontmost = state.windows.every((w) => w.minimized || w.z <= top.z);
    if (isFrontmost) minimize(top.id);
    else focus(top.id);
  };

  return (
    <Bar className="os-dock" ref={barRef} onPointerMove={onMove} onPointerLeave={onLeave}>
      {DOCK_APPS.map((appId) => {
        const Glyph = APPS[appId].icon;
        return (
          <Btn
            key={appId}
            className="dock-btn"
            $open={windowsFor(appId).length > 0}
            title={t(`os.apps.${appId}`)}
            aria-label={t(`os.apps.${appId}`)}
            onClick={() => onClick(appId)}
          >
            <Glyph size={20} className="" />
          </Btn>
        );
      })}
    </Bar>
  );
};

export default Dock;
