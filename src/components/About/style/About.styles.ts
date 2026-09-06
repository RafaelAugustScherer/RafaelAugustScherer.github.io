import styled from 'styled-components';
import aboutBackground from '../../../assets/images/background/about-experience-background.webp';

export const AboutSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url(${aboutBackground});
  background-size: cover;
  background-attachment: fixed;
  color: white;
  padding-bottom: 50px;

  h1,
  h2 {
    color: white;
    text-align: center;
    padding: 0 5px;
    background-color: rgba(20, 20, 20, 0.5);
    border-radius: 5px;
    margin-left: 2vw;
    margin-right: 2vw;
  }

  h1 {
    font-size: 3em;
    flex: 1 1 100%;
  }

  @media screen and (min-width: 1366px) {
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
  }
`;
