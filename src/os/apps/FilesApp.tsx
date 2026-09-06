import { useState } from 'react';
import styled from 'styled-components';
import { CornerLeftUp, FilePlus2, FileText, Folder, FolderPlus, Pencil, Trash2 } from 'lucide-react';
import type { WindowInstance } from '../types';
import { useOS } from '../osStore';
import { storageMode } from '../storage';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PathBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  flex: none;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-2);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-dim);
  .seg { color: var(--cyan); }
  .spacer { flex: 1; }
`;

const ToolBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10.5px;
  padding: 3px 8px;
  border: 1px solid var(--cyan-dim);
  color: var(--cyan);
  &:hover { background: var(--cyan); color: #04121a; }
`;

const List = styled.div`
  flex: 1;
  overflow: auto;
  padding: 5px 0;
  min-height: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-dim);
  cursor: default;
  .glyph { flex: none; display: grid; place-items: center; }
  .name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .actions { display: none; gap: 4px; flex: none; }
  &:hover { background: var(--surface-2); color: var(--text); }
  &:hover .actions { display: flex; }
  input {
    flex: 1;
    background: var(--ground);
    border: 1px solid var(--cyan-dim);
    color: var(--text);
    font-family: var(--mono);
    font-size: 12px;
    padding: 2px 6px;
    outline: none;
  }
`;

const IconBtn = styled.button`
  width: 22px;
  height: 20px;
  display: grid;
  place-items: center;
  color: var(--text-faint);
  border: 1px solid transparent;
  &:hover { color: var(--cyan); border-color: var(--line); }
  &.danger:hover { color: var(--magenta); }
`;

const Status = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 11px;
  border-top: 1px solid var(--line-soft);
  background: var(--surface-2);
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--text-faint);
  .pub { color: var(--amber); border: 1px solid rgba(255, 179, 64, 0.4); padding: 1px 6px; }
  .spacer { flex: 1; }
`;

const FilesApp = ({ win }: { win: WindowInstance }) => {
  const { childrenOf, nodeById, createNode, renameNode, deleteNode, open } = useOS();
  const dirId = (win.props.dirId as string | undefined) ?? null;
  const dirNode = dirId ? nodeById(dirId) : null;
  const items = childrenOf(dirId);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const startEdit = (id: string, name: string) => {
    setEditing(id);
    setDraft(name);
  };
  const commitEdit = () => {
    if (editing && draft.trim()) renameNode(editing, draft.trim());
    setEditing(null);
  };

  const openItem = (id: string) => {
    const node = nodeById(id);
    if (!node) return;
    if (node.type === 'dir') open('files', { dirId: id }, node.name);
    else open('text', { fileId: id }, node.name);
  };

  const create = (type: 'file' | 'dir') => {
    const id = createNode(type, dirId);
    startEdit(id, type === 'dir' ? 'New Folder' : 'New File.txt');
  };

  return (
    <Wrap>
      <PathBar>
        <span className="seg">~</span>
        {dirNode && (
          <>
            /<span className="seg">{dirNode.name}</span>
          </>
        )}
        <span className="spacer" />
        <ToolBtn onClick={() => create('file')}>
          <FilePlus2 size={12} /> File
        </ToolBtn>
        <ToolBtn onClick={() => create('dir')}>
          <FolderPlus size={12} /> Folder
        </ToolBtn>
      </PathBar>
      <List>
        {dirNode && (
          <Row onDoubleClick={() => open('files', { dirId: dirNode.parentId }, dirNode.parentId ? '' : 'Home')}>
            <span className="glyph">
              <CornerLeftUp size={15} color="var(--text-faint)" />
            </span>
            <span className="name">..</span>
          </Row>
        )}
        {items.map((node) => (
          <Row key={node.id} onDoubleClick={() => editing !== node.id && openItem(node.id)}>
            <span className="glyph">
              {node.type === 'dir' ? (
                <Folder size={15} color="var(--amber)" />
              ) : (
                <FileText size={15} color="var(--cyan)" />
              )}
            </span>
            {editing === node.id ? (
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitEdit();
                  if (e.key === 'Escape') setEditing(null);
                }}
              />
            ) : (
              <span className="name" onClick={() => openItem(node.id)}>
                {node.name}
              </span>
            )}
            <span className="actions">
              <IconBtn aria-label="Rename" onClick={() => startEdit(node.id, node.name)}>
                <Pencil size={13} />
              </IconBtn>
              <IconBtn className="danger" aria-label="Delete" onClick={() => deleteNode(node.id)}>
                <Trash2 size={13} />
              </IconBtn>
            </span>
          </Row>
        ))}
      </List>
      <Status>
        <span>{items.length} items</span>
        <span className="pub">public</span>
        <span className="spacer" />
        <span>{storageMode() === 'worker' ? 'synced · worker' : 'local · this browser'}</span>
      </Status>
    </Wrap>
  );
};

export default FilesApp;
