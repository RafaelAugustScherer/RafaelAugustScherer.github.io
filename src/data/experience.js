import feevaleIcon from '../assets/images/experience/academic/feevale-icon.jpeg';
import trybeIcon from '../assets/images/experience/academic/trybe-icon.jpeg';
import ifsulIcon from '../assets/images/experience/academic/ifsul-icon.jpeg';
import successEnglishIcon from '../assets/images/experience/academic/success-english-icon.jpeg';
import kundenIcon from '../assets/images/experience/professional/kunden-icon.jpeg';
import renovareIcon from '../assets/images/experience/professional/renovare-icon.jpeg';
import madeiraMadeiraIcon from '../assets/images/experience/professional/madeiramadeira-icon.jpeg';
import gupyIcon from '../assets/images/experience/professional/gupy-icon.jpeg'

const academicExperience = [
  {
    name: 'Feevale',
    tKey: 'academic.feevale',
    date: '2023 - present',
    icon: feevaleIcon,
  },
  {
    name: 'Trybe',
    tKey: 'academic.trybe',
    date: '2021 - 2022',
    icon: trybeIcon,
  },
  {
    name: 'IFSul - Câmpus Sapiranga',
    tKey: 'academic.ifsul',
    date: '2017 - 2021',
    icon: ifsulIcon,
  },
  {
    name: 'Success English',
    tKey: 'academic.successEnglish',
    date: '2015 - 2019',
    icon: successEnglishIcon,
  },
];

const professionalExperience = [
  {
    name: 'Gupy',
    tKey: 'professional.gupy',
    date: '2024 - present',
    icon: gupyIcon,
  },
  {
    name: 'MadeiraMadeira',
    tKey: 'professional.madeiraMadeira',
    date: '2022 - 2024',
    icon: madeiraMadeiraIcon,
  },
  {
    name: 'Renovare Telecom',
    tKey: 'professional.renovareTelecom',
    date: '2020 - 2021',
    icon: renovareIcon,
  },
  {
    name: 'Kunden Systems',
    tKey: 'professional.kundenSystems',
    date: '2018 - 2020',
    icon: kundenIcon,
  }
];

export {
  academicExperience,
  professionalExperience,
};
