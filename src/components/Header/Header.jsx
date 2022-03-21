import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import outrunVideo from '../../assets/videos/outrun.m4v';
import MovingText from '../../utils/MovingText';
import NextPageArrow from '../NextPageArrow';
import ProfileImage from './ProfileImage';
import styles from './style/Header.module.scss';

const Header = () => {
  const { t } = useTranslation();
  const goToPage = (url) => window.open(url, 'blank');

  return (
    <header className={styles.header}>
      <video className={styles.headerVideo} src={outrunVideo} autoPlay loop muted />
      <div className={styles.linksDiv}>
        <FaLinkedin
          onClick={() => goToPage("https://www.linkedin.com/in/rafael-augusto-scherer/")}
          className={styles.headerLink}
          alt="linkedin-icon"
        />
        <FaGithub
          onClick={() => goToPage("https://github.com/RafaelAugustScherer")}
          className={styles.headerLink}
          alt="github-icon"
        />
      </div>
      <div className={ styles.headerBioDiv }>
        <ProfileImage />
        <h1 className={ styles.headerText }>
          { t('header.text') }
          <br />
          <MovingText words={ t('header.movingText', { returnObjects: true }) } />
        </h1>
      </div>
      <NextPageArrow url="#about" />
    </header>
  );
};

export default Header;
