import styled, { css, keyframes } from 'styled-components';

const badgePosition = css`
  position: absolute;
  width: 25%;
  border-radius: 2px;
`;

const badge1 = keyframes`
  0% { top: 10%; }
  50% { top: 15%; }
  100% { top: 10%; }
`;

const badge2 = keyframes`
  0% { top: -5%; }
  50% { top: 0%; }
  100% { top: -5%; }
`;

const badge3 = keyframes`
  0% { top: 20%; }
  50% { top: 25%; }
  100% { top: 20%; }
`;

export const HeaderPhotoDiv = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  padding-top: 30px;
  justify-content: center;

  div img:nth-child(1) {
    left: 0;
    animation: ${badge1} 2s ease-in-out infinite;
    ${badgePosition}
  }

  div img:nth-child(2) {
    left: 40%;
    animation: ${badge2} 2s ease-in-out infinite;
    ${badgePosition}
  }

  div img:nth-child(3) {
    right: -2vw;
    animation: ${badge3} 2s ease-in-out infinite;
    ${badgePosition}
  }
`;

export const HeaderPhoto = styled.img`
  min-width: 150px;
  max-width: 300px;
  margin-top: 10px;
  width: 110%;
`;
