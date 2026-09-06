import { useTranslation } from 'react-i18next';
import AcademicExperience from './AcademicExperience';
import ProfessionalExperience from './ProfessionalExperience';
import * as S from './style/Experience.styles';

const Experience = () => {
  const { t } = useTranslation();
  return (
    <S.ExperienceSection id="experience">
      <h1>{t('experience.title')}</h1>
      <S.ExperienceGroup>
        <h2>{t('experience.academic.title')}</h2>
        <AcademicExperience />
      </S.ExperienceGroup>
      <S.ExperienceGroup>
        <h2>{t('experience.professional.title')}</h2>
        <ProfessionalExperience />
      </S.ExperienceGroup>
    </S.ExperienceSection>
  );
};

export default Experience;
