import styled, { css, keyframes } from 'styled-components';
import {
  Play,
  Pause,
  ChevronDown,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
} from 'lucide-react';

const fadingIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const iconBase = css`
  color: white;
  cursor: pointer;
  padding: 5px;
  width: 2rem;
  height: 2rem;
`;

const headerIcon = css`
  ${iconBase}
  margin: 0;
  transition: 0.5s;
`;

export const AudioCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 15vh;
  right: -1px;
  background-color: #202020;
  padding: 10px;
  border: 1px solid #01fbfb;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 0 10px #01fbfb;
  z-index: 1;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PlayIcon = styled(Play)`
  ${headerIcon}
`;

export const PauseIcon = styled(Pause)`
  ${headerIcon}
`;

export const ExpandIcon = styled(ChevronDown)<{ $show: boolean }>`
  ${headerIcon}
  ${({ $show }) =>
    $show &&
    css`
      transform: rotate(-180deg);
    `}
`;

export const SkipBackIcon = styled(SkipBack)`
  ${iconBase}
`;

export const SkipForwardIcon = styled(SkipForward)`
  ${iconBase}
`;

export const VolumeDownIcon = styled(Volume1)`
  color: white;
  width: 1.2rem;
  height: 1.2rem;
`;

export const VolumeUpIcon = styled(Volume2)`
  color: white;
  width: 1.2rem;
  height: 1.2rem;
`;

export const ExpandDiv = styled.div<{ $expanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: height 0.5s linear, width 0.5s linear;

  ${({ $expanded }) =>
    $expanded
      ? css`
          padding: 10px;
          height: 278px;
          width: 177px;
          animation: 2.5s ease-in-out ${fadingIn};
          visibility: visible;
        `
      : css`
          visibility: hidden;
          height: 0px;
          width: 87px;
          opacity: 0;
        `}
`;

export const TrackThumb = styled.img`
  width: 150px;
  border-radius: 5px;
`;

export const TrackName = styled.span`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

export const TrackArtist = styled.span`
  color: #a7a7a7;
  margin-bottom: 10px;
`;

export const VolumeDiv = styled.div`
  display: flex;
`;

export const VolumeSlider = styled.input`
  height: 10px;
  border-radius: 15px;
  background: #006b6b;
  margin: auto 5px;
  overflow: hidden;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    width: 15px;
    height: 12px;
    background: #fff;
    box-shadow: -100px 0 0 100px #5affff;
    transition: 0.3s;
  }
`;
