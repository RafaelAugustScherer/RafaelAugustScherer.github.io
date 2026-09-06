import { useState } from 'react';
import styled from 'styled-components';
import { User, UserRound } from 'lucide-react';
import { useOS } from '../osStore';

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 600;
  display: grid;
  place-items: center;
  padding: 22px;
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(5, 4, 10, 0.42);
  backdrop-filter: blur(2px);
`;

const Panel = styled.div`
  position: relative;
  width: min(460px, 100%);
  background: var(--surface);
  border: 1px solid var(--cyan-dim);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(1, 251, 251, 0.16), 0 0 34px rgba(1, 251, 251, 0.1);
`;

const ScanBar = styled.div`
  display: flex;
  align-items: center;
  height: 27px;
  padding: 0 10px;
  background-color: var(--chrome-active);
  background-image: repeating-linear-gradient(0deg, rgba(1, 251, 251, 0.14) 0 1px, transparent 1px 3px);
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text);
`;

const Inner = styled.div`
  padding: 24px 26px 6px;
  text-align: center;
`;

const Host = styled.div`
  font-family: var(--ui);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.05em;
  color: var(--text);
  text-shadow: 0 0 12px rgba(1, 251, 251, 0.25);
`;

const Rule = styled.div`
  height: 1px;
  margin: 13px auto 15px;
  max-width: 230px;
  background: linear-gradient(90deg, transparent, rgba(1, 251, 251, 0.9) 22%, rgba(255, 0, 234, 0.9) 78%, transparent);
  box-shadow: 0 0 14px rgba(1, 251, 251, 0.5);
`;

const Sub = styled.p`
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-faint);
  margin: 0 0 18px;
`;

const Accounts = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const Account = styled.button`
  flex: 1;
  max-width: 152px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px 14px;
  border: 1px solid var(--line);
  background: var(--surface-2);
  transition: box-shadow 0.12s, border-color 0.12s;
  &:hover {
    border-color: var(--cyan);
    box-shadow: 0 0 0 1px rgba(1, 251, 251, 0.3), 0 0 22px rgba(1, 251, 251, 0.14);
  }
  .tile {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border: 1px solid var(--cyan-dim);
    background: linear-gradient(135deg, var(--surface-3), var(--surface));
    color: var(--cyan);
    box-shadow: inset 0 0 14px rgba(1, 251, 251, 0.12);
  }
  .name {
    font-family: var(--ui);
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }
  .role {
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-faint);
  }
`;

const Fine = styled.div`
  padding: 16px 26px 20px;
  text-align: center;
  font-family: var(--mono);
  font-size: 10.5px;
  line-height: 1.6;
  color: var(--text-faint);
`;

const DlgScrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 22px;
  background: rgba(5, 4, 10, 0.5);
`;

const Dialog = styled.div`
  width: min(400px, 100%);
  background: var(--surface);
  border: 1px solid var(--cyan-dim);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(1, 251, 251, 0.16), 0 0 30px rgba(1, 251, 251, 0.1);
`;

const DlgHead = styled.div`
  padding: 16px 20px 14px;
  border-bottom: 1px solid var(--line-soft);
  .mark {
    font-family: var(--ui);
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.05em;
    color: var(--text);
  }
  .hint {
    font-family: var(--mono);
    font-size: 10.5px;
    color: var(--text-faint);
    margin-top: 3px;
  }
`;

const Body = styled.form`
  padding: 16px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.label`
  display: grid;
  grid-template-columns: 78px 1fr;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
  input {
    min-width: 0;
    background: var(--ground);
    border: 1px solid var(--line);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    padding: 8px 10px;
    outline: none;
    &:focus {
      border-color: var(--cyan-dim);
      box-shadow: 0 0 0 1px rgba(1, 251, 251, 0.25);
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`;

const Btn = styled.button<{ $primary?: boolean }>`
  min-width: 80px;
  font-family: var(--ui);
  font-weight: 600;
  font-size: 12.5px;
  padding: 8px 16px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--cyan-dim)' : 'var(--line)')};
  background: ${({ $primary }) => ($primary ? 'rgba(1, 251, 251, 0.1)' : 'var(--surface-2)')};
  color: ${({ $primary }) => ($primary ? 'var(--cyan)' : 'var(--text-dim)')};
  &:hover {
    ${({ $primary }) =>
      $primary
        ? 'background: var(--cyan); color: #04121a;'
        : 'border-color: var(--cyan-dim); color: var(--text);'}
  }
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
    <Overlay>
      <Scrim />
      <Panel>
        <ScanBar>session</ScanBar>
        <Inner>
          <Host>Rafael Augusto Scherer</Host>
          <Rule />
          <Sub>select a user to sign in</Sub>
          <Accounts>
            <Account onClick={() => void signIn('guest')}>
              <span className="tile">
                <UserRound size={26} />
              </span>
              <span className="name">Guest</span>
              <span className="role">no password</span>
            </Account>
            <Account onClick={() => setLogon(true)}>
              <span className="tile">
                <User size={26} />
              </span>
              <span className="name">User</span>
              <span className="role">sign in</span>
            </Account>
          </Accounts>
        </Inner>
        <Fine>
          Files are shared by name. Anyone who signs in with the same name sees and can change those files, so keep it
          to things you would post in the open. Close this tab any time to leave.
        </Fine>
      </Panel>

      {logon && (
        <DlgScrim onClick={() => setLogon(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <ScanBar>log on</ScanBar>
            <DlgHead>
              <div className="mark">Sign in</div>
              <div className="hint">Your files live under the name you choose.</div>
            </DlgHead>
            <Body
              onSubmit={(e) => {
                e.preventDefault();
                submitLogon();
              }}
            >
              <Row>
                user name
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </Row>
              <Row>
                password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </Row>
              <Buttons>
                <Btn type="submit" $primary>
                  Sign in
                </Btn>
                <Btn type="button" onClick={() => setLogon(false)}>
                  Cancel
                </Btn>
              </Buttons>
            </Body>
          </Dialog>
        </DlgScrim>
      )}
    </Overlay>
  );
};

export default LoginScreen;
