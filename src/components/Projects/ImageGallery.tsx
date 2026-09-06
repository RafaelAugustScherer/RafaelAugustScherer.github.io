import { useEffect, useState } from 'react';
import { getImages } from '../../utils/images';
import type { Project } from '../../data/projects';
import * as S from './style/ImageGallery.styles';

type ImageGalleryProps = {
  project: Project;
  nextProject: () => void;
  prevProject: () => void;
};

const ImageGallery = ({ project, nextProject, prevProject }: ImageGalleryProps) => {
  const [ curImage, setCurImage ] = useState(0);
  const [ images, setImages ] = useState<string[]>([]);
  const [ autoTimeout, setAutoTimeout ] = useState<number | undefined>(undefined);

  const nextImage = () => (
    curImage === images.length - 1 && curImage !== 0
      ? nextProject()
      : setCurImage(curImage + 1)
  );

  const autoGallery = () => {
    window.clearTimeout(autoTimeout);
    const newTimeout = window.setTimeout(() => nextImage(), 3000);
    setAutoTimeout(newTimeout);
  };

  useEffect(() => {
    setCurImage(0);
    const newImages = getImages('projects/' + project.dir);
    setImages(newImages);
  }, [ project ]);


  useEffect(() => {
    autoGallery();
  }, [ curImage ]);

  return (
    <S.ImageGalleryContainer data-aos="fade-right">
      <S.GalleryImage
        src={images[ curImage ]}
        alt={`${project.name} screenshot ${curImage + 1}`}
        loading="lazy"
        decoding="async"
      />
      <S.PrevButton
        onClick={prevProject}
      />
      <S.NextButton
        onClick={nextProject}
      />
      <S.DotContainer>
        {
          images.map((_el, idx) => (
            <S.GalleryDot
              key={`${project.dir}-dot-${idx}`}
              style={{ backgroundColor: curImage === idx ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}
              onClick={() => setCurImage(idx)}
            >
            </S.GalleryDot>
          ))
        }
      </S.DotContainer>
    </S.ImageGalleryContainer>
  );
}

export default ImageGallery;
