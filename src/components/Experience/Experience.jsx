import AcademicExperience from './AcademicExperience';
import ProfessionalExperience from './ProfessionalExperience';
import styles from './style/Experience.module.scss';

const Experience = () => {
  return (
    <section id="experience" className={ styles.experienceSection }>
      <h1>Experience</h1>
      <AcademicExperience />
      <ProfessionalExperience />
    </section>
  );
}

export default Experience;