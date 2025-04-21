import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Mic, Video, Image, Bot } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';

const RecordButton = () => {
  const { mode, isRecording, toggleRecording } = usePlayerStore();

  const renderIcon = () => {
    const size = 30; // Aumentato leggermente per visibilità
    const color = colors.text;
    
    switch (mode) {
      case 'AUDIO':
        return <Mic size={size} color={color} />;
      case 'VIDEO':
        return <Video size={size} color={color} />;
      case 'MEME':
        return <Image size={size} color={color} />;
      case 'AI':
        return <Bot size={size} color={color} />;
      default:
        return <Mic size={size} color={color} />;
    }
  };

  const isDisabled = mode === 'MEME' || mode === 'AI';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isRecording && styles.recording,
        isDisabled && styles.disabled,
      ]}
      onPress={toggleRecording}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.text, // Bianco
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginHorizontal: 10,
    zIndex: 10,
    marginTop: -10,
    borderWidth: 2,
    borderColor: colors.controlRed, // Bordo rosso
  },
  recording: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.surfaceLight,
    opacity: 0.7,
    shadowOpacity: 0.1,
  },
  iconContainer: {
    width: 60, // Leggermente ridotto
    height: 60, // Leggermente ridotto
    borderRadius: 30, // Corrispondente alla metà della larghezza/altezza
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecordButton;