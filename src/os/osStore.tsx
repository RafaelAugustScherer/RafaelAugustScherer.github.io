import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import type { ReactNode } from 'react';
import type { AppId, FsNode, Screen, WindowBounds, WindowInstance } from './types';
import { APPS } from './registry';
import { clearUser, loadUser, saveUser } from './storage';

const uid = () => crypto.randomUUID();

const MULTI_APPS: ReadonlySet<AppId> = new Set(['files', 'text']);

const keyOf = (appId: AppId, props: Record<string, unknown>): string => {
  if (appId === 'files') return `files:${(props.dirId as string) ?? 'home'}`;
  if (appId === 'text') return `text:${props.fileId as string}`;
  return appId;
};

const seedNodes = (): FsNode[] => {
  const now = Date.now();
  return [
    {
      id: uid(),
      name: 'Documents',
      type: 'dir',
      parentId: null,
      content: '',
      createdAt: now,
    },
  ];
};

interface State {
  screen: Screen;
  user: string | null;
  windows: WindowInstance[];
  nodes: FsNode[];
  nextZ: number;
}

type Action =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'LOGIN'; user: string; nodes: FsNode[] }
  | { type: 'LOGOUT' }
  | { type: 'OPEN'; appId: AppId; title?: string; props?: Record<string, unknown>; bounds?: WindowBounds }
  | { type: 'CLOSE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'TOGGLE_MAX'; id: string; bounds: { w: number; h: number } }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'RESIZE'; id: string; w: number; h: number }
  | { type: 'SET_PROPS'; id: string; props: Record<string, unknown>; title?: string }
  | { type: 'FS_ADD'; node: FsNode }
  | { type: 'FS_RENAME'; id: string; name: string }
  | { type: 'FS_WRITE'; id: string; content: string }
  | { type: 'FS_DELETE'; id: string };

const initialState: State = {
  screen: 'boot',
  user: null,
  windows: [],
  nodes: [],
  nextZ: 10,
};

const focusWindow = (state: State, id: string): State => {
  const z = state.nextZ + 1;
  return {
    ...state,
    nextZ: z,
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, z, minimized: false } : w
    ),
  };
};

const openWindow = (state: State, action: Extract<Action, { type: 'OPEN' }>): State => {
  const props = action.props ?? {};
  const key = keyOf(action.appId, props);
  const existing = state.windows.find((w) => keyOf(w.appId, w.props) === key);
  if (existing && !MULTI_APPS.has(action.appId)) {
    const focused = focusWindow(state, existing.id);
    return {
      ...focused,
      windows: focused.windows.map((w) =>
        w.id === existing.id
          ? { ...w, props: { ...w.props, ...props }, title: action.title ?? w.title }
          : w
      ),
    };
  }
  if (existing) {
    return focusWindow(state, existing.id);
  }

  const def = APPS[action.appId];
  const count = state.windows.length;
  const z = state.nextZ + 1;
  const win: WindowInstance = {
    id: uid(),
    appId: action.appId,
    title: action.title ?? def.title,
    x: action.bounds ? action.bounds.x : 120 + (count % 6) * 34,
    y: action.bounds ? action.bounds.y : 60 + (count % 6) * 28,
    w: action.bounds ? action.bounds.w : def.defaultSize.w,
    h: action.bounds ? action.bounds.h : def.defaultSize.h,
    z,
    minimized: false,
    maximized: false,
    props,
  };
  return { ...state, nextZ: z, windows: [...state.windows, win] };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        nodes: action.nodes,
        windows: [],
        screen: 'desktop',
      };
    case 'LOGOUT':
      return { ...state, user: null, windows: [], nodes: [], screen: 'boot' };
    case 'OPEN':
      return openWindow(state, action);
    case 'CLOSE':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) };
    case 'FOCUS':
      return focusWindow(state, action.id);
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case 'TOGGLE_MAX':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized && w.prev) {
            return { ...w, maximized: false, ...w.prev, prev: undefined };
          }
          return {
            ...w,
            maximized: true,
            prev: { x: w.x, y: w.y, w: w.w, h: w.h },
            x: 0,
            y: 0,
            w: action.bounds.w,
            h: action.bounds.h,
          };
        }),
      };
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, w: action.w, h: action.h } : w
        ),
      };
    case 'SET_PROPS':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, props: { ...w.props, ...action.props }, title: action.title ?? w.title }
            : w
        ),
      };
    case 'FS_ADD':
      return { ...state, nodes: [...state.nodes, action.node] };
    case 'FS_RENAME':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.id ? { ...n, name: action.name } : n
        ),
      };
    case 'FS_WRITE':
      return {
        ...state,
        nodes: state.nodes.map((n) =>
          n.id === action.id ? { ...n, content: action.content } : n
        ),
      };
    case 'FS_DELETE': {
      const removed = new Set<string>([action.id]);
      let grew = true;
      while (grew) {
        grew = false;
        for (const n of state.nodes) {
          if (n.parentId && removed.has(n.parentId) && !removed.has(n.id)) {
            removed.add(n.id);
            grew = true;
          }
        }
      }
      return { ...state, nodes: state.nodes.filter((n) => !removed.has(n.id)) };
    }
    default:
      return state;
  }
};

