import { RiCodeSSlashFill } from 'react-icons/ri' ;
import { MdPedalBike } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';

const skills = [
  {
    name: 'JavaScript',
    website: 'https://www.javascript.com/'
  },
  {
    name: 'Git',
    website: 'https://git-scm.com/'
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
    name: 'MySQL',
    website: 'https://www.mysql.com/'
  },
];


const misc = [
  {
    name: 'Programmer',
    icon: RiCodeSSlashFill
  },
  {
    name: 'Gamer',
    icon: IoGameController
  },
  {
    name: 'Biker',
    icon: MdPedalBike
  }
];

export {
  skills,
  misc
}