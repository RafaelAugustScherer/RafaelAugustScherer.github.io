import styled from 'styled-components';
import aboutExperienceBackground from '../../../assets/images/background/about-experience-background.webp';

export const ExperienceSection = styled.section`
  display: flex;
  background-image: url(${aboutExperienceBackground});
  flex-direction: column;
  background-size: cover;
  align-items: center;
  min-height: 100vh;
  background-attachment: fixed;

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
  }

  h2 {
    font-size: 2em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 1700px) {
    flex-flow: row wrap;

    h1 {
      flex: 1 1 100%;
    }
  }
`;

export const ExperienceGroup = styled.div`
  align-self: stretch;
  margin: 0 2vw;

  @media screen and (min-width: 1700px) {
    flex: 1 1 40%;
  }
`;
