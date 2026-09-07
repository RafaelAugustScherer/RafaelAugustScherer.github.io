import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  to { background-position: 0 44px, 0 0; }
`;

const Root = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: radial-gradient(120% 80% at 50% 96%, #2a0b46 0%, #12082a 45%, var(--ground) 78%);
`;

const Sun = styled.div`
  position: absolute;
  left: 50%;
  bottom: 38%;
  width: min(440px, 64vw);
  aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background: linear-gradient(180deg, var(--amber) 0%, var(--magenta) 58%, transparent 74%);
  opacity: 0.5;
  filter: blur(1px);
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: repeating-linear-gradient(180deg, transparent 0 8px, var(--ground) 8px 12px);
    opacity: 0.55;
  }
`;

const Horizon = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(1, 251, 251, 0.9) 22%,
    rgba(255, 0, 234, 0.9) 78%,
    transparent
  );
  opacity: 0.55;
  box-shadow: 0 0 22px rgba(1, 251, 251, 0.55);
`;

const Floor = styled.div`
  position: absolute;
  left: -60%;
  right: -60%;
  bottom: -2%;
  height: 52%;
  background-image: linear-gradient(rgba(1, 251, 251, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 234, 0.36) 1px, transparent 1px);
  background-size: 100% 44px, 44px 100%;
  transform: perspective(300px) rotateX(74deg);
  transform-origin: bottom center;
  animation: ${scroll} 7s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Crt = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0 1px, transparent 1px 3px);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(130% 100% at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.5) 100%);
  }
`;

const Wallpaper = () => (
  <Root>
    <Sun />
    <Horizon />
    <Floor />
    <Crt />
  </Root>
);

export default Wallpaper;
