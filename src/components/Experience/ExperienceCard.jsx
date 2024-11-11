import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { MdOutlineArrowRight } from 'react-icons/md';
import styles from './style/ExperienceCard.module.scss';

const ExperienceCard = ({ name, tKey, date, icon, index }) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);

  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    const newParagraphs = [];
    t(`experience.${tKey}`, { returnObjects: true }).map((p) => {
      newParagraphs.push(p);
    })
    setParagraphs(newParagraphs);
  }, [t]);

  useEffect(() => {
    if (isToggled) {
      const originalParagraphs = [...paragraphs];

      const scrambleInterval = setInterval(scrambleParagraphs, 100);
      setTimeout(() => {
        clearInterval(scrambleInterval);
        setParagraphs(originalParagraphs);
      }, 750);
    }
  }, [isToggled]);

  const scrambleParagraphs = async () => {
    setParagraphs(paragraphs.map((p) =>
      p.split('').map(char => char === ' ' ? ' ' : Math.random() > 0.5 ? char : Math.random() > 0.5 ? '0' : '1').join('')
    ))
  }

  return (
    <li
      key={ `${name}-experience` }
      className={styles.experienceItem }
      onClick={ () => setIsToggled(!isToggled) }
      data-aos="fade-down" data-aos-duration={ index * 1250 }
    >
      <h3 className={ styles.itemTitle }>
      <MdOutlineArrowRight
        className={ `${ styles.itemArrow } ${ isToggled ? styles.toggle : '' }` }
      />
      <img
        className={ styles.itemIcon }
        src={ icon }
        alt={ `${name}-icon` }
      />
      <span>{ name }</span>
      &nbsp;
      <span>({ date })</span>
      </h3>
      <div className={ `${styles.itemTextDiv}  ${ isToggled ? styles.toggle : '' }`  } >
        {
          paragraphs.map((p, idx) => (
            <p
              key={ `${name}-${idx}` }
              className={ styles.itemText }
            >
              <Trans>{ p }</Trans>
            </p>
          ))
        }
      </div>
    </li>
  );
}

export default ExperienceCard;
