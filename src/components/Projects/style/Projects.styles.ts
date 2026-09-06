import styled from 'styled-components';
import projectsBackground from '../../../assets/images/background/projects-background.webp';

export const ProjectsSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${projectsBackground});
  background-attachment: fixed;
  min-height: 100vh;

  h1 {
    font-size: 3em;
    color: white;
  }

  @media screen and (min-width: 1150px) {
    padding-bottom: 50px;
  }
`;
