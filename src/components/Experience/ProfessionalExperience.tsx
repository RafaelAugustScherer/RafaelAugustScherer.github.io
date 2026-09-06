import ExperienceCard from './ExperienceCard';
import { professionalExperience } from '../../data/experience';

const ProfessionalExperience = () => {
  return (
    <ul>
      {professionalExperience.map((exp, idx) => (
        <ExperienceCard
          key={`${exp.name}-experience-card`}
          index={idx}
          {...exp}
        />
      ))}
    </ul>
  );
};

export default ProfessionalExperience;
