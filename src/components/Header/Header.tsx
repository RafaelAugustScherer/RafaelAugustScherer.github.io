import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import outrunVideo from '../../assets/videos/outrun.mp4';
import outrunPoster from '../../assets/videos/outrun-poster.webp';
import MovingText from '../../utils/MovingText';
import NextPageArrow from '../NextPageArrow';
import LanguageSelector from './LanguageSelector';
import ProfileImage from './ProfileImage';
import * as S from './style/Header.styles';

const Header = () => {
  const { t } = useTranslation();

  return (
    <S.Header>
      <S.HeaderVideo
        src={outrunVideo}
        poster={outrunPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <LanguageSelector />
      <S.LinksDiv>
        <S.HeaderLink
          href="https://www.linkedin.com/in/rafael-augusto-scherer/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <FaLinkedin aria-hidden="true" />
        </S.HeaderLink>
        <S.HeaderLink
          href="https://github.com/RafaelAugustScherer"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <FaGithub aria-hidden="true" />
        </S.HeaderLink>
      </S.LinksDiv>
      <S.HeaderBioDiv>
        <ProfileImage />
        <S.HeaderText>
          {t('header.text')}
          <br />
          <MovingText
            words={t('header.movingText', { returnObjects: true }) as string[]}
          />
        </S.HeaderText>
      </S.HeaderBioDiv>
      <NextPageArrow url="#about" />
    </S.Header>
  );
};

export default Header;
