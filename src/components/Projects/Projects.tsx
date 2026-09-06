import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import NextPageArrow from '../NextPageArrow';
import Project from './Project';
import projects from '../../data/projects';
import * as S from './style/Projects.styles';

const Projects = () => {
  const { t } = useTranslation();
  const tProjects = projects(t);

  const [curIndex, setCurIndex] = useState(0);
  const [curProject, setCurProject] = useState(tProjects[curIndex]);

  useEffect(() => {
    setCurProject(tProjects[curIndex]);
  }, [curIndex, t]);

  const nextProject = () => {
    const nextIndex = curIndex === tProjects.length - 1 ? 0 : curIndex + 1;
    setCurIndex(nextIndex)
  }

  const prevProject = () => {
    const nextIndex = curIndex === 0 ? tProjects.length - 1 : curIndex - 1;
    setCurIndex(nextIndex);
  }

  return (
    <S.ProjectsSection id="projects">
      <h1>{ t('projects.title') }</h1>
      <Project
        project={ curProject }
        nextProject={ nextProject }
        prevProject={ prevProject }
      />
      <NextPageArrow url="#experience" />
    </S.ProjectsSection>
  );
}

export default Projects;
