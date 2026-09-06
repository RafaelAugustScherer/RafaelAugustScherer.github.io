import type { ComponentType } from 'react';
import { CodeXml, Gamepad2, Bike } from 'lucide-react';

type IconComponent = ComponentType<{ className?: string }>;

type Skill = {
  name: string;
  website: string;
};

type MiscItem = {
  name: string;
  icon: IconComponent;
};

const skills: Skill[] = [
  {
    name: 'JavaScript',
    website: 'https://www.javascript.com/',
  },
  {
    name: 'TypeScript',
    website: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Python',
    website: 'https://www.python.org/',
  },
  {
    name: 'Git',
    website: 'https://git-scm.com/'
  },
  {
    name: 'Docker',
    website: 'https://www.docker.com/',
  },
  {
    name: 'Node.js',
    website: 'https://nodejs.org/'
  },
  {
    name: 'React.js',
    website: 'https://reactjs.org/'
  },
  {
    name: 'MongoDB',
    website: 'https://www.mongodb.com/'
  },
  {
    name: 'Go',
    website: 'https://www.go.dev/'
  },
  {
    name: 'MySQL',
    website: 'https://www.mysql.com/'
  },
];

const misc: MiscItem[] = [
  {
    name: 'Programmer',
    icon: CodeXml
  },
  {
    name: 'Gamer',
    icon: Gamepad2
  },
  {
    name: 'Biker',
    icon: Bike
  }
];

export {
  skills,
  misc
};
