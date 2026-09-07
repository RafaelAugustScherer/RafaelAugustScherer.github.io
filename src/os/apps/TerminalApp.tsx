import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { FsNode } from '../types';
import { useOS } from '../osContext';

const Screen = styled.div`
  height: 100%;
  overflow: auto;
  padding: 12px 14px;
  background: var(--ground);
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--text-dim);
  cursor: text;
`;

const Row = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  &.err {
    color: var(--magenta);
  }
`;

const Prompt = styled.span`
  color: var(--cyan);
`;

const InputRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--mono);
  font-size: 12.5px;
`;

type OutLine = { kind: 'in' | 'out' | 'err'; text: string };

const COMMANDS = ['help', 'ls', 'cd', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'echo', 'clear', 'whoami', 'date', 'neofetch'] as const;

const stripQuotes = (s: string): string => s.replace(/^["']|["']$/g, '');

const TerminalApp = () => {
  const { t } = useTranslation();
  const { state, childrenOf, nodeById, createNode, deleteNode } = useOS();
  const user = state.user ?? 'guest';

  const [lines, setLines] = useState<OutLine[]>([]);
  const [cwd, setCwd] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const promptText = `${user}@portfolio:${pathOf(cwd)}$`;

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const childByName = (dirId: string | null, name: string): FsNode | undefined =>
    childrenOf(dirId).find((n) => n.name === name);

  const out = (text: string): OutLine[] => [{ kind: 'out', text }];
  const err = (text: string): OutLine[] => [{ kind: 'err', text }];

  const lsCmd = (arg: string): OutLine[] => {
    let listId = cwd;
    if (arg) {
      const target = childByName(cwd, arg);
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
      setCwd(null);
      return [];
    }
    if (arg === '.') return [];
    if (arg === '..') {
      setCwd(cwd ? (nodeById(cwd)?.parentId ?? null) : null);
      return [];
    }
    const node = childByName(cwd, arg);
    if (!node) return err(t('os.terminal.noSuchFile', { name: arg }));
    if (node.type !== 'dir') return err(t('os.terminal.notDir', { name: arg }));
    setCwd(node.id);
    return [];
  };

  const catCmd = (arg: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd: 'cat' }));
    const node = childByName(cwd, arg);
    if (!node) return err(t('os.terminal.noSuchFile', { name: arg }));
    if (node.type === 'dir') return err(t('os.terminal.isDir', { name: arg }));
    return node.content ? out(node.content) : [];
  };

  const makeCmd = (type: 'dir' | 'file', arg: string, cmd: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd }));
    if (childByName(cwd, arg)) return err(t('os.terminal.exists', { name: arg }));
    createNode(type, cwd, arg);
    return [];
  };

  const rmCmd = (arg: string): OutLine[] => {
    if (!arg) return err(t('os.terminal.missingOperand', { cmd: 'rm' }));
    const node = childByName(cwd, arg);
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
    { kind: 'out', text: 'shell ..  sh' },
    { kind: 'out', text: t('os.terminal.motd') },
  ];

  const handlers: Record<string, (arg: string, args: string[], cmd: string) => OutLine[]> = {
    help: () => helpCmd(),
    ls: (arg) => lsCmd(arg),
    cd: (arg) => cdCmd(arg),
    pwd: () => out(pathOf(cwd)),
    cat: (arg) => catCmd(arg),
    mkdir: (arg, _args, cmd) => makeCmd('dir', arg, cmd),
    touch: (arg, _args, cmd) => makeCmd('file', arg, cmd),
    rm: (arg) => rmCmd(arg),
    echo: (_arg, args) => out(args.map(stripQuotes).join(' ')),
    clear: () => {
      setLines([]);
      return [];
    },
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

  const submit = () => {
    const echoed: OutLine = { kind: 'in', text: `${promptText} ${input}` };
    const result = input.trim() === 'clear' ? [] : run(input);
    if (input.trim() === 'clear') {
      setLines([]);
    } else {
      setLines((prev) => [...prev, echoed, ...result]);
    }
    if (input.trim()) {
      setHistory((h) => [...h, input]);
    }
    setHistIdx(-1);
    setInput('');
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <Screen ref={scrollRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((line, i) => (
        <Row key={i} className={line.kind === 'err' ? 'err' : undefined}>
          {line.kind === 'in' ? <Prompt>{line.text}</Prompt> : line.text}
        </Row>
      ))}
      <InputRow>
        <Prompt>{promptText}</Prompt>
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Terminal input"
          autoFocus
        />
      </InputRow>
    </Screen>
  );
};

export default TerminalApp;
