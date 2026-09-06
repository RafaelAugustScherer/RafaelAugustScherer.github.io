import { Trans } from 'react-i18next';
import profilePhoto from '../../assets/images/profile-photo.webp';
import { misc } from '../../data/about';
import * as S from './style/Bio.styles';

const Bio = () => {
  return (
    <S.BioDiv data-aos="fade-right" data-aos-duration="1500">
        <S.AboutPhotoWrapper>
          <S.AboutPhoto
            src={profilePhoto}
            alt="Rafael Augusto Scherer"
            loading="lazy"
            decoding="async"
          />
          <S.MiscDiv>
            {
              misc.map(({ name, icon: Icon }) => (
                <S.MiscItem key={name}>
                  <Icon />
                  <span>{name}</span>
                </S.MiscItem>
              ))
            }
          </S.MiscDiv>
        </S.AboutPhotoWrapper>
        <p>
          <span>
            <Trans i18nKey="about.firstParagraph" />
          </span>
          <span>
            <Trans i18nKey="about.secondParagraph" />
          </span>
          <span>
            <Trans i18nKey="about.thirdParagraph" />
          </span>
        </p>
      </S.BioDiv>
  )
}

export default Bio;
