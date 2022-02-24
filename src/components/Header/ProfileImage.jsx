import styles from './style/ProfileImage.module.scss';
import profileImage from '../../assets/images/profile-photo-cut.png';
import BadgeSet from '../Badge/BadgeSet';

const ProfileImage = () => {
  const badges = ['React.js', 'Node.js', 'MongoDB'];

  return (
    <div className={ styles.headerPhotoDiv }>
      <BadgeSet
        className={ styles.headerBadges }
        badges={ badges }
        section='header' />
      <img
        className={ styles.headerPhoto }
        src={ profileImage }
        alt='profile'
      />
    </div>
  );
}

export default ProfileImage;