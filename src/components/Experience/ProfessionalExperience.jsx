import ExperienceCard from './ExperienceCard';
import { professionalExperience } from '../../data/experience';

const ProfessionalExperience = () => {
  return (
    <ul>
      <h2>Professional Experience</h2>
      {
        professionalExperience.map((exp) => (
          <ExperienceCard
            key={ `${exp.name}-experience-card` }
            { ...exp }
          />
        ))
      }
    </ul>
  );
}

export default ProfessionalExperience;