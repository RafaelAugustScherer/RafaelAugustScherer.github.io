import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { getImages } from '../../utils/images';
import styles from './style/ImageGallery.module.scss';

const ImageGallery = ({ project, nextProject, prevProject }) => {
  const [ curImage, setCurImage ] = useState(0);
  const [ images, setImages ] = useState([]);
  const [ autoTimeout, setAutoTimeout ] = useState(null);

  const nextImage = () => (
    curImage === images.length - 1 && curImage !== 0
      ? nextProject()
      : setCurImage(curImage + 1)
  );

  const autoGallery = () => {
    clearInterval(autoTimeout);
    const newTimeout = setTimeout(() => nextImage(), 3000);
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
    <div className={styles.imageGalleryContainer}>
      <img
        className={styles.galleryImage}
        src={images[ curImage ]}
        alt={`${project.dir}-${curImage}`}
      />
      <MdKeyboardArrowLeft
        className={styles.prevButton}
        onClick={prevProject}
      />
      <MdKeyboardArrowRight
        className={styles.nextButton}
        onClick={nextProject}
      />
      <div className={styles.dotContainer}>
        {
          images.map((_el, idx) => (
            <span
              key={`${project.dir}-dot-${idx}`}
              style={{ backgroundColor: curImage === idx ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}
              className={styles.galleryDot}
              onClick={() => setCurImage(idx)}
            >
            </span>
          ))
        }
      </div>
    </div>
  );
}

export default ImageGallery;