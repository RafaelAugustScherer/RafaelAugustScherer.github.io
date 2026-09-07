export interface Env {
  USER_STORE: DurableObjectNamespace;
}

const MAX_BODY = 256 * 1024;

const CORS: Record<string, string> = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, PUT, OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
};

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...CORS },
  });

const text = (body: string, status: number): Response =>
  new Response(body, { status, headers: CORS });

export class UserStore {
  private storage: DurableObjectStorage;

  constructor(state: DurableObjectState) {
    this.storage = state.storage;
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method === 'GET') {
      const data = (await this.storage.get('data')) ?? { version: 1, nodes: [] };
      return json(data);
    }

    if (request.method === 'PUT') {
      const body = await request.text();
      if (body.length > MAX_BODY) return text('payload too large', 413);
      let parsed: unknown;
      try {
        parsed = JSON.parse(body);
      } catch {
        return text('invalid json', 400);
      }
      const nodes = (parsed as { nodes?: unknown }).nodes;
      if (!Array.isArray(nodes)) return text('expected { nodes: [] }', 400);
      await this.storage.put('data', { version: 1, nodes });
      return json({ ok: true });
    }

    return text('method not allowed', 405);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/fs\/([^/]+)$/);
    if (!match) return text('not found', 404);

    const user = decodeURIComponent(match[1]).toLowerCase().slice(0, 64);
    if (!/^[a-z0-9._-]+$/.test(user)) return text('invalid username', 400);

    const id = env.USER_STORE.idFromName(user);
    return env.USER_STORE.get(id).fetch(request);
  },
};
