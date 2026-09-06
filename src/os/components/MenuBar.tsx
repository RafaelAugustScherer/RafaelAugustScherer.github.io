import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Power } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOS } from '../osStore';

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

const Logo = styled.span`
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--cyan);
  text-shadow: 0 0 10px rgba(1, 251, 251, 0.55);
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

const MenuBar = () => {
  const { state, signOut } = useOS();
  const { i18n } = useTranslation();
  const time = useClock();
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';

  const top = state.windows
    .filter((w) => !w.minimized)
    .sort((a, b) => b.z - a.z)[0];

  return (
    <Bar>
      <Logo>RAS/OS</Logo>
      <AppName>{top ? top.title : 'Desktop'}</AppName>
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
        <PowerBtn aria-label="Log out" title="Log out" onClick={signOut}>
          <Power size={14} />
        </PowerBtn>
      </Right>
    </Bar>
  );
};

export default MenuBar;
