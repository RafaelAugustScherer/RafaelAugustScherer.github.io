import styled from 'styled-components';

export const ProjectContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
  max-width: 90vw;

  @media screen and (max-width: 600px) {
    max-width: 90vw;
  }

  @media screen and (min-width: 1150px) {
    max-width: 80vw;
  }
`;

export const TitleBar = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: space-between;

  div img {
    width: 3vw;
    max-width: 50px;
  }

  @media screen and (min-width: 1150px) {
    div {
      margin-right: 45%;
    }
  }
`;

export const ProjectTitle = styled.h2`
  color: #fff;
  font-weight: 600;
  margin-left: 10px;
  font-size: 2em;
`;

export const AccessButtons = styled.div`
  display: flex;

  button {
    font-size: 1.2em;
    font-weight: 600;
    color: #fff;
    padding: 2vh 10vw;
    margin: 3vh 5vw;
    cursor: pointer;
    border-radius: 10px;
    border: 3px solid #6d2b23;
    background-color: rgba(24, 24, 24, 0.35);
    transition: font-size 0.5s, background-color 0.3s;
  }

  button:hover {
    font-size: 1.8rem;
    background-color: rgba(24, 24, 24, .75);
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    button {
      margin: 1vh 0;
      margin-top: 3vh;
    }
  }

  @media screen and (min-width: 1150px) {
    flex-direction: column;
    flex: 1 1 40%;

    button {
      margin-right: 0;
    }
  }
`;
