import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, Compass, ExternalLink, Globe, Lock, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { WindowInstance } from '../types';
import projectsData from '../../data/projects';

const HOME = 'home';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--surface);
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 8px;
  flex: none;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-2);
`;

const NavBtn = styled.button`
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  color: var(--text-dim);
  border: 1px solid transparent;
  flex: none;
  &:hover:not(:disabled) { color: var(--cyan); background: var(--surface-3); border-color: var(--line); }
  &:disabled { opacity: 0.35; cursor: default; }
`;

const Address = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  padding: 0 10px;
  height: 26px;
  border: 1px solid var(--line);
  background: var(--surface);
  &:focus-within { border-color: var(--cyan-dim); box-shadow: 0 0 0 1px rgba(1, 251, 251, 0.2); }
  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-family: var(--mono);
    font-size: 12px;
  }
`;

const Screen = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  background: #fff;
  iframe { width: 100%; height: 100%; border: 0; display: block; }
`;

const Notice = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  background: rgba(11, 9, 18, 0.92);
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--text-faint);
  a { color: var(--cyan); }
`;

const Start = styled.div`
  position: absolute;
  inset: 0;
  overflow: auto;
  background: radial-gradient(120% 90% at 50% 0%, #1a1136 0%, var(--ground) 70%);
  padding: 34px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const StartTitle = styled.div`
  font-family: var(--ui);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.08em;
  color: var(--cyan);
  text-shadow: 0 0 18px rgba(1, 251, 251, 0.45);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 520px;
`;

const Tile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 13px 14px;
  border: 1px solid var(--line);
  background: var(--surface);
  text-align: left;
  &:hover { border-color: var(--cyan-dim); background: var(--surface-2); }
  strong { font-family: var(--ui); font-size: 13px; color: var(--text); font-weight: 600; }
  span { font-family: var(--mono); font-size: 10px; color: var(--text-faint); word-break: break-all; }
`;

const normalize = (raw: string): string => {
  const v = raw.trim();
  if (!v || v === HOME) return HOME;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
};

const hostOf = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

const BrowserApp = ({ win }: { win: WindowInstance }) => {
  const { t } = useTranslation();
  const projects = useMemo(() => projectsData(t), [t]);
  const initial = normalize((win.props.url as string) ?? HOME);
  const [history, setHistory] = useState<string[]>([initial]);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState(initial === HOME ? '' : initial);
  const [reloadKey, setReloadKey] = useState(0);
  const lastProp = useRef<string | undefined>(win.props.url as string | undefined);

  const current = history[index];

  const go = (rawUrl: string) => {
    const url = normalize(rawUrl);
    setHistory((h) => [...h.slice(0, index + 1), url]);
    setIndex((i) => i + 1);
    setDraft(url === HOME ? '' : url);
  };

  useEffect(() => {
    const incoming = win.props.url as string | undefined;
    if (incoming && incoming !== lastProp.current) {
      lastProp.current = incoming;
      go(incoming);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.props.url]);

  const back = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDraft(history[index - 1] === HOME ? '' : history[index - 1]);
    }
  };
  const forward = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setDraft(history[index + 1] === HOME ? '' : history[index + 1]);
    }
  };

  const bookmarks = [
    ...projects.map((p) => ({ label: p.name, url: p.website })),
    { label: 'GitHub', url: 'https://github.com/RafaelAugustScherer' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rafael-augusto-scherer/' },
  ];

  return (
    <Wrap>
      <Toolbar>
        <NavBtn aria-label="Back" disabled={index === 0} onClick={back}>
          <ArrowLeft size={15} />
        </NavBtn>
        <NavBtn aria-label="Forward" disabled={index >= history.length - 1} onClick={forward}>
          <ArrowRight size={15} />
        </NavBtn>
        <NavBtn aria-label="Reload" onClick={() => setReloadKey((k) => k + 1)}>
          <RotateCw size={14} />
        </NavBtn>
        <NavBtn aria-label="Start page" onClick={() => go(HOME)}>
          <Compass size={15} />
        </NavBtn>
        <Address
          onSubmit={(e) => {
            e.preventDefault();
            go(draft);
          }}
        >
          {current === HOME ? <Globe size={13} color="var(--text-faint)" /> : <Lock size={12} color="var(--green)" />}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search or type a URL"
            spellCheck={false}
            aria-label="Address"
          />
        </Address>
        {current !== HOME && (
          <NavBtn as="a" aria-label="Open in new tab" href={current} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} />
          </NavBtn>
        )}
      </Toolbar>
      <Screen>
        {current === HOME ? (
          <Start>
            <StartTitle>BROWSER</StartTitle>
            <Grid>
              {bookmarks.map((b) => (
                <Tile key={b.label} onClick={() => go(b.url)}>
                  <strong>{b.label}</strong>
                  <span>{hostOf(b.url)}</span>
                </Tile>
              ))}
            </Grid>
          </Start>
        ) : (
          <>
            <iframe
              key={`${current}-${reloadKey}`}
              src={current}
              title={win.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
            <Notice>
              Blank page? The site blocked embedding.{' '}
              <a href={current} target="_blank" rel="noopener noreferrer">
                Open {hostOf(current)} in a new tab
              </a>
            </Notice>
          </>
        )}
      </Screen>
    </Wrap>
  );
};

export default BrowserApp;
