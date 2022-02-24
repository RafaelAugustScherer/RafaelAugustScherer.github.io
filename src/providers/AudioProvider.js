import playlist from '../data/playlist';
import { createContext, useEffect, useState } from 'react';

export const AudioContext = createContext();

const AudioProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audioEl] = useState(new Audio(playlist[0].src));

  const handlePlay = async () => {
    isPlaying ? await audioEl.play() : audioEl.pause();
  }

  const setVolume = (volume) => {
    audioEl.volume = volume;
  }

  const playNext = () => {
    if (audioIndex === playlist.length - 1) {
      setAudioIndex(0);
    } else {
      setAudioIndex(audioIndex + 1);
    }
  }

  const playPrev = () => {
    if (audioIndex === 0) {
      setAudioIndex(playlist.length - 1);
    } else {
      setAudioIndex(audioIndex - 1);
    }
  }

  const getTrackName = () => playlist[audioIndex].name;

  const getArtist = () => playlist[audioIndex].artist;

  const getThumb = () => playlist[audioIndex].thumb;

  useEffect(() => {
    audioEl.src = playlist[audioIndex].src;
    audioEl.addEventListener('ended', () => playNext());
    audioEl.load();
    handlePlay();
  }, [audioIndex]);

  useEffect(() => {
    handlePlay();
  }, [isPlaying]);

  const value = {
    isPlaying,
    setIsPlaying,
    playNext,
    playPrev,
    setVolume,
    getTrackName,
    getArtist,
    getThumb,
  };

  return (
    <AudioContext.Provider value={ value }>
      { children }
    </AudioContext.Provider>
  );
}

export default AudioProvider;