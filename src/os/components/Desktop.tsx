import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FilePlus2, FolderPlus, Pencil, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import type { AppId, FsNode } from '../types';
import { useOS } from '../osStore';
import projectsData from '../../data/projects';
import type { Project } from '../../data/projects';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import DesktopIcons from './DesktopIcons';
import CursorTrail from './CursorTrail';
import Sketchpad from './Sketchpad';
import ProjectsWidget from './ProjectsWidget';
import Window from './Window';
import Dock from './Dock';
import BootScreen from './BootScreen';
import LoginScreen from './LoginScreen';
import ContextMenu from './ContextMenu';
import type { MenuItem } from './ContextMenu';

const BAR_H = 32;

const centerBounds = (maxW: number, maxH: number) => {
  const w = Math.min(maxW, window.innerWidth - 32);
  const h = Math.min(maxH, window.innerHeight - BAR_H - 32);
  return {
    w,
    h,
    x: Math.round((window.innerWidth - w) / 2),
    y: Math.max(12, Math.round((window.innerHeight - BAR_H - h) / 2)),
  };
};

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

const Identity = styled.div`
  position: absolute;
  right: 18px;
  bottom: 20px;
  z-index: 30;
  text-align: right;
  pointer-events: none;
  user-select: none;
  opacity: 0.62;
  .name {
    font-family: var(--ui);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.06em;
    color: var(--text);
    text-shadow: 0 0 12px rgba(1, 251, 251, 0.18);
  }
  .role {
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.04em;
    color: var(--text-faint);
    margin-top: 2px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

interface MenuState {
  x: number;
  y: number;
  items: MenuItem[];
}

const Desktop = () => {
  const { t } = useTranslation();
  const os = useOS();
  const { state, open, close, signIn, createNode, renameNode, deleteNode, nodeById, childrenOf } = os;
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [signInOpen, setSignInOpen] = useState(false);
  const [sketchActive, setSketchActive] = useState(false);

  const openWelcome = () => open('welcome', undefined, undefined, centerBounds(520, 470));

  const onBootDone = () => {
    void signIn('guest');
    openWelcome();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || signInOpen || editingId || sketchActive) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      const top = state.windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
      if (top) close(top.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [signInOpen, editingId, sketchActive, state.windows, close]);

  const rootNodes = childrenOf(null);
  const projects = useMemo(() => projectsData(t), [t]);
  const topZ = Math.max(0, ...state.windows.filter((w) => !w.minimized).map((w) => w.z));

  const openProject = (project: Project) =>
    open('browser', { url: `ras://project/${project.id}` }, project.name);

  const beginRename = (node: FsNode) => {
    setDraft(node.name);
    setEditingId(node.id);
  };
  const commitRename = () => {
    if (editingId && draft.trim()) renameNode(editingId, draft.trim());
    setEditingId(null);
  };

  const makeNode = (type: FsNode['type']) => {
    beginRename(createNode(type, null));
  };

  const openNode = (node: FsNode) => {
    if (node.type === 'dir') open('files', { dirId: node.id }, node.name);
    else open('text', { fileId: node.id }, node.name);
  };

  const onSurfaceContext = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.os-window') ||
      target.closest('.os-dock') ||
      target.closest('.os-icon') ||
      target.closest('.os-widget')
    )
      return;
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
        { label: t('os.context.rename'), icon: Pencil, onClick: () => beginRename(node) },
        { label: t('os.context.delete'), icon: Trash2, danger: true, onClick: () => deleteNode(nodeId), separator: false },
      ],
    });
  };

  return (
    <Screen>
      <Wallpaper />

      {state.screen === 'boot' && <BootScreen onDone={onBootDone} />}

      {state.screen === 'desktop' && (
        <>
          <MenuBar onSignIn={() => setSignInOpen(true)} />
          <Surface onContextMenu={onSurfaceContext}>
            <CursorTrail paused={sketchActive} />
            <Sketchpad onActiveChange={setSketchActive} />
            <Identity aria-hidden>
              <div className="name">Rafael Augusto Scherer</div>
              <div className="role">{t('os.about.subtitle')}</div>
            </Identity>
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
            <ProjectsWidget projects={projects} onOpen={openProject} />
            <WindowsLayer>
              {state.windows.map((win) => (
                <Window key={win.id} win={win} active={!win.minimized && win.z === topZ} />
              ))}
            </WindowsLayer>
          </Surface>
          <Dock />
          {signInOpen && <LoginScreen onClose={() => setSignInOpen(false)} />}
        </>
      )}

      {menu && <ContextMenu x={menu.x} y={menu.y} items={menu.items} onClose={() => setMenu(null)} />}
    </Screen>
  );
};

export default Desktop;
