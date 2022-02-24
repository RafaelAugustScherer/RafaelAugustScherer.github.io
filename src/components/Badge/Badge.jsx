import badges from '../../data/badges';
import styles from './style/Badge.module.scss';

const Badge = ({ badgeName, clickable }) => {
  const goToPage = (url) => window.location.href = url;
  
  const badgeObj = badges.find(({ name }) => name === badgeName);
  
  return (
    <img
      className={ styles.badge }
      src={ badgeObj.src }
      alt={ `${badgeName} Logo` }
      onClick={ () => clickable && goToPage(badgeObj.website) }
    />
  )
}

export default Badge;