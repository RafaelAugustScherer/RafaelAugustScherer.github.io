import { useTranslation } from 'react-i18next';
import Bio from './Bio';
import Skills from './Skills';
import NextPageArrow from '../NextPageArrow';
import * as S from './style/About.styles';

const About = () => {
  const { t } = useTranslation();

  return (
    <S.AboutSection id="about">
      <h1>{ t('about.title') }</h1>
      <Bio />
      <Skills />
      <NextPageArrow url="#projects" />
    </S.AboutSection>
  )
}

export default About;
