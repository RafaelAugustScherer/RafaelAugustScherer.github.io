import styled, { keyframes } from 'styled-components';
import { useOS } from '../osStore';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Screen = styled.div`
  height: 100%;
  overflow: auto;
  background: #0a0714;
  padding: 12px 14px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-dim);
`;

const Line = styled.div`
  white-space: pre-wrap;
`;

const Prompt = styled.span`
  color: var(--green);
`;

const Ok = styled.span`
  color: var(--cyan);
`;

const Key = styled.span`
  color: var(--text-faint);
`;

const Value = styled.span`
  color: var(--text);
`;

const Motd = styled.div`
  color: var(--cyan);
`;

const Cursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 14px;
  background: var(--cyan);
  animation: ${blink} 1s step-end infinite;
  vertical-align: text-bottom;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TerminalApp = () => {
  const { state } = useOS();
  const user = state.user ?? 'guest';

  return (
    <Screen>
      <Line>
        <Prompt>{user}@ras-os:~$</Prompt> whoami
      </Line>
      <Line>
        <Ok>{user}</Ok>  (no password, public home)
      </Line>
      <Line>
        <Prompt>{user}@ras-os:~$</Prompt> sysinfo
      </Line>
      <Line>
        <Key>os .....</Key> <Value>RAS/OS 2.0</Value>
      </Line>
      <Line>
        <Key>host ...</Key> <Value>GitHub Pages, static</Value>
      </Line>
      <Line>
        <Key>store ..</Key> <Value>Worker + Durable Object</Value>
      </Line>
      <Line>
        <Key>shell ..</Key> <Value>ras-sh 1.0</Value>
      </Line>
      <Line>
        <Prompt>{user}@ras-os:~$</Prompt> cat /etc/motd
      </Line>
      <Motd>Dad ran an arcade. This is what I remember of it.</Motd>
      <Line>
        <Prompt>{user}@ras-os:~$</Prompt> <Cursor />
      </Line>
    </Screen>
  );
};

export default TerminalApp;
