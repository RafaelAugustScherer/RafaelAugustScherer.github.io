import Badge from '../Badge/Badge';
import { skills } from '../../data/about';
import styles from './style/Skills.module.scss';

const Skills = () => {
  return (
    <div className={styles.skillsDiv}>
        <h2>Skills</h2>
        {
          skills.map((skill) => (
            <div
              key={`${skill}-about`}
              className={styles.skill}
            >
              <Badge badgeName={skill} clickable />
              <p>{skill}</p>
            </div>
          ))
        }
      </div>
  );
}

export default Skills;