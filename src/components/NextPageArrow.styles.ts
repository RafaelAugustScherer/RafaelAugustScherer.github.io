import styled, { keyframes } from 'styled-components';
import { ChevronDown } from 'lucide-react';

const arrowShadowAnim = keyframes`
  0% { bottom: -6%; }
  50% { bottom: -12%; }
  100% { bottom: -6%; }
`;

export const ArrowDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  align-self: flex-end;
  cursor: pointer;
  overflow: hidden;
  transform: translate(-50%, 0);
`;

export const Arrow = styled(ChevronDown)`
  color: white;
  width: max(7vw, 70px);
  height: max(7vw, 70px);
`;

export const ArrowShadow = styled(ChevronDown)`
  position: absolute;
  left: 0;
  color: #da00c7;
  width: max(7vw, 70px);
  height: max(7vw, 70px);
  animation: ${arrowShadowAnim} 2s ease-in-out infinite;
`;
