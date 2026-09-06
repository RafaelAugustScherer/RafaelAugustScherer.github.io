import { useTranslation } from 'react-i18next';
import BadgeSet from '../Badge/BadgeSet';
import ImageGallery from './ImageGallery';
import type { Project as ProjectData } from '../../data/projects';
import * as S from './style/Project.styles';

type ProjectProps = {
  project: ProjectData;
  nextProject: () => void;
  prevProject: () => void;
};

const Project = ({ project, nextProject, prevProject }: ProjectProps) => {
  const { t } = useTranslation();
  const goToPage = (url: string) => window.open(url, 'blank');

  return (
    <S.ProjectContainer>
      <S.TitleBar data-aos="fade-right">
        <S.ProjectTitle>{project.name}</S.ProjectTitle>
        <BadgeSet badges={project.badges} section={project.name} />
      </S.TitleBar>
      <ImageGallery
        project={ project }
        nextProject = { nextProject }
        prevProject = { prevProject }
      />
      <S.AccessButtons data-aos="fade-left">
        <button onClick={ () => goToPage(project.website) } >{ t('projects.websiteBtn') }</button>
        <button onClick={ () => goToPage(project.repository) } >{ t('projects.repositoryBtn') }</button>
      </S.AccessButtons>
    </S.ProjectContainer>
  )
}

export default Project;
