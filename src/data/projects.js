const projects = (t) => ([
  {
    name: t('projects.list.spotrybe'),
    dir: 'spotrybe',
    badges: ['JavaScript', 'React.js', 'Group'],
    repository: 'https://github.com/RafaelAugustScherer/Spotrybe/',
    website: 'https://rafaelaugustscherer.github.io/Spotrybe/'
  },
  {
    name: t('projects.list.recipesApp'),
    dir: 'recipes-app',
    badges: ['JavaScript', 'React.js', 'Group'],
    repository: 'https://github.com/RafaelAugustScherer/recipes-app/',
    website: 'https://rafaelaugustscherer.github.io/recipes-app/'
  },
  {
    name: t('projects.list.falloutTimer'),
    dir: 'timer',
    badges: ['JavaScript', 'React.js'],
    repository: 'https://github.com/RafaelAugustScherer/timer/',
    website: 'https://rafaelaugustscherer.github.io/timer/'
  }]);

export default projects;