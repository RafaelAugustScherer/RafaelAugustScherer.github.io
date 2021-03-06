import { useTranslation } from 'react-i18next';
import BadgeSet from '../Badge/BadgeSet';
import ImageGallery from './ImageGallery';
import styles from './style/Project.module.scss';

const Project = ({ project, nextProject, prevProject }) => {
  const { t } = useTranslation();
  const goToPage = (url) => window.open(url, 'blank');

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleBar} data-aos="fade-right">
        <h2 className={styles.projectTitle}>{project.name}</h2>
        <BadgeSet badges={project.badges} section={project.name} />
      </div>
      <ImageGallery
        project={ project }
        nextProject = { nextProject }
        prevProject = { prevProject }
      />
      <div className={styles.accessButtons} data-aos="fade-left">
        <button onClick={ () => goToPage(project.website) } >{ t('projects.websiteBtn') }</button>
        <button onClick={ () => goToPage(project.repository) } >{ t('projects.repositoryBtn') }</button>
      </div>
    </div>
  )
}

export default Project;