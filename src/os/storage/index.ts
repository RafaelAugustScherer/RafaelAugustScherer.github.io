import type { FsNode, UserData } from '../types';

const BASE = (import.meta.env.VITE_STORAGE_URL as string | undefined)?.replace(/\/$/, '');
const cacheKey = (user: string) => `rasos:fs:${user}`;

const readCache = (user: string): FsNode[] | null => {
  try {
    const raw = localStorage.getItem(cacheKey(user));
    if (!raw) return null;
    const data = JSON.parse(raw) as UserData;
    return Array.isArray(data.nodes) ? data.nodes : null;
  } catch {
    return null;
  }
};

const writeCache = (user: string, nodes: FsNode[]) => {
  try {
    localStorage.setItem(cacheKey(user), JSON.stringify({ version: 1, nodes } satisfies UserData));
  } catch {
    /* quota or private mode: cache is best-effort */
  }
};

export const loadUser = async (user: string): Promise<FsNode[] | null> => {
  if (BASE) {
    try {
      const res = await fetch(`${BASE}/fs/${encodeURIComponent(user)}`);
      if (res.ok) {
        const data = (await res.json()) as UserData;
        const nodes = Array.isArray(data.nodes) ? data.nodes : [];
        writeCache(user, nodes);
        return nodes;
      }
    } catch {
      /* fall through to cache */
    }
  }
  return readCache(user);
};

export const saveUser = async (user: string, nodes: FsNode[]): Promise<void> => {
  writeCache(user, nodes);
  if (!BASE) return;
  try {
    await fetch(`${BASE}/fs/${encodeURIComponent(user)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ version: 1, nodes } satisfies UserData),
    });
  } catch {
    /* offline: the cache already has the latest, will resync on next save */
  }
};

export const clearUser = (user: string): void => {
  try {
    localStorage.removeItem(cacheKey(user));
  } catch {
    /* private mode: nothing to clear */
  }
};

export const storageMode = (): 'worker' | 'local' => (BASE ? 'worker' : 'local');
