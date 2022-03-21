import { useTranslation } from 'react-i18next';
import Bio from './Bio';
import Skills from './Skills';
import NextPageArrow from '../NextPageArrow';
import styles from './style/About.module.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className={styles.aboutSection}>
      <h1>{ t('about.title') }</h1>
      <Bio />
      <Skills />
      <NextPageArrow url="#projects" />
    </section>
  )
}

export default About;