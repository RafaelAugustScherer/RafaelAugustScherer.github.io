import styled from 'styled-components';
import type { AppId } from '../types';
import { APPS, DOCK_APPS } from '../registry';
import { useOS } from '../osStore';

const Bar = styled.div`
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  gap: 4px;
  padding: 6px;
  max-width: calc(100vw - 28px);
  overflow-x: auto;
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
  const { state, open, focus, minimize } = useOS();

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
    <Bar className="os-dock">
      {DOCK_APPS.map((appId) => {
        const Glyph = APPS[appId].icon;
        return (
          <Btn
            key={appId}
            $open={windowsFor(appId).length > 0}
            title={APPS[appId].title}
            aria-label={APPS[appId].title}
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
