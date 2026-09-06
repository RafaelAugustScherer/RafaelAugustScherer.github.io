import styled from 'styled-components';
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
  background: rgba(5, 4, 10, 0.55);
  backdrop-filter: blur(2px);
`;

const Dialog = styled.div`
  position: relative;
  width: min(540px, 100%);
  background: var(--surface);
  border: 1px solid var(--cyan-dim);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(1, 251, 251, 0.16), 0 0 34px rgba(1, 251, 251, 0.1);
`;

const TitleBar = styled.div`
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
  padding: 20px 22px 6px;
  h1 {
    font-family: var(--ui);
    font-size: 20px;
    margin: 0 0 12px;
    letter-spacing: 0.01em;
    text-wrap: balance;
  }
  p {
    margin: 0 0 12px;
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text-dim);
    max-width: 60ch;
  }
  strong { color: var(--text); }
`;

const Actions = styled.div`
  display: flex;
  padding: 14px 22px 18px;
`;

const OkBtn = styled.button`
  font-family: var(--ui);
  font-size: 13.5px;
  font-weight: 600;
  padding: 9px 26px;
  letter-spacing: 0.02em;
  border: 1px solid var(--cyan-dim);
  background: rgba(1, 251, 251, 0.1);
  color: var(--cyan);
  &:hover { background: var(--cyan); color: #04121a; }
`;

const Fine = styled.div`
  padding: 0 22px 16px;
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--text-faint);
  line-height: 1.6;
`;

const PrivacyDialog = () => {
  const { setScreen } = useOS();
  return (
    <Overlay>
      <Scrim />
      <Dialog role="dialog" aria-modal="true" aria-labelledby="privacy-title">
        <TitleBar>welcome</TitleBar>
        <Inner>
          <h1 id="privacy-title">A quick note before you start</h1>
          <p>
            This is a shared desktop. Anything you create is saved <strong>publicly</strong> and shown to
            anyone who signs in with the same name, so keep it to things you would post in the open.
          </p>
          <p>
            <strong>No tracking, no cookies, no passwords kept.</strong>
          </p>
        </Inner>
        <Actions>
          <OkBtn onClick={() => setScreen('login')}>OK</OkBtn>
        </Actions>
        <Fine>You can close this tab any time to leave.</Fine>
      </Dialog>
    </Overlay>
  );
};

export default PrivacyDialog;
