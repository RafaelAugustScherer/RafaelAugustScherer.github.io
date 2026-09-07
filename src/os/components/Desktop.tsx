import { useState } from 'react';
import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FilePlus2, FolderPlus, Pencil, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import type { AppId, FsNode } from '../types';
import { useOS } from '../osStore';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import DesktopIcons from './DesktopIcons';
import Window from './Window';
import Dock from './Dock';
import PrivacyDialog from './PrivacyDialog';
import LoginScreen from './LoginScreen';
import ContextMenu from './ContextMenu';
import type { MenuItem } from './ContextMenu';

const Screen = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--ground);
`;

const Surface = styled.div`
  position: absolute;
  top: var(--bar-h);
  left: 0;
  right: 0;
  bottom: 0;
`;

const WindowsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 100;
  pointer-events: none;
`;

interface MenuState {
  x: number;
  y: number;
  items: MenuItem[];
}

const Desktop = () => {
  const { t } = useTranslation();
  const os = useOS();
  const { state, open, createNode, renameNode, deleteNode, nodeById, childrenOf } = os;
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const rootNodes = childrenOf(null);
  const topZ = Math.max(0, ...state.windows.filter((w) => !w.minimized).map((w) => w.z));

  const beginRename = (id: string) => {
    const node = nodeById(id);
    if (!node) return;
    setDraft(node.name);
    setEditingId(id);
  };
  const commitRename = () => {
    if (editingId && draft.trim()) renameNode(editingId, draft.trim());
    setEditingId(null);
  };

  const makeNode = (type: FsNode['type']) => {
    const id = createNode(type, null);
    beginRename(id);
  };

  const openNode = (node: FsNode) => {
    if (node.type === 'dir') open('files', { dirId: node.id }, node.name);
    else open('text', { fileId: node.id }, node.name);
  };

  const onSurfaceContext = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.os-window') || target.closest('.os-dock') || target.closest('.os-icon')) return;
    e.preventDefault();
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: t('os.context.newFile'), icon: FilePlus2, onClick: () => makeNode('file') },
        { label: t('os.context.newFolder'), icon: FolderPlus, onClick: () => makeNode('dir') },
      ],
    });
  };

  const onNodeContext = (e: MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const node = nodeById(nodeId);
    if (!node) return;
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: t('os.context.open'), icon: SquareArrowOutUpRight, onClick: () => openNode(node) },
        { label: t('os.context.rename'), icon: Pencil, onClick: () => beginRename(nodeId) },
        { label: t('os.context.delete'), icon: Trash2, danger: true, onClick: () => deleteNode(nodeId), separator: false },
      ],
    });
  };

  return (
    <Screen>
      <Wallpaper />

      {state.screen === 'privacy' && <PrivacyDialog />}
      {state.screen === 'login' && <LoginScreen />}

      {state.screen === 'desktop' && (
        <>
          <MenuBar />
          <Surface onContextMenu={onSurfaceContext}>
            <DesktopIcons
              userNodes={rootNodes}
              editingId={editingId}
              draft={draft}
              onDraft={setDraft}
              onCommit={commitRename}
              onCancel={() => setEditingId(null)}
              onOpenApp={(appId: AppId) => open(appId)}
              onOpenNode={openNode}
              onContextNode={onNodeContext}
            />
            <WindowsLayer>
              {state.windows.map((win) => (
                <Window key={win.id} win={win} active={!win.minimized && win.z === topZ} />
              ))}
            </WindowsLayer>
          </Surface>
          <Dock />
        </>
      )}

      {menu && <ContextMenu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
    </Screen>
  );
};

export default Desktop;
