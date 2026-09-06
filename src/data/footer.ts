import type { ComponentType } from 'react';
import type { TFunction } from 'i18next';
import { FaGithub, FaLinkedin, FaReact, FaSass } from 'react-icons/fa';
import { Mail } from 'lucide-react';

type IconComponent = ComponentType<{ className?: string }>;

type FooterLink = {
  name: string;
  icon?: IconComponent;
  url: string;
};

const contactLinks: FooterLink[] = [
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
    icon: Mail,
    url: 'mailto:rafaelaugustscherer@gmail.com'
  }
];

const madeWithLinks: FooterLink[] = [
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
];

const referenceLinks = (t: TFunction) => ({
  [t('footer.references.headerVideo')]: 'https://youtu.be/lrf-GAYUOkQ',
  [t('footer.references.projectsBackground')]: 'https://imgur.com/t/outrun/NTB8H1X',
  [t('footer.references.aboutExperienceBackground')]: 'https://www.wallpaperflare.com/music-stars-planet-space-pyramid-background-neon-synth-wallpaper-unkuq',
  [t('footer.references.playlist')]: 'https://music.youtube.com/playlist?list=PLG9hZs0y-_kN0oh7W6PSgE2hpTEoFGkSv'
});

export {
  contactLinks,
  madeWithLinks,
  referenceLinks
};
