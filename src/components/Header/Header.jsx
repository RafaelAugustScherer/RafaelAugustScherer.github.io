import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import outrunVideo from '../../assets/videos/outrun.m4v';
import MovingText from '../../utils/MovingText';
import NextPageArrow from '../NextPageArrow';
import ProfileImage from './ProfileImage';
import styles from './style/Header.module.scss';

const Header = () => {
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
          Hi, my name is Rafael and I am a
          <br />
          <MovingText words={ [ 'Developer', 'Student', 'Gamer' ] } />
        </h1>
      </div>
      <NextPageArrow url="#about" />
    </header>
  );
};

export default Header;
