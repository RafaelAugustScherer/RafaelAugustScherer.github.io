import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import playlist from '../../data/playlist';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: radial-gradient(120% 90% at 50% 0%, #1a1136 0%, var(--surface) 70%);
`;

const Now = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 14px;
`;

const Art = styled.img`
  width: 168px;
  height: 168px;
  object-fit: cover;
  border: 1px solid var(--line);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 26px rgba(255, 0, 234, 0.12);
`;

const Meta = styled.div`
  text-align: center;
  .name {
    font-family: var(--ui);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }
  .artist {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--cyan);
    margin-top: 3px;
  }
`;

const Seek = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 0 20px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
`;

const Range = styled.input`
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: var(--line);
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--cyan);
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--cyan);
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 14px 0 10px;
`;

const CtrlBtn = styled.button`
  display: grid;
  place-items: center;
  color: var(--text-dim);
  &:hover { color: var(--cyan); }
`;

const PlayBtn = styled.button`
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border: 1px solid var(--cyan-dim);
  background: rgba(1, 251, 251, 0.1);
  color: var(--cyan);
  &:hover { background: var(--cyan); color: #04121a; }
`;

const Volume = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 26px 12px;
  color: var(--text-faint);
`;

const Queue = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  border-top: 1px solid var(--line-soft);
`;

const QueueItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  background: ${({ $active }) => ($active ? 'var(--surface-2)' : 'transparent')};
  &:hover { background: var(--surface-2); }
  .idx {
    font-family: var(--mono);
    font-size: 11px;
    color: ${({ $active }) => ($active ? 'var(--cyan)' : 'var(--text-faint)')};
    width: 16px;
  }
  .t-name { font-family: var(--ui); font-size: 12.5px; color: ${({ $active }) => ($active ? 'var(--text)' : 'var(--text-dim)')}; }
  .t-artist { font-family: var(--mono); font-size: 10px; color: var(--text-faint); margin-left: auto; }
`;

const fmt = (s: number): string => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

const MusicApp = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const track = playlist[index];
  const startedRef = useRef(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setProgress(0);
    if (startedRef.current) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [index]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    startedRef.current = true;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const jump = (delta: number) => setIndex((i) => (i + delta + playlist.length) % playlist.length);

  const pick = (i: number) => {
    startedRef.current = true;
    setIndex(i);
  };

  return (
    <Wrap>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIndex((i) => (i + 1) % playlist.length)}
      />
      <Now>
        <Art src={track.thumb} alt={`${track.name} cover`} />
        <Meta>
          <div className="name">{track.name}</div>
          <div className="artist">{track.artist}</div>
        </Meta>
      </Now>
      <Seek>
        <span>{fmt(progress)}</span>
        <Range
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (audioRef.current) audioRef.current.currentTime = v;
            setProgress(v);
          }}
          aria-label="Seek"
        />
        <span>{fmt(duration)}</span>
      </Seek>
      <Controls>
        <CtrlBtn aria-label="Previous" onClick={() => jump(-1)}>
          <SkipBack size={18} />
        </CtrlBtn>
        <PlayBtn aria-label={playing ? 'Pause' : 'Play'} onClick={toggle}>
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </PlayBtn>
        <CtrlBtn aria-label="Next" onClick={() => jump(1)}>
          <SkipForward size={18} />
        </CtrlBtn>
      </Controls>
      <Volume>
        <Volume2 size={15} />
        <Range
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </Volume>
      <Queue>
        {playlist.map((t, i) => (
          <QueueItem key={t.src} $active={i === index} onClick={() => pick(i)}>
            <span className="idx">{i + 1}</span>
            <span className="t-name">{t.name}</span>
            <span className="t-artist">{t.artist}</span>
          </QueueItem>
        ))}
      </Queue>
    </Wrap>
  );
};

export default MusicApp;
