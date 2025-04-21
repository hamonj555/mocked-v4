import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MediaMode, PlayerState } from '@/types/player';
import { effects } from '@/mocks/effects';

interface PlayerStore extends PlayerState {
  setMode: (mode: MediaMode) => void;
  togglePlay: () => void;
  stop: () => void;
  toggleRecording: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  setVolume: (volume: number) => void;
  increaseSpeed: () => void;
  decreaseSpeed: () => void;
  setSpeed: (speed: number) => void;
  addEffect: (effectId: string) => void;
  removeEffect: (effectId: string) => void;
  toggleEffect: (effectId: string) => void;
  getActiveEffectsNames: () => string[];
  resetPlayer: () => void;
}

const initialState: PlayerState = {
  mode: 'AUDIO',
  isPlaying: false,
  isRecording: false,
  currentTime: 0,
  duration: 20, // Default duration in seconds
  volume: 80,
  speed: 100,
  activeEffects: ['effect-glitch', 'effect-zoom'], // Default effects
  mediaLoaded: true, // For demo purposes
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setMode: (mode) => set({ mode, isRecording: false }),
      
      togglePlay: () => {
        const { isPlaying, mediaLoaded } = get();
        if (mediaLoaded) {
          set({ isPlaying: !isPlaying });
        }
      },
      
      stop: () => set({ isPlaying: false, currentTime: 0 }),
      
      toggleRecording: () => {
        const { isRecording, mode } = get();
        if (mode === 'MEME') return; // Can't record in MEME mode
        set({ 
          isRecording: !isRecording,
          isPlaying: false,
          mediaLoaded: isRecording ? true : get().mediaLoaded
        });
      },
      
      setCurrentTime: (time) => set({ currentTime: time }),
      
      setDuration: (duration) => set({ duration }),
      
      increaseVolume: () => {
        const { volume } = get();
        if (volume < 100) {
          set({ volume: Math.min(volume + 10, 100) });
        }
      },
      
      decreaseVolume: () => {
        const { volume } = get();
        if (volume > 0) {
          set({ volume: Math.max(volume - 10, 0) });
        }
      },
      
      setVolume: (volume) => set({ volume }),
      
      increaseSpeed: () => {
        const { speed } = get();
        if (speed < 200) {
          set({ speed: Math.min(speed + 25, 200) });
        }
      },
      
      decreaseSpeed: () => {
        const { speed } = get();
        if (speed > 25) {
          set({ speed: Math.max(speed - 25, 25) });
        }
      },
      
      setSpeed: (speed) => set({ speed }),
      
      addEffect: (effectId) => {
        const { activeEffects } = get();
        if (!activeEffects.includes(effectId)) {
          set({ activeEffects: [...activeEffects, effectId] });
        }
      },
      
      removeEffect: (effectId) => {
        const { activeEffects } = get();
        set({ activeEffects: activeEffects.filter(id => id !== effectId) });
      },
      
      toggleEffect: (effectId) => {
        const { activeEffects } = get();
        if (activeEffects.includes(effectId)) {
          set({ activeEffects: activeEffects.filter(id => id !== effectId) });
        } else {
          set({ activeEffects: [...activeEffects, effectId] });
        }
      },
      
      getActiveEffectsNames: () => {
        const { activeEffects } = get();
        return activeEffects.map(id => {
          const effect = effects.find(e => e.id === id);
          return effect ? effect.name : '';
        }).filter(name => name !== '');
      },
      
      resetPlayer: () => set({ ...initialState }),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        volume: state.volume,
        speed: state.speed,
        activeEffects: state.activeEffects,
      }),
    }
  )
);