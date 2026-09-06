import styled, { css } from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGalleryContainer = styled.div`
  display: flex;
  position: relative;
  border-radius: 10px;
  background: linear-gradient(180deg, #290957,#6d2b23);
  padding: 5px;
  max-width: 1600px;
  max-height: min(70vh, 900px);

  @media screen and (min-width: 1150px) {
    flex: 1 1 50%;
  }
`;

export const GalleryImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  border-radius: 10px;
`;

const arrowIcon = css`
  position: absolute;
  top: 50%;
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: color .2s;
  transform: translate(0, -50%);

  @media only screen and (hover: none) {
    color: #fff;
  }

  &:hover {
    color: #fff;
  }
`;

export const PrevButton = styled(ChevronLeft)`
  ${arrowIcon}
  left: 0;
`;

export const NextButton = styled(ChevronRight)`
  ${arrowIcon}
  right: 0;
`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(24, 24, 24, 0.75);
  border-radius: 10px;
  position: absolute;
  padding: 0 5px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GalleryDot = styled.span`
  display: inline-block;
  border-radius: 50%;
  margin: min(7px, 1vw);
  height: 20px;
  width: 20px;
  transition: .5s;

  &:hover {
    background-color: #fff;
  }
`;
