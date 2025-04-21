import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Pause, Square } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';

const PlaybackControls = () => {
  const { isPlaying, togglePlay, stop, mediaLoaded } = usePlayerStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.playButton]}
        onPress={togglePlay}
        disabled={!mediaLoaded}
        activeOpacity={0.7}
      >
        {isPlaying ? (
          <Pause size={22} color={colors.text} />
        ) : (
          <Play size={22} color={colors.text} />
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={stop}
        disabled={!mediaLoaded}
        activeOpacity={0.7}
      >
        <Square size={18} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, // Ulteriormente ridotto per avvicinare i pulsanti
  },
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.controlYellow, // Giallo chiaro
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: -5,
  },
  playButton: {
    backgroundColor: colors.controlYellow, // Giallo chiaro
    shadowColor: colors.controlYellow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
});

export default PlaybackControls;