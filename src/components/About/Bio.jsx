import { Trans } from 'react-i18next';
import profilePhoto from '../../assets/images/profile-photo.jpeg';
import { misc } from '../../data/about';
import styles from './style/Bio.module.scss';

const Bio = () => {
  return (
    <div className={styles.bioDiv} data-aos="fade-right" data-aos-duration="1500">
        <div className={styles.aboutPhotoWrapper} >
          <img className={styles.aboutPhoto} src={profilePhoto} alt="profile" />
          <div className={styles.miscDiv}>
            {
              misc.map(({ name, icon }) => (
                <div key={name} className={styles.miscItem}>
                  {icon()}
                  <span>{name}</span>
                </div>
              ))
            }
          </div>
        </div>
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
      </div>
  )
}

export default Bio;