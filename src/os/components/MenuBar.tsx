import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LogIn, Power } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { APPS } from '../registry';
import { useOS } from '../osContext';

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--bar-h);
  z-index: 400;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  background: rgba(11, 9, 18, 0.86);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--ui);
  font-size: 12.5px;
`;

const AppName = styled.span`
  font-weight: 600;
  color: var(--text);
`;

const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
`;

const Lang = styled.div`
  display: flex;
  border: 1px solid var(--line);
  overflow: hidden;
  button {
    padding: 2px 7px;
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--text-faint);
  }
  button[aria-pressed='true'] {
    background: var(--cyan);
    color: #04121a;
    font-weight: 600;
  }
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
  display: inline-block;
`;

const PowerBtn = styled.button`
  display: grid;
  place-items: center;
  padding: 3px;
  color: var(--text-dim);
  &:hover { color: var(--magenta); }
`;

const SignInBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  color: var(--text-dim);
  border: 1px solid var(--line);
  &:hover { color: var(--cyan); border-color: var(--cyan-dim); }
`;

const useClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

const MenuBar = ({ onSignIn }: { onSignIn: () => void }) => {
  const { state, signOut } = useOS();
  const { t, i18n } = useTranslation();
  const isGuest = state.user === 'guest';
  const time = useClock();
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';

  const top = state.windows
    .filter((w) => !w.minimized)
    .sort((a, b) => b.z - a.z)[0];
  const titleOf = (w: typeof top) =>
    w.title === APPS[w.appId].title ? t(`os.apps.${w.appId}`) : w.title;
  const appName = top ? titleOf(top) : t('os.menu.desktop');

  return (
    <Bar>
      <AppName>{appName}</AppName>
      <Right>
        <Lang>
          <button aria-pressed={lang === 'en'} onClick={() => i18n.changeLanguage('en')}>
            EN
          </button>
          <button aria-pressed={lang === 'pt'} onClick={() => i18n.changeLanguage('pt')}>
            PT
          </button>
        </Lang>
        <span>
          <Dot /> {state.user}
        </span>
        <span>{time}</span>
        {isGuest ? (
          <SignInBtn onClick={onSignIn}>
            <LogIn size={12} /> {t('os.menu.signIn')}
          </SignInBtn>
        ) : (
          <PowerBtn aria-label={t('os.menu.logout')} title={t('os.menu.logout')} onClick={signOut}>
            <Power size={14} />
          </PowerBtn>
        )}
      </Right>
    </Bar>
  );
};

export default MenuBar;
