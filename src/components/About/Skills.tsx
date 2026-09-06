import { useTranslation } from 'react-i18next';
import Badge from '../Badge/Badge';
import { skills } from '../../data/about';
import * as S from './style/Skills.styles';

const Skills = () => {
  const { t } = useTranslation();
  return (
    <S.SkillsDiv data-aos="fade-right">
        <h2>{ t('skills.title') }</h2>
        {
          skills.map(({ name, website }) => (
            <S.Skill
              key={`${name}-about`}
              href={ website }
              target="_blank"
              rel="noreferrer"
            >
              <Badge badgeName={name} />
              <p>{name}</p>
            </S.Skill>
          ))
        }
      </S.SkillsDiv>
  );
}

export default Skills;
