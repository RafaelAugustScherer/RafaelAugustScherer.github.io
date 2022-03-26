import i18n from '../translation/i18n';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaSass } from 'react-icons/fa';

const contactLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/RafaelAugustScherer'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://github.com/RafaelAugustScherer'
  },
  {
    name: 'rafaelaugustscherer@gmail.com',
    icon: FaEnvelope,
    url: 'mailto:rafaelaugustscherer@gmail.com'
  }
];

const madeWithLinks = [
  {
    name: 'React',
    icon: FaReact,
    url: 'https://reactjs.org/'
  },
  {
    name: 'React Icons',
    url: 'https://react-icons.github.io/react-icons/'
  },
  {
    name: 'Sass',
    icon: FaSass,
    url: 'https://sass-lang.com/'
  },
  {
    name: 'react-i18next',
    url: 'https://react.i18next.com/' 
  }
]

const referenceLinks = (t) => ({
  [t('footer.references.headerVideo')]: 'https://youtu.be/lrf-GAYUOkQ',
  [t('footer.references.projectsBackground')]: 'https://imgur.com/t/outrun/NTB8H1X',
  [t('footer.references.aboutExperienceBackground')]: 'https://www.wallpaperflare.com/music-stars-planet-space-pyramid-background-neon-synth-wallpaper-unkuq',
  [t('footer.references.playlist')]: 'https://music.youtube.com/playlist?list=PLG9hZs0y-_kN0oh7W6PSgE2hpTEoFGkSv'
});

export {
  contactLinks,
  madeWithLinks,
  referenceLinks
}