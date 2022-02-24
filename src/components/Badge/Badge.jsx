import badges from '../../data/badges';
import styles from './style/Badge.module.scss';

const Badge = ({ badgeName }) => {
  const badgeObj = badges.find(({ name }) => name === badgeName);

  return (
    <img
      className={ styles.badge }
      src={ badgeObj.src }
      alt={ `${badgeName} Logo` }
    />
  );
}

export default Badge;