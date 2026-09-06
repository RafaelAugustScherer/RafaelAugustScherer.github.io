import ExperienceCard from './ExperienceCard';
import { academicExperience } from '../../data/experience';

const AcademicExperience = () => {
  return (
    <ul>
      {academicExperience.map((exp, idx) => (
        <ExperienceCard
          key={`${exp.name}-experience-card`}
          index={idx}
          {...exp}
        />
      ))}
    </ul>
  );
};

export default AcademicExperience;
