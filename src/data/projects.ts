import type { TFunction } from 'i18next';
import commanderIcon from '../assets/images/projects/icons/commander.webp';
import domainbookIcon from '../assets/images/projects/icons/domainbook.webp';
import timerIcon from '../assets/images/projects/icons/timer.webp';
import commanderBoard from '../assets/images/projects/commander/3.webp';
import commanderDecks from '../assets/images/projects/commander/1.webp';
import commanderSetup from '../assets/images/projects/commander/2.webp';
import domainbookHome from '../assets/images/projects/domainbook/1.webp';
import domainbookMap from '../assets/images/projects/domainbook/2.webp';
import domainbookDomain from '../assets/images/projects/domainbook/3.webp';
import domainbookGlossary from '../assets/images/projects/domainbook/4.webp';
import timerIdle from '../assets/images/projects/timer/1.webp';
import timerRunning from '../assets/images/projects/timer/2.webp';
import timerDetonation from '../assets/images/projects/timer/3.webp';

type Project = {
  id: string;
  name: string;
  blurb: string;
  tech: string[];
  repository: string;
  website?: string;
  icon: string;
  shots: string[];
};

const projects = (t: TFunction): Project[] => [
  {
    id: 'commander-playtester',
    name: 'Commander Playtester',
    blurb: t('projects.blurbs.commander'),
    tech: ['React', 'TypeScript', 'Rust/WASM'],
    repository: 'https://github.com/RafaelAugustScherer/commander-playtester',
    website: 'https://rafaelaugustscherer.github.io/commander-playtester/',
    icon: commanderIcon,
    shots: [commanderBoard, commanderDecks, commanderSetup],
  },
  {
    id: 'domainbook',
    name: 'Domainbook',
    blurb: t('projects.blurbs.domainbook'),
    tech: ['TypeScript', 'MCP', 'CLI'],
    repository: 'https://github.com/RafaelAugustScherer/domainbook',
    icon: domainbookIcon,
    shots: [domainbookHome, domainbookMap, domainbookDomain, domainbookGlossary],
  },
  {
    id: 'timer',
    name: 'Pip-Boy Timer',
    blurb: t('projects.blurbs.timer'),
    tech: ['React', 'JavaScript'],
    repository: 'https://github.com/RafaelAugustScherer/timer',
    website: 'https://rafaelaugustscherer.github.io/timer/',
    icon: timerIcon,
    shots: [timerIdle, timerRunning, timerDetonation],
  },
];

export const projectById = (t: TFunction, id: string): Project | undefined =>
  projects(t).find((p) => p.id === id);

export type { Project };
export default projects;
