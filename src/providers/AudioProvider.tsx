import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import playlist from '../data/playlist';

interface AudioContextValue {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (volume: number) => void;
  getTrackName: () => string;
  getArtist: () => string;
  getThumb: () => string;
}

export const AudioContext = createContext<AudioContextValue | undefined>(
  undefined
);

type AudioProviderProps = {
  children: ReactNode;
};

const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [audioEl] = useState(() => {
    const el = new Audio();
    el.preload = 'none';
    return el;
  });

  const handlePlay = async () => {
    if (isPlaying) {
      await audioEl.play();
    } else {
      audioEl.pause();
    }
  };

  const setVolume = (volume: number) => {
    audioEl.volume = volume;
  };

  const playNext = () => {
    if (audioIndex === playlist.length - 1) {
      setAudioIndex(0);
    } else {
      setAudioIndex(audioIndex + 1);
    }
  };

  const playPrev = () => {
    if (audioIndex === 0) {
      setAudioIndex(playlist.length - 1);
    } else {
      setAudioIndex(audioIndex - 1);
    }
  };

  const getTrackName = () => playlist[audioIndex].name;

  const getArtist = () => playlist[audioIndex].artist;

  const getThumb = () => playlist[audioIndex].thumb;

  useEffect(() => {
    audioEl.src = playlist[audioIndex].src;
    audioEl.addEventListener('ended', playNext);
    handlePlay();
    return () => audioEl.removeEventListener('ended', playNext);
  }, [audioIndex]);

  useEffect(() => {
    handlePlay();
  }, [isPlaying]);

  const value: AudioContextValue = {
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
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
