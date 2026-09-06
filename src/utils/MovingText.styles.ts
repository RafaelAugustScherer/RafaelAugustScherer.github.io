import styled, { keyframes } from 'styled-components';

const cursorBlink = keyframes`
  0% {
    opacity: 0;
  }
`;

export const MovingText = styled.span`
  display: inline-flex;
  height: 2vw;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #01fbfb;

  &::after {
    content: '';
    width: 0.5em;
    height: 1em;
    background: #01fbfb;
    display: inline-block;
    animation: ${cursorBlink} 1s steps(2) infinite;
  }
`;
