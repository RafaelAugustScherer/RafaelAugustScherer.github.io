import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FileText, Folder } from 'lucide-react';
import type { AppId, FsNode } from '../types';
import { APPS, DESKTOP_APPS } from '../registry';

const Layer = styled.div`
  position: absolute;
  top: calc(var(--bar-h) + 14px);
  left: 12px;
  bottom: 90px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 4px;
`;

const Icon = styled.div`
  width: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 9px 4px 7px;
  border: 1px solid transparent;
  border-radius: 3px;
  text-align: center;
  cursor: default;
  user-select: none;
  &:hover { background: rgba(1, 251, 251, 0.09); border-color: var(--line); }
  .glyph {
    width: 42px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    background: var(--surface);
    box-shadow: inset 0 0 14px rgba(1, 251, 251, 0.1);
  }
  .label {
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--text-dim);
    line-height: 1.3;
    max-width: 100%;
    word-break: break-word;
  }
  input {
    width: 78px;
    background: var(--ground);
    border: 1px solid var(--cyan-dim);
    color: var(--text);
    font-family: var(--mono);
    font-size: 10.5px;
    text-align: center;
    outline: none;
    padding: 1px 2px;
  }
`;

interface DesktopIconsProps {
  userNodes: FsNode[];
  editingId: string | null;
  draft: string;
  onDraft: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  onOpenApp: (appId: AppId) => void;
  onOpenNode: (node: FsNode) => void;
  onContextNode: (e: MouseEvent, nodeId: string) => void;
}

const DesktopIcons = ({
  userNodes,
  editingId,
  draft,
  onDraft,
  onCommit,
  onCancel,
  onOpenApp,
  onOpenNode,
  onContextNode,
}: DesktopIconsProps) => {
  const { t } = useTranslation();
  return (
  <Layer>
    {DESKTOP_APPS.map((appId) => {
      const meta = APPS[appId];
      const Glyph = meta.icon;
      const label = t(`os.apps.${appId}`);
      return (
        <Icon className="os-icon" key={appId} onDoubleClick={() => onOpenApp(appId)} title={label}>
          <span className="glyph">
            <Glyph size={19} className="" />
          </span>
          <span className="label">{label}</span>
        </Icon>
      );
    })}
    {userNodes.map((node) => (
      <Icon
        className="os-icon"
        key={node.id}
        onDoubleClick={() => editingId !== node.id && onOpenNode(node)}
        onContextMenu={(e) => onContextNode(e, node.id)}
        title={node.name}
      >
        <span className="glyph">
          {node.type === 'dir' ? (
            <Folder size={19} color="var(--amber)" />
          ) : (
            <FileText size={19} color="var(--cyan)" />
          )}
        </span>
        {editingId === node.id ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => onDraft(e.target.value)}
            onBlur={onCommit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onCommit();
              if (e.key === 'Escape') onCancel();
            }}
            onDoubleClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="label">{node.name}</span>
        )}
      </Icon>
    ))}
  </Layer>
  );
};

export default DesktopIcons;
