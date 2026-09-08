import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import type { FsNode } from '../types';
import { useOS } from '../osContext';

const Screen = styled.div`
  height: 100%;
  padding: 10px 12px;
  background: var(--ground);
  .xterm,
  .xterm .xterm-viewport {
    background: transparent;
  }
  .xterm-viewport {
    scrollbar-width: thin;
  }
`;

type OutLine = { kind: 'out' | 'err'; text: string };

const COMMANDS = ['help', 'ls', 'cd', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'echo', 'clear', 'whoami', 'date', 'neofetch'] as const;

const CYAN = '\x1b[38;2;1;251;251m';
const MAGENTA = '\x1b[38;2;255;0;234m';
const RESET = '\x1b[0m';

const stripQuotes = (s: string): string => s.replace(/^["']|["']$/g, '');

const commonPrefix = (items: string[]): string =>
  items.reduce((acc, n) => {
    let i = 0;
    while (i < acc.length && i < n.length && acc[i] === n[i]) i += 1;
    return acc.slice(0, i);
  });

const TerminalApp = () => {
  const { t } = useTranslation();
  const { state, childrenOf, nodeById, createNode, deleteNode } = useOS();
  const user = state.user ?? 'guest';

  const wrapRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const cwdRef = useRef<string | null>(null);
  const lineRef = useRef('');
  const cursorRef = useRef(0);
  const historyRef = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const dataRef = useRef<(d: string) => void>(() => {});
  const promptRef = useRef<() => void>(() => {});

  const pathOf = (dirId: string | null): string => {
    if (!dirId) return '~';
    const parts: string[] = [];
    let cur: FsNode | undefined = nodeById(dirId);
    while (cur) {
      parts.unshift(cur.name);
      cur = cur.parentId ? nodeById(cur.parentId) : undefined;
    }
    return `~/${parts.join('/')}`;
  };

  const promptText = (): string => `${user}@portfolio:${pathOf(cwdRef.current)}$`;

  const childByName = (dirId: string | null, name: string): FsNode | undefined =>
    childrenOf(dirId).find((n) => n.name === name);

  const out = (text: string): OutLine[] => [{ kind: 'out', text }];
  const err = (text: string): OutLine[] => [{ kind: 'err', text }];

  const lsCmd = (arg: string): OutLine[] => {
    let listId = cwdRef.current;
    if (arg) {
      const target = childByName(cwdRef.current, arg);
      if (!target) return err(t('os.terminal.noSuchFile', { name: arg }));
      if (target.type !== 'dir') return out(target.name);
      listId = target.id;
    }
    const items = childrenOf(listId);
    if (!items.length) return [];
    return out(items.map((n) => (n.type === 'dir' ? `${n.name}/` : n.name)).join('   '));
  };

  const cdCmd = (arg: string): OutLine[] => {
    if (!arg || arg === '~' || arg === '/') {
      cwdRef.current = null;
      return [];
    }
    if (arg === '.') return [];
    if (arg === '..') {
      cwdRef.current = cwdRef.current ? (nodeById(cwdRef.current)?.parentId ?? null) : null;
      return [];
    }
    const node = childByName(cwdRef.current, arg);
    if (!node) return err(t('os.terminal.noSuchFile', { name: arg }));
    if (node.type !== 'dir') return err(t('os.terminal.notDir', { name: arg }));
    cwdRef.current = node.id;
    return [];
  };

  const catCmd = (arg: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd: 'cat' }));
    const node = childByName(cwdRef.current, arg);
    if (!node) return err(t('os.terminal.noSuchFile', { name: arg }));
    if (node.type === 'dir') return err(t('os.terminal.isDir', { name: arg }));
    return node.content ? out(node.content) : [];
  };

  const makeCmd = (type: 'dir' | 'file', arg: string, cmd: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd }));
    if (childByName(cwdRef.current, arg)) return err(t('os.terminal.exists', { name: arg }));
    createNode(type, cwdRef.current, arg);
    return [];
  };

  const rmCmd = (arg: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd: 'rm' }));
    const node = childByName(cwdRef.current, arg);
    if (!node) return err(t('os.terminal.noSuchFile', { name: arg }));
    deleteNode(node.id);
    return [];
  };

  const helpCmd = (): OutLine[] => [
    { kind: 'out', text: t('os.terminal.help.title') },
    ...COMMANDS.map((c) => {
      const desc = t(`os.terminal.help.${c}`);
      return { kind: 'out' as const, text: `  ${c.padEnd(9)} ${desc}` };
    }),
  ];

  const neofetchCmd = (): OutLine[] => [
    { kind: 'out', text: `${user}@portfolio` },
    { kind: 'out', text: 'os .....  web desktop' },
    { kind: 'out', text: 'host ...  GitHub Pages, static' },
    { kind: 'out', text: 'store ..  Worker + Durable Object' },
    { kind: 'out', text: 'shell ..  xterm.js' },
    { kind: 'out', text: t('os.terminal.motd') },
  ];

  const handlers: Record<string, (arg: string, args: string[], cmd: string) => OutLine[]> = {
    help: () => helpCmd(),
    ls: (arg) => lsCmd(arg),
    cd: (arg) => cdCmd(arg),
    pwd: () => out(pathOf(cwdRef.current)),
    cat: (arg) => catCmd(arg),
    mkdir: (arg, _args, cmd) => makeCmd('dir', arg, cmd),
    touch: (arg, _args, cmd) => makeCmd('file', arg, cmd),
    rm: (arg) => rmCmd(arg),
    echo: (_arg, args) => out(args.map(stripQuotes).join(' ')),
    clear: () => [],
    whoami: () => out(user),
    date: () => out(new Date().toString()),
    neofetch: () => neofetchCmd(),
  };

  const run = (raw: string): OutLine[] => {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args[0] ? stripQuotes(args[0]) : '';
    const handler = handlers[cmd];
    return handler ? handler(arg, args, cmd) : err(t('os.terminal.notFound', { cmd }));
  };

  const writePrompt = () => {
    termRef.current?.write(`${CYAN}${promptText()} ${RESET}`);
  };

  const redraw = () => {
    const term = termRef.current;
    if (!term) return;
    term.write('\r\x1b[K');
    writePrompt();
    term.write(lineRef.current);
    const back = lineRef.current.length - cursorRef.current;
    if (back > 0) term.write(`\x1b[${back}D`);
  };

  const setLine = (value: string) => {
    lineRef.current = value;
    cursorRef.current = value.length;
    redraw();
  };

  const insert = (str: string) => {
    const l = lineRef.current;
    lineRef.current = l.slice(0, cursorRef.current) + str + l.slice(cursorRef.current);
    cursorRef.current += str.length;
    redraw();
  };

  const backspace = () => {
    if (cursorRef.current === 0) return;
    const l = lineRef.current;
    lineRef.current = l.slice(0, cursorRef.current - 1) + l.slice(cursorRef.current);
    cursorRef.current -= 1;
    redraw();
  };

  const submit = () => {
    const term = termRef.current;
    if (!term) return;
    const raw = lineRef.current;
    const trimmed = raw.trim();
    term.write('\r\n');
    if (trimmed) historyRef.current.push(raw);
    histIdxRef.current = -1;
    lineRef.current = '';
    cursorRef.current = 0;
    if (trimmed === 'clear') {
      term.write('\x1b[2J\x1b[3J\x1b[H');
      writePrompt();
      return;
    }
    for (const ln of run(raw)) {
      const text = ln.text.replace(/\n/g, '\r\n');
      term.write(ln.kind === 'err' ? `${MAGENTA}${text}${RESET}\r\n` : `${text}\r\n`);
    }
    writePrompt();
  };

  const complete = () => {
    const line = lineRef.current;
    const lastSpace = line.lastIndexOf(' ');
    const token = line.slice(lastSpace + 1);
    const before = line.slice(0, lastSpace + 1);
    const names = before.trim() ? childrenOf(cwdRef.current).map((n) => n.name) : Object.keys(handlers);
    const matches = names.filter((n) => n.startsWith(token));
    if (!matches.length) return;
    if (matches.length === 1) {
      setLine(`${before}${matches[0]} `);
      return;
    }
    const common = commonPrefix(matches);
    if (common.length > token.length) {
      setLine(`${before}${common}`);
      return;
    }
    const term = termRef.current;
    if (!term) return;
    term.write('\r\n');
    term.write([...matches].sort().join('   '));
    term.write('\r\n');
    writePrompt();
    term.write(line);
    cursorRef.current = line.length;
  };

  const historyPrev = () => {
    const h = historyRef.current;
    if (!h.length) return;
    histIdxRef.current = histIdxRef.current === -1 ? h.length - 1 : Math.max(0, histIdxRef.current - 1);
    setLine(h[histIdxRef.current]);
  };

  const historyNext = () => {
    if (histIdxRef.current === -1) return;
    const next = histIdxRef.current + 1;
    if (next >= historyRef.current.length) {
      histIdxRef.current = -1;
      setLine('');
    } else {
      histIdxRef.current = next;
      setLine(historyRef.current[next]);
    }
  };

  const handleData = (data: string) => {
    const term = termRef.current;
    if (!term) return;
    switch (data) {
      case '\r':
        return submit();
      case '\x7f':
      case '\b':
        return backspace();
      case '\t':
        return complete();
      case '\x1b[A':
        return historyPrev();
      case '\x1b[B':
        return historyNext();
      case '\x1b[C':
        if (cursorRef.current < lineRef.current.length) {
          cursorRef.current += 1;
          term.write('\x1b[C');
        }
        return;
      case '\x1b[D':
        if (cursorRef.current > 0) {
          cursorRef.current -= 1;
          term.write('\x1b[D');
        }
        return;
      case '\x1b[H':
      case '\x01':
        cursorRef.current = 0;
        return redraw();
      case '\x1b[F':
      case '\x05':
        cursorRef.current = lineRef.current.length;
        return redraw();
      case '\x03':
        term.write('^C\r\n');
        lineRef.current = '';
        cursorRef.current = 0;
        histIdxRef.current = -1;
        return writePrompt();
      default:
        if ([...data].every((c) => c >= ' ')) insert(data);
    }
  };

  useEffect(() => {
    dataRef.current = handleData;
    promptRef.current = writePrompt;
  });

  useEffect(() => {
    const host = wrapRef.current;
    if (!host) return;
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: "'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
      fontSize: 13,
      lineHeight: 1.2,
      theme: {
        background: '#0b0912',
        foreground: '#e9e6f6',
        cursor: '#01fbfb',
        cursorAccent: '#0b0912',
        selectionBackground: 'rgba(1,251,251,0.25)',
        black: '#0b0912',
        red: '#ff00ea',
        green: '#92e42e',
        yellow: '#ffb340',
        blue: '#01fbfb',
        magenta: '#ff00ea',
        cyan: '#01fbfb',
        white: '#e9e6f6',
        brightBlack: '#6d6494',
        brightWhite: '#ffffff',
      },
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(host);
    try {
      fit.fit();
    } catch {
      /* container may be measuring */
    }
    termRef.current = term;
    const sub = term.onData((d) => dataRef.current(d));
    promptRef.current();
    term.focus();
    const ro = new ResizeObserver(() => {
      try {
        fit.fit();
      } catch {
        /* ignore transient resize */
      }
    });
    ro.observe(host);
    return () => {
      ro.disconnect();
      sub.dispose();
      term.dispose();
      termRef.current = null;
    };
  }, []);

  return <Screen ref={wrapRef} onClick={() => termRef.current?.focus()} />;
};

export default TerminalApp;
