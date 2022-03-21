import { useTranslation } from 'react-i18next';
import AcademicExperience from './AcademicExperience';
import ProfessionalExperience from './ProfessionalExperience';
import styles from './style/Experience.module.scss';

const Experience = () => {
  const { t } = useTranslation();
  return (
    <section id="experience" className={ styles.experienceSection }>
      <h1>{ t('experience.title') }</h1>
      <AcademicExperience t={ t } />
      <ProfessionalExperience t={ t } />
    </section>
  );
}

export default Experience;