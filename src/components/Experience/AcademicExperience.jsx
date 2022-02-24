import ExperienceCard from './ExperienceCard';
import { academicExperience } from '../../data/experience';

const AcademicExperience = () => {
  return (
    <ul>
      <h2>Academic Experience</h2>
      {
        academicExperience.map((exp) => (
          <ExperienceCard
            key={ `${exp.name}-experience-card` }
            { ...exp }
          />
        ))
      }
    </ul>
  );
}

export default AcademicExperience;