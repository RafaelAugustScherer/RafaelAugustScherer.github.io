import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

const SESSION_KEY = 'ras-os-booted';
const LINE_MS = 260;
const HOLD_MS = 720;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  94% { opacity: 0.72; }
  96% { opacity: 1; }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

const Screen = styled.div`
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(20px, 6vw, 68px);
  background: radial-gradient(120% 90% at 50% 30%, #14092c 0%, #08061a 55%, var(--ground-deep) 100%);
  font-family: var(--mono);
  color: var(--text);
  cursor: pointer;
  animation: ${flicker} 4s linear infinite;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0 1px, transparent 1px 3px);
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Mark = styled.div`
  font-family: var(--ui);
  font-weight: 700;
  font-size: clamp(15px, 2.6vw, 20px);
  letter-spacing: 0.14em;
  color: var(--cyan);
  text-shadow: 0 0 16px rgba(1, 251, 251, 0.5);
  margin-bottom: 18px;
`;

const Line = styled.div`
  font-size: clamp(11.5px, 1.7vw, 13.5px);
  line-height: 1.85;
  letter-spacing: 0.02em;
  color: var(--text-dim);
  white-space: pre-wrap;
  .ok {
    color: var(--green);
  }
  .em {
    color: var(--text);
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 4px;
  vertical-align: text-bottom;
  background: var(--cyan);
  box-shadow: 0 0 10px rgba(1, 251, 251, 0.8);
  animation: ${blink} 1s step-end infinite;
`;

const Skip = styled.button`
  position: absolute;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 4vw, 40px);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  border: 1px solid var(--line);
  padding: 6px 12px;
  &:hover {
    color: var(--cyan);
    border-color: var(--cyan-dim);
  }
`;

const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const { t } = useTranslation();
  const lines = t('os.boot.lines', { returnObjects: true }) as string[];
  const reduced = prefersReducedMotion();
  const seen = (() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  })();

  const [shown, setShown] = useState(reduced || seen ? lines.length : 0);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore: private mode / storage disabled
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (reduced || seen) {
      const id = window.setTimeout(finish, 360);
      return () => window.clearTimeout(id);
    }
    const timers: number[] = [];
    for (let i = 1; i <= lines.length; i += 1) {
      timers.push(window.setTimeout(() => setShown(i), i * LINE_MS));
    }
    timers.push(window.setTimeout(finish, lines.length * LINE_MS + HOLD_MS));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [finish, lines.length, reduced, seen]);

  useEffect(() => {
    const onKey = () => finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  const visible = lines.slice(0, shown);

  return (
    <Screen onClick={finish} role="status" aria-label={t('os.boot.aria')}>
      <Mark>Rafael Scherer</Mark>
      {visible.map((line, i) => (
        <Line key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      {shown >= lines.length && <Cursor aria-hidden />}
      <Skip
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
      >
        {t('os.boot.skip')}
      </Skip>
    </Screen>
  );
};

export default BootScreen;
