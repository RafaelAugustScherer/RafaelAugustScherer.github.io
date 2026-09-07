import { createContext, useContext } from 'react';
import type { AppId, FsNode, Screen, WindowBounds } from './types';
import type { State } from './osStore';

export interface OSContextValue {
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
  createNode: (type: FsNode['type'], parentId: string | null, name?: string) => FsNode;
  renameNode: (id: string, name: string) => void;
  writeNode: (id: string, content: string) => void;
  deleteNode: (id: string) => void;
  childrenOf: (parentId: string | null) => FsNode[];
  nodeById: (id: string) => FsNode | undefined;
}

export const OSContext = createContext<OSContextValue | undefined>(undefined);

export const useOS = (): OSContextValue => {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
};
