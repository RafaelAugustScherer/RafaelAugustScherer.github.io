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
            I'm a passionate <b>IT Student and Tech Enthusiast</b>. I love to use the concept of <b>DIY</b> when dealing with hardware and software making. I also live in a small city located in the state of Rio Grande do Sul, Brazil.
          </span>
          <span>
            I've been in contact with technology since forever, as my dad was the owner of an Arcade / Internet Café and there I spent most of my childhood's time, playing videogames and helping when needed.
          </span>
        </p>
      </div>
  )
}

export default Bio;