// Player types
export type MediaMode = 'AUDIO' | 'VIDEO' | 'MEME' | 'AI';

export type PlayerState = {
  mode: MediaMode;
  isPlaying: boolean;
  isRecording: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  speed: number;
  activeEffects: string[];
  mediaLoaded: boolean;
};

export type MediaEffect = {
  id: string;
  name: string;
  type: MediaMode | 'ALL';
  description: string;
  icon?: string;
  color?: string;
};