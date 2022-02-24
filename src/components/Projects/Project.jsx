import BadgeSet from '../Badge/BadgeSet';
import ImageGallery from './ImageGallery';
import styles from './style/Project.module.scss';

const Project = ({ project, nextProject, prevProject }) => {

  const goToPage = (url) => window.open(url, 'blank');

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleBar}>
        <h2 className={styles.projectTitle}>{project.name}</h2>
        <BadgeSet badges={project.badges} section={project.name} />
      </div>
      <ImageGallery
        project={ project }
        nextProject = { nextProject }
        prevProject = { prevProject }
      />
      <div className={styles.accessButtons}>
        <button onClick={ () => goToPage(project.website) } >Website</button>
        <button onClick={ () => goToPage(project.repository) } >Repository</button>
      </div>
    </div>
  )
}

export default Project;