import { useTranslation } from 'react-i18next';
import Badge from '../Badge/Badge';
import { skills } from '../../data/about';
import styles from './style/Skills.module.scss';

const Skills = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.skillsDiv} data-aos="fade-right">
        <h2>{ t('skills.title') }</h2>
        {
          skills.map(({ name, website }) => (
            <a
              key={`${name}-about`}
              className={styles.skill}
              href={ website }
              target="_blank"
              rel="noreferrer"
            >
              <Badge badgeName={name} />
              <p>{name}</p>
            </a>
          ))
        }
      </div>
  );
}

export default Skills;