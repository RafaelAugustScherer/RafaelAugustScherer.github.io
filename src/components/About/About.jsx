import Bio from './Bio';
import Skills from './Skills';
import NextPageArrow from '../NextPageArrow';
import styles from './style/About.module.scss';

const About = () => {

  return (
    <section id="about" className={styles.aboutSection}>
      <h1>About</h1>
      <Bio />
      <Skills />
      <NextPageArrow url="#projects" />
    </section>
  )
}

export default About;