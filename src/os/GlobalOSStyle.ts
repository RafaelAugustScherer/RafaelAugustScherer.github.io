import { createGlobalStyle } from 'styled-components';

export const GlobalOSStyle = createGlobalStyle`
  :root {
    --ground: #0b0912;
    --ground-deep: #05040a;
    --surface: #17132a;
    --surface-2: #211b3b;
    --surface-3: #2a2350;
    --chrome: #241d44;
    --chrome-active: #2f2668;
    --line: #3b3270;
    --line-soft: #2b2450;
    --cyan: #01fbfb;
    --cyan-dim: #0aa8ab;
    --magenta: #ff00ea;
    --magenta-dim: #a3149a;
    --amber: #ffb340;
    --green: #92e42e;
    --text: #e9e6f6;
    --text-dim: #a29ac6;
    --text-faint: #6d6494;

    --ui: 'Chakra Petch', 'Segoe UI', system-ui, sans-serif;
    --body: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
    --mono: 'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace;

    --bar-h: 32px;
    color-scheme: dark;
  }

  * { box-sizing: border-box; }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background: var(--ground-deep);
    color: var(--text);
    font-family: var(--body);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
  input, textarea { font: inherit; }

  :focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }

  ::-webkit-scrollbar { width: 12px; height: 12px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb {
    background-color: var(--line);
    border-radius: 8px;
    border: 3px solid var(--surface);
  }
  ::-webkit-scrollbar-thumb:hover { background-color: var(--cyan-dim); }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
  }
`;
