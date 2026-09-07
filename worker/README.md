# RAS/OS storage worker

A tiny Cloudflare Worker backing the desktop's public filesystem. Each username maps
to one Durable Object (SQLite-backed) holding a single JSON blob of that user's files.

- `GET  /fs/:user` → `{ version, nodes }`
- `PUT  /fs/:user` → body `{ nodes: [...] }`, max 256 KB

No secrets live in this repo. The browser only ever calls these two public endpoints;
everything stored here is public by design.

## Deploy

```bash
cd worker
npm install
npx wrangler login        # opens the browser; authorizes your Cloudflare account
npx wrangler deploy
```

`wrangler deploy` prints the live URL, e.g. `https://ras-os.<subdomain>.workers.dev`.

## Point the site at it

Set the build-time env var so the app uses the worker as its source of truth
(it falls back to localStorage when unset):

```bash
# .env at the repo root
VITE_STORAGE_URL=https://ras-os.<subdomain>.workers.dev
```

Rebuild and redeploy the site. Without this variable the desktop still works fully,
storing each user's files in that browser's localStorage only.
