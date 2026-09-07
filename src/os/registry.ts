import type { ComponentType } from 'react';
import {
  AtSign,
  Briefcase,
  FileText,
  Folder,
  FolderOpen,
  Globe,
  Music,
  Sparkles,
  Terminal,
  User,
} from 'lucide-react';
import type { AppId } from './types';

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

export interface AppMeta {
  title: string;
  icon: IconComponent;
  defaultSize: { w: number; h: number };
  onDesktop: boolean;
  inDock: boolean;
}

export const APPS: Record<AppId, AppMeta> = {
  welcome: { title: 'Welcome', icon: Sparkles, defaultSize: { w: 520, h: 460 }, onDesktop: false, inDock: false },
  about: { title: 'About Me', icon: User, defaultSize: { w: 520, h: 470 }, onDesktop: true, inDock: true },
  experience: { title: 'Experience', icon: Briefcase, defaultSize: { w: 580, h: 520 }, onDesktop: true, inDock: true },
  contact: { title: 'Contact', icon: AtSign, defaultSize: { w: 460, h: 340 }, onDesktop: true, inDock: true },
  browser: { title: 'Browser', icon: Globe, defaultSize: { w: 780, h: 540 }, onDesktop: true, inDock: true },
  terminal: { title: 'Terminal', icon: Terminal, defaultSize: { w: 580, h: 380 }, onDesktop: true, inDock: true },
  files: { title: 'Home', icon: FolderOpen, defaultSize: { w: 500, h: 400 }, onDesktop: false, inDock: true },
  music: { title: 'Music', icon: Music, defaultSize: { w: 360, h: 460 }, onDesktop: true, inDock: true },
  text: { title: 'Text Editor', icon: FileText, defaultSize: { w: 520, h: 440 }, onDesktop: false, inDock: false },
};

export const DESKTOP_APPS: AppId[] = (Object.keys(APPS) as AppId[]).filter((id) => APPS[id].onDesktop);
export const DOCK_APPS: AppId[] = (Object.keys(APPS) as AppId[]).filter((id) => APPS[id].inDock);

export { Folder, FileText };
