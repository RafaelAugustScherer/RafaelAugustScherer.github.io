import ExperienceCard from './ExperienceCard';
import { professionalExperience } from '../../data/experience';

const ProfessionalExperience = ({ t }) => {
  return (
    <ul>
      <h2>{ t('experience.professional.title') }</h2>
      {
        professionalExperience.map((exp, idx) => (
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

export default ProfessionalExperience;