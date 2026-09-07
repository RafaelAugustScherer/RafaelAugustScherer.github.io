export type AppId =
  | 'welcome'
  | 'about'
  | 'experience'
  | 'contact'
  | 'terminal'
  | 'browser'
  | 'files'
  | 'text'
  | 'music';

export type Screen = 'boot' | 'desktop';

export interface WindowBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; w: number; h: number };
  props: Record<string, unknown>;
}

export type FsNodeType = 'file' | 'dir';

export interface FsNode {
  id: string;
  name: string;
  type: FsNodeType;
  parentId: string | null;
  content: string;
  createdAt: number;
}

export interface UserData {
  version: 1;
  nodes: FsNode[];
}
