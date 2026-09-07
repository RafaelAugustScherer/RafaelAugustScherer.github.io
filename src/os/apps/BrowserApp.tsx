import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, Compass, ExternalLink, Frown, Globe, Lock, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { WindowInstance } from '../types';
import projectsData from '../../data/projects';
import ProjectPage from './ProjectPage';

const HOME = 'home';
const LINKEDIN = 'https://www.linkedin.com/in/rafaelaugustscherer/';
const PROJECT_PREFIX = 'ras://project/';
const isProjectUrl = (url: string) => url.startsWith(PROJECT_PREFIX);
const projectIdOf = (url: string) => url.slice(PROJECT_PREFIX.length);

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

const Oops = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
  padding: 32px;
  background: radial-gradient(120% 90% at 50% 0%, #1a1136 0%, var(--ground) 70%);
  h2 {
    font-family: var(--ui);
    font-size: 30px;
    letter-spacing: 0.04em;
    color: var(--magenta);
    text-shadow: 0 0 18px rgba(255, 0, 234, 0.4);
    margin: 0;
  }
  p {
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-dim);
    max-width: 46ch;
    margin: 0;
  }
  .host {
    color: var(--cyan);
  }
`;

const OopsBtns = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
  flex-wrap: wrap;
  justify-content: center;
`;

const OBtn = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--ui);
  font-weight: 600;
  font-size: 12.5px;
  padding: 9px 16px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--cyan-dim)' : 'var(--line)')};
  background: ${({ $primary }) => ($primary ? 'rgba(1, 251, 251, 0.1)' : 'var(--surface-2)')};
  color: ${({ $primary }) => ($primary ? 'var(--cyan)' : 'var(--text-dim)')};
  &:hover {
    ${({ $primary }) =>
      $primary ? 'background: var(--cyan); color: #04121a;' : 'border-color: var(--cyan-dim); color: var(--text);'}
  }
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
  if (/^(https?|ras):\/\//i.test(v)) return v;
  return `https://${v}`;
};

const hostOf = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

const NO_EMBED = ['github.com', 'linkedin.com', 'google.com', 'youtube.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'reddit.com'];

const blocksEmbed = (url: string): boolean => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return NO_EMBED.some((b) => host === b || host.endsWith(`.${b}`));
  } catch {
    return false;
  }
};

const EmbedView = ({ url, title, onHome }: { url: string; title: string; onHome: () => void }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'ok' | 'blocked'>(() =>
    blocksEmbed(url) ? 'blocked' : 'loading'
  );

  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'blocked' : s));
    }, 4000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'blocked') {
    return (
      <Oops>
        <Frown size={44} color="var(--magenta)" strokeWidth={1.5} />
        <h2>{t('os.browser.oopsTitle')}</h2>
        <p>
          <span className="host">{hostOf(url)}</span> {t('os.browser.oopsBody')}
        </p>
        <OopsBtns>
          <OBtn as="a" $primary href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} /> {t('os.browser.oopsOpen', { host: hostOf(url) })}
          </OBtn>
          <OBtn onClick={onHome}>{t('os.browser.oopsBack')}</OBtn>
        </OopsBtns>
      </Oops>
    );
  }

  return (
    <iframe
      src={url}
      title={title}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      referrerPolicy="no-referrer"
      onLoad={() => setStatus('ok')}
    />
  );
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
    ...projects.map((p) => ({ label: p.name, url: `${PROJECT_PREFIX}${p.id}`, sub: p.tech.join(' · ') })),
    { label: 'GitHub', url: 'https://github.com/RafaelAugustScherer', sub: 'github.com' },
    { label: 'LinkedIn', url: LINKEDIN, sub: 'linkedin.com' },
  ];

  const nonHomeScreen = isProjectUrl(current) ? (
    <ProjectPage id={projectIdOf(current)} />
  ) : (
    <EmbedView key={`${current}-${reloadKey}`} url={current} title={win.title} onHome={() => go(HOME)} />
  );

  return (
    <Wrap>
      <Toolbar>
        <NavBtn aria-label={t('os.browser.back')} disabled={index === 0} onClick={back}>
          <ArrowLeft size={15} />
        </NavBtn>
        <NavBtn aria-label={t('os.browser.forward')} disabled={index >= history.length - 1} onClick={forward}>
          <ArrowRight size={15} />
        </NavBtn>
        <NavBtn aria-label={t('os.browser.reload')} onClick={() => setReloadKey((k) => k + 1)}>
          <RotateCw size={14} />
        </NavBtn>
        <NavBtn aria-label={t('os.browser.start')} onClick={() => go(HOME)}>
          <Compass size={15} />
        </NavBtn>
        <Address
          onSubmit={(e) => {
            e.preventDefault();
            go(draft);
          }}
        >
          {current === HOME || isProjectUrl(current) ? (
            <Globe size={13} color="var(--text-faint)" />
          ) : (
            <Lock size={12} color="var(--green)" />
          )}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                go(draft);
              }
            }}
            placeholder={t('os.browser.address')}
            spellCheck={false}
            aria-label={t('os.browser.address')}
          />
        </Address>
        {current !== HOME && !isProjectUrl(current) && (
          <NavBtn as="a" aria-label={t('os.browser.newtab')} href={current} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} />
          </NavBtn>
        )}
      </Toolbar>
      <Screen>
        {current === HOME ? (
          <Start>
            <StartTitle>{t('os.browser.title')}</StartTitle>
            <Grid>
              {bookmarks.map((b) => (
                <Tile key={b.label} onClick={() => go(b.url)}>
                  <strong>{b.label}</strong>
                  <span>{b.sub}</span>
                </Tile>
              ))}
            </Grid>
          </Start>
        ) : (
          nonHomeScreen
        )}
      </Screen>
    </Wrap>
  );
};

export default BrowserApp;
