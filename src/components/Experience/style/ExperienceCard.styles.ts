import styled, { css } from 'styled-components';
import { ChevronRight } from 'lucide-react';

export const ExperienceItem = styled.li`
  cursor: pointer;
  max-width: 1920px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  color: white;
  background-color: rgba(20, 20, 20, 0.8);
  border-radius: 10px;
  margin-bottom: 30px;
  list-style-type: none;
`;

export const ItemArrow = styled(ChevronRight)<{ $toggle: boolean }>`
  width: 2em;
  height: 2em;
  transition: transform 0.5s;

  ${({ $toggle }) =>
    $toggle &&
    css`
      transform: rotate(90deg);
    `}
`;

export const ItemIcon = styled.img`
  height: 25px;
  border-radius: 5px;
  display: inline-block;
  margin-right: calc(1vw + 10px);
`;

export const ItemTitle = styled.h3`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 20px;

  span {
    font-size: 1.3rem;
  }
`;

export const ItemTextDiv = styled.div<{ $toggle: boolean }>`
  max-height: 0;
  opacity: 0;
  transition: all ease-in-out 0.8s;
  overflow: hidden;
  flex: 1 1 100%;

  ${({ $toggle }) =>
    $toggle &&
    css`
      opacity: 1;
      max-height: 1920px;
      padding: 2vh 3vh;
    `}
`;

export const ItemText = styled.p`
  font-size: 1.25rem;
`;
