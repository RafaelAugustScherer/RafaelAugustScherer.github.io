import { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../../providers/AudioProvider';
import * as S from './style/Audio.styles';

const Audio = () => {
  const audio = useContext(AudioContext);
  if (!audio) {
    throw new Error('Audio must be used within an AudioProvider');
  }
  const { playNext, playPrev, getThumb, getArtist, getTrackName } = audio;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const isPlayingHandler = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    audio.setIsPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    audio.setVolume(volume);
  }, [volume]);

  const nextPrevHandler = (value: 'next' | 'prev') =>
    value === 'next' ? playNext() : playPrev();

  return (
    <S.AudioCard>
      <S.CardHeader>
        {isPlaying ? (
          <S.PauseIcon onClick={isPlayingHandler} />
        ) : (
          <S.PlayIcon onClick={isPlayingHandler} />
        )}
        <S.ExpandIcon
          $show={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </S.CardHeader>
      <S.ExpandDiv $expanded={isExpanded}>
        <S.TrackThumb src={getThumb()} alt="track thumb" />
        <S.TrackName>{getTrackName()}</S.TrackName>
        <S.TrackArtist>{getArtist()}</S.TrackArtist>
        <div>
          <S.SkipBackIcon onClick={() => nextPrevHandler('prev')} />
          <S.SkipForwardIcon onClick={() => nextPrevHandler('next')} />
        </div>
        <S.VolumeDiv>
          <S.VolumeDownIcon />
          <S.VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={({ target: { value } }) => setVolume(Number(value))}
          />
          <S.VolumeUpIcon />
        </S.VolumeDiv>
      </S.ExpandDiv>
    </S.AudioCard>
  );
};

export default Audio;
