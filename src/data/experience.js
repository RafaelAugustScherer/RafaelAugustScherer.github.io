import trybeIcon from '../assets/images/experience/academic/trybe-icon.jpeg';
import ifsulIcon from '../assets/images/experience/academic/ifsul-icon.jpeg';
import successEnglishIcon from '../assets/images/experience/academic/success-english-icon.jpeg';
import kundenIcon from '../assets/images/experience/professional/kunden-icon.jpeg';
import renovareIcon from '../assets/images/experience/professional/renovare-icon.jpeg';
import madeiraMadeiraIcon from '../assets/images/experience/professional/madeiramadeira-icon.jpeg';

const academicExperience = [
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
    text: `Success English is an English School institution with \bgreat prestige and recognition in my hometown.\b It uses the Top Notch Book Series and its tests to teach the students from Fundamentals to Advanced English. The course uses \bwritten and spoken tests\b to evaluate each student's performance.
    The institution is recognized by their \bhigh-achieving students in the English Language\b, with a very effective method applied over the years. There I was able to learn most of what I currently know, and with the \bconstant contact with the language\b I am able to keep a good English level overall.`
  },
];

const professionalExperience = [
  {
    name: 'MadeiraMadeira',
    tKey: 'professional.madeiraMadeira',
    date: '2022 - present',
    icon: madeiraMadeiraIcon,
  },
  {
    name: 'Renovare Telecom',
    tKey: 'professional.renovareTelecom',
    date: '2020 - 2021',
    icon: renovareIcon,
    text: `Renovare Telecom is a \bTelecommunication Company\b from my hometown. The owners started the company in 2010 and \bafter 10 years of operation it is already the biggest in town.\b It also operates in many other countryside cities.
    I was hired by the company in the middle of the pandemic as an \bIT Intern\b, some months after I'd been dismissed by Kunden. That opportunity was \bone of the best things that happened to me that year.\b
    There I learned a lot about \benterprise servers, cloning and fixing corrupted operational systems, file recovery and some Debian commands and processes.\b I was responsible for the installation and setup of OSs for each and every employee. Upgrades and replacements were often needed as well. Most of the things I learned \bI owe to my colleagues, with years of experience in IT.\b`
  },
  {
    name: 'Kunden Systems',
    tKey: 'professional.kundenSystems',
    date: '2018 - 2020',
    icon: kundenIcon,
    text: `Kunden Systems is an \bIndustrial & Comercial Enterprise Resource Planning (ERP) provider\b. It operates mainly in the \bsouth region of Brazil\b, but there are \bclients spread all over South America.\b
    There I had \bmy first professional/working experience\b in the Information Technology area and it was really \bimportant for me and my perception of myself.\b My capabilites were put to test and I \blearned a lot with the people around me.\b From opening notebooks to applying fixes in \bPL/SQL Production and Test Databases.\b`
  },
];

export {
  academicExperience,
  professionalExperience,
};
