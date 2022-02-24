import { useState } from 'react';
import { MdOutlineArrowRight } from 'react-icons/md';
import styles from './style/ExperienceCard.module.scss';

const ExperienceCard = ({ name, date, icon, text }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleBreakline = text => text.split('\n');
  const handleBold = text => text
  .split('\b')
  .reduce((acc, str, idx) => (
    idx % 2 === 1 ? <>{ acc }<b>{ str }</b></> : <>{ acc }{str}</>
  ));

  const textSplit = (text) => (
    handleBreakline(text)
    .map((str, idx) => (
    <p 
      key={ `${name}-${idx}` }
      className={ styles.itemText }
    >
      { handleBold(str) }
    </p>
    ))
  );
  
  return (
    <li
      className={styles.experienceItem }
      key={ `${name}-experience` }
      onClick={ () => setIsToggled(!isToggled) }
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
        { textSplit(text) }
      </div>
    </li>
  );
}

export default ExperienceCard;