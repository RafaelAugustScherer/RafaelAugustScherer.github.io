import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './NextPageArrow.module.scss';

const NextPageArrow = ({ url }) => {

  const goToPage = (url) => window.location.href = url;
  
  return (
    <div
      className={styles.arrowDiv}
      onClick={() => goToPage(url)}
    >
      <MdKeyboardArrowDown className={styles.arrow} />
      <MdKeyboardArrowDown className={styles.arrowShadow} />
    </div>
  );
}

export default NextPageArrow;