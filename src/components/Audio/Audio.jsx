import { useContext, useEffect, useState } from 'react';
import styles from './style/Audio.module.scss';
import { AudioContext } from '../../providers/AudioProvider';
import {
  MdKeyboardArrowDown,
  MdVolumeUp,
  MdVolumeDown,
  MdMusicNote,
  MdMusicOff,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md';

const Audio = () => {
  const AudioProvider = useContext(AudioContext);
  const {
    playNext,
    playPrev,
    getThumb,
    getArtist,
    getTrackName
  } = AudioProvider;
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ volume, setVolume ] = useState(.5);

  const isPlayingHandler = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    AudioProvider.setIsPlaying(isPlaying);
  }, [ isPlaying ]);

  useEffect(() => {
    AudioProvider.setVolume(volume);
  }, [ volume ]);

  const nextPrevHandler = (value) => (
    value === 'next'
      ? playNext()
      : playPrev()
  );

  return (
    <div className={styles.audioCard}>
      <div className={ styles.cardHeader }>
        {
          isPlaying
            ? <MdMusicNote
              className={styles.audioIcon}
              onClick={isPlayingHandler}
            />
            : <MdMusicOff
              className={styles.audioIcon}
              onClick={isPlayingHandler}
            />
        }
        <MdKeyboardArrowDown
          className={`${styles.expandIcon} ${isExpanded ? styles.show : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
          <div className={ isExpanded ? styles.expandDivToggle : styles.expandDiv }>
            <img
              className={styles.trackThumb}
              src={getThumb()}
              alt="track thumb"
            />
            <span className={styles.trackName}>
              {getTrackName()}
            </span>
            <span className={styles.trackArtist}>
              {getArtist()}
            </span>
            <div>
              <MdSkipPrevious
                className={styles.icon}
                onClick={() => nextPrevHandler('prev')}
              />
              <MdSkipNext
                className={styles.icon}
                onClick={() => nextPrevHandler('next')}
              />
            </div>
            <div className={styles.volumeDiv}>
              <MdVolumeDown className={styles.sliderIcon} />
              <input
                className={styles.volumeSlider}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={({ target: { value } }) => setVolume(value)}
              />
              <MdVolumeUp className={styles.sliderIcon} />
            </div>
          </div>
    </div>
  );
}

export default Audio;