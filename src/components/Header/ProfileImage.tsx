import * as S from './style/ProfileImage.styles';
import profileImage from '../../assets/images/profile-photo-cut.webp';
import BadgeSet from '../Badge/BadgeSet';

const ProfileImage = () => {
  const badges = ['React.js', 'Node.js', 'MongoDB'];

  return (
    <S.HeaderPhotoDiv>
      <BadgeSet badges={badges} section="header" />
      <S.HeaderPhoto
        src={profileImage}
        alt="Rafael Augusto Scherer"
        fetchPriority="high"
      />
    </S.HeaderPhotoDiv>
  );
};

export default ProfileImage;
