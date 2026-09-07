import { useEffect } from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';

export interface MenuItem {
  label: string;
  icon?: ComponentType<{ size?: number | string }>;
  onClick: () => void;
  danger?: boolean;
  separator?: boolean;
}

const Panel = styled.div`
  position: fixed;
  z-index: 700;
  min-width: 172px;
  padding: 4px;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(1, 251, 251, 0.08);
`;

const Item = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 7px 10px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: ${({ $danger }) => ($danger ? 'var(--magenta)' : 'var(--text-dim)')};
  text-align: left;
  &:hover {
    background: ${({ $danger }) => ($danger ? 'var(--magenta-dim)' : 'var(--surface-3)')};
    color: ${({ $danger }) => ($danger ? '#fff' : 'var(--text)')};
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 3px 6px;
  background: var(--line-soft);
`;

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

const ContextMenu = ({ x, y, items, onClose }: ContextMenuProps) => {
  useEffect(() => {
    const close = () => onClose();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('pointerdown', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const left = Math.min(x, window.innerWidth - 190);
  const top = Math.min(y, window.innerHeight - (items.length * 34 + 12));

  return (
    <Panel style={{ left, top }} onPointerDown={(e) => e.stopPropagation()}>
      {items.map((item, i) =>
        item.separator ? (
          <Divider key={`sep-${i}`} />
        ) : (
          <Item
            key={item.label}
            $danger={item.danger}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.icon && <item.icon size={13} />}
            {item.label}
          </Item>
        )
      )}
    </Panel>
  );
};

export default ContextMenu;