interface OSContextValue {
  state: State;
  setScreen: (screen: Screen) => void;
  signIn: (user: string) => Promise<void>;
  signOut: () => void;
  open: (appId: AppId, props?: Record<string, unknown>, title?: string, bounds?: WindowBounds) => void;
  openBrowser: (url: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string, bounds: { w: number; h: number }) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  setProps: (id: string, props: Record<string, unknown>, title?: string) => void;
  createNode: (type: FsNode['type'], parentId: string | null, name?: string) => string;
  renameNode: (id: string, name: string) => void;
  writeNode: (id: string, content: string) => void;
  deleteNode: (id: string) => void;
  childrenOf: (parentId: string | null) => FsNode[];
  nodeById: (id: string) => FsNode | undefined;
}

const OSContext = createContext<OSContextValue | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveTimer = useRef<number | undefined>(undefined);
  const dirty = useRef(false);

  const signIn = useCallback(async (user: string) => {
    if (user === 'guest') {
      clearUser('guest');
      dispatch({ type: 'LOGIN', user, nodes: seedNodes() });
      return;
    }
    const loaded = await loadUser(user);
    dispatch({ type: 'LOGIN', user, nodes: loaded ?? seedNodes() });
  }, []);

  useEffect(() => {
    if (!state.user || state.user === 'guest' || !dirty.current) return;
    window.clearTimeout(saveTimer.current);
    const user = state.user;
    const nodes = state.nodes;
    saveTimer.current = window.setTimeout(() => {
      void saveUser(user, nodes);
    }, 400);
    return () => window.clearTimeout(saveTimer.current);
  }, [state.nodes, state.user]);

  const uniqueName = useCallback(
    (base: string, ext: string, parentId: string | null) => {
      const siblings = state.nodes.filter((n) => n.parentId === parentId);
      let name = `${base}${ext}`;
      let i = 1;
      while (siblings.some((n) => n.name === name)) {
        i += 1;
        name = `${base} ${i}${ext}`;
      }
      return name;
    },
    [state.nodes]
  );

  const value = useMemo<OSContextValue>(() => {
    const markDirty = () => {
      dirty.current = true;
    };
    return {
      state,
      setScreen: (screen) => dispatch({ type: 'SET_SCREEN', screen }),
      signIn,
      signOut: () => dispatch({ type: 'LOGOUT' }),
      open: (appId, props, title, bounds) => dispatch({ type: 'OPEN', appId, props, title, bounds }),
      openBrowser: (url) => dispatch({ type: 'OPEN', appId: 'browser', props: { url } }),
      close: (id) => dispatch({ type: 'CLOSE', id }),
      focus: (id) => dispatch({ type: 'FOCUS', id }),
      minimize: (id) => dispatch({ type: 'MINIMIZE', id }),
      toggleMax: (id, bounds) => dispatch({ type: 'TOGGLE_MAX', id, bounds }),
      move: (id, x, y) => dispatch({ type: 'MOVE', id, x, y }),
      resize: (id, w, h) => dispatch({ type: 'RESIZE', id, w, h }),
      setProps: (id, props, title) => dispatch({ type: 'SET_PROPS', id, props, title }),
      createNode: (type, parentId, name) => {
        markDirty();
        const finalName =
          name ??
          (type === 'dir'
            ? uniqueName('New Folder', '', parentId)
            : uniqueName('New File', '.txt', parentId));
        const node: FsNode = {
          id: uid(),
          name: finalName,
          type,
          parentId,
          content: '',
          createdAt: Date.now(),
        };
        dispatch({ type: 'FS_ADD', node });
        return node.id;
      },
      renameNode: (id, name) => {
        markDirty();
        dispatch({ type: 'FS_RENAME', id, name });
      },
      writeNode: (id, content) => {
        markDirty();
        dispatch({ type: 'FS_WRITE', id, content });
      },
      deleteNode: (id) => {
        markDirty();
        dispatch({ type: 'FS_DELETE', id });
      },
      childrenOf: (parentId) =>
        state.nodes
          .filter((n) => n.parentId === parentId)
          .sort((a, b) => {
            if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
            return a.name.localeCompare(b.name);
          }),
      nodeById: (id) => state.nodes.find((n) => n.id === id),
    };
  }, [state, signIn, uniqueName]);

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};

export const useOS = (): OSContextValue => {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
};
