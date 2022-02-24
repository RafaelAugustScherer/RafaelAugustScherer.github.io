import Badge from './Badge';
import styles from './style/BadgeSet.module.scss';

const BadgeSet = ({ badges, section }) => {
  return (
    <div className={ styles.badgeSet }>
    {
    badges.map((badgeName) =>
      <Badge
        key={ `${badgeName}-${section}` }
        badgeName={ badgeName }
      />)
    }
    </div>
  );
}

export default BadgeSet;