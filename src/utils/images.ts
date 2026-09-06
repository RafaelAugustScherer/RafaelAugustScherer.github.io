const projectImages = import.meta.glob<string>(
  '../assets/images/projects/**/*.webp',
  { eager: true, import: 'default' }
);

const getImages = (folder: string): string[] => {
  const prefix = `../assets/images/${folder}/`;
  return Object.entries(projectImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
};

export { getImages };
