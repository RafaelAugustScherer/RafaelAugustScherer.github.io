import ExperienceCard from './ExperienceCard';
import { academicExperience } from '../../data/experience';

const AcademicExperience = ({ t }) => {
  return (
    <ul>
      <h2>{ t('experience.academic.title') }</h2>
      {
        academicExperience.map((exp, idx) => (
          <ExperienceCard
            key={ `${exp.name}-experience-card` }
            index={ idx }
            { ...exp }
          />
        ))
      }
    </ul>
  );
}

export default AcademicExperience;