import styled from 'styled-components';

export const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
`;

export const HeaderVideo = styled.video`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100vw;
  object-fit: cover;
`;

export const LinksDiv = styled.div`
  position: absolute;
  padding-right: 0;
  overflow: hidden;
  right: 0;
  top: 0;
  margin: 30px;
  padding: 10px 0;
  transition: all 1s ease-in-out;

  &:hover {
    margin-right: 0;
    padding-right: 30px;
  }

  &::before {
    top: 50%;
    margin-top: -5px;
    height: 0;
    width: 0;
    content: '';
    position: absolute;
    border: 4px solid transparent;
    border-radius: 1px;
    transition: all 1s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    top: 0;
    background-color: #535353;
    width: 100%;
    border-left-color: #ff00ea;
    height: 100%;
    z-index: -1;
  }

  @media screen and (max-width: 1000px) {
    margin: 30px 20px;
  }
`;

export const HeaderLink = styled.a`
  color: #01fbfb;
  font-size: 3rem;
  margin: 0 20px;
  cursor: pointer;
  z-index: 2;
`;

export const HeaderBioDiv = styled.div`
  position: absolute;
  left: 50%;
  background-color: #2020202f;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: min(25vw, 380px);
  max-height: 80%;
  transform: translate(-50%, 0);

  @media screen and (max-width: 1000px) {
    top: 30%;
    flex-direction: row;
    min-width: 310px;
    max-width: 90vw;
    padding: 20px;
  }
`;

export const HeaderText = styled.h1`
  font-size: 2em;
  color: white;
  text-align: center;

  @media screen and (max-width: 1000px) {
    font-size: 1.5em;
    margin-left: 6vw;
    max-width: 280px;
  }
`;
