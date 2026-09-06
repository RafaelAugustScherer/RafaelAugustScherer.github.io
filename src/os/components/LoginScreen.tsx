import { useState } from 'react';
import styled from 'styled-components';
import { Power, User, UserRound } from 'lucide-react';
import { useOS } from '../osStore';

const XP_SANS = "'Tahoma', 'Segoe UI', 'IBM Plex Sans', system-ui, sans-serif";

const Screen = styled.div`
  position: absolute;
  inset: 0;
  z-index: 600;
  display: flex;
  flex-direction: column;
  font-family: ${XP_SANS};
  color: #fff;
  background: linear-gradient(180deg, #4b7bce 0%, #5f93e6 16%, #5f93e6 80%, #3d64ba 100%);
`;

const Rule = styled.div`
  flex: none;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.85) 12%,
    rgba(255, 255, 255, 0.85) 88%,
    transparent 100%
  );
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 12%;
    right: 12%;
    top: -2px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f7a24b 30%, #f7a24b 70%, transparent);
    opacity: 0.8;
  }
`;

const Band = styled.div`
  flex: none;
  height: 20%;
`;

const Center = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
  gap: 30px;
  padding: 0 8%;
`;

const Brand = styled.div`
  justify-self: end;
  text-align: right;
  max-width: 300px;
`;

const Logo = styled.div`
  font-family: ${XP_SANS};
  font-weight: 700;
  font-style: italic;
  font-size: 44px;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  i {
    color: #f6931e;
    font-style: italic;
    margin-left: 4px;
  }
`;

const Tagline = styled.p`
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
`;

const VDivider = styled.div`
  align-self: stretch;
  width: 1px;
  margin: 12% 0;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.6), transparent);
`;

const Accounts = styled.div`
  justify-self: start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 220px;
`;

const Account = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  text-align: left;
  &:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.35);
  }
  .tile {
    width: 48px;
    height: 48px;
    flex: none;
    display: grid;
    place-items: center;
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 4px;
    background: linear-gradient(135deg, #7db2f0, #3f6cc0);
    box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.3);
  }
  .name {
    font-size: 17px;
    font-weight: 700;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  }
`;

const BottomBar = styled.div`
  flex: none;
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
`;

const PowerBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  .glyph {
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    background: linear-gradient(180deg, #e8552d, #b8331a);
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  &:hover .glyph { filter: brightness(1.1); }
`;

const Hint = styled.p`
  margin: 0;
  max-width: 46ch;
  text-align: right;
  font-size: 11.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(10, 20, 45, 0.45);
`;

const Dialog = styled.div`
  width: min(430px, 92%);
  border: 1px solid #0a246a;
  border-radius: 8px 8px 3px 3px;
  overflow: hidden;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
  color: #000;
`;

const TitleBar = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  background: linear-gradient(180deg, #0058ee 0%, #3a83f0 8%, #0855dd 45%, #0348c9 100%);
`;

const LogoBand = styled.div`
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  background: linear-gradient(180deg, #2a63c8, #16428f);
  border-bottom: 1px solid #0a246a;
  .mark {
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    i { color: #f6931e; margin-left: 3px; }
  }
  .edition {
    font-size: 12px;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 2px;
  }
`;

const Body = styled.form`
  background: #ece9d8;
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.label`
  display: grid;
  grid-template-columns: 84px 1fr;
  align-items: center;
  gap: 12px;
  font-size: 12.5px;
  color: #000;
  input {
    padding: 4px 6px;
    border: 1px solid #7f9db9;
    border-radius: 2px;
    background: #fff;
    font-family: ${XP_SANS};
    font-size: 13px;
    outline: none;
    &:focus { border-color: #2a63c8; box-shadow: 0 0 0 1px rgba(42, 99, 200, 0.4); }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
`;

const XpButton = styled.button<{ $default?: boolean }>`
  min-width: 78px;
  padding: 5px 14px;
  font-family: ${XP_SANS};
  font-size: 12.5px;
  color: #000;
  border: 1px solid ${({ $default }) => ($default ? '#2a63c8' : '#8e8f8f')};
  border-radius: 3px;
  background: linear-gradient(180deg, #fdfefe 0%, #f0efe6 48%, #e3e0d1 100%);
  box-shadow: ${({ $default }) => ($default ? '0 0 0 1px rgba(42,99,200,.35)' : 'none')},
    inset 0 1px 0 #fff;
  &:hover { background: linear-gradient(180deg, #fff 0%, #f6f4ea 48%, #e9e6d8 100%); }
  &:active { background: #e0ddce; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); }
`;

const LoginScreen = () => {
  const { signIn } = useOS();
  const [logon, setLogon] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLogon = () => {
    void signIn(username.trim().toLowerCase() || 'user');
  };

  return (
    <Screen>
      <Band />
      <Rule />
      <Center>
        <Brand>
          <Logo>
            RAS<i>OS</i>
          </Logo>
          <Tagline>To begin, click your user name</Tagline>
        </Brand>
        <VDivider />
        <Accounts>
          <Account onClick={() => void signIn('guest')}>
            <span className="tile">
              <UserRound size={26} />
            </span>
            <span className="name">Guest</span>
          </Account>
          <Account onClick={() => setLogon(true)}>
            <span className="tile">
              <User size={26} />
            </span>
            <span className="name">User</span>
          </Account>
        </Accounts>
      </Center>
      <Rule />
      <BottomBar>
        <PowerBtn onClick={() => window.close()}>
          <span className="glyph">
            <Power size={15} />
          </span>
          Turn off computer
        </PowerBtn>
        <Hint>
          Files are shared by name. Anyone who signs in with the same name sees and can change those
          files, so keep it to things you would post in the open.
        </Hint>
      </BottomBar>

      {logon && (
        <Scrim onClick={() => setLogon(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <TitleBar>Log On to RAS/OS</TitleBar>
            <LogoBand>
              <span className="mark">
                RAS<i>OS</i>
              </span>
              <span className="edition">Portfolio Edition</span>
            </LogoBand>
            <Body
              onSubmit={(e) => {
                e.preventDefault();
                submitLogon();
              }}
            >
              <Row>
                User name:
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </Row>
              <Row>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </Row>
              <Buttons>
                <XpButton type="submit" $default>
                  OK
                </XpButton>
                <XpButton type="button" onClick={() => setLogon(false)}>
                  Cancel
                </XpButton>
              </Buttons>
            </Body>
          </Dialog>
        </Scrim>
      )}
    </Screen>
  );
};

export default LoginScreen;
