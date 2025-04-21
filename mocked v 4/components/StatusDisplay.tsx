import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';

const StatusDisplay = () => {
  const [placeholderImages, setPlaceholderImages] = useState<{ [key: string]: string }>({});

  const { mode, isPlaying, isRecording } = usePlayerStore();

    // Simulazione di placeholder per le diverse modalità
  useEffect(() => {
    // In un'implementazione reale, questi sarebbero caricati dalle risorse dell'app
    setPlaceholderImages({
      'AUDIO': 'waveform_placeholder.png',
      'VIDEO': 'video_placeholder.png',
      'MEME': 'meme_placeholder.png',
      'AI': 'ai_placeholder.png',
    });
  }, []);

  const getStatusText = () => {
    if (isRecording) {
      return mode === 'AUDIO' 
        ? "Audio in registrazione" 
        : mode === 'VIDEO'
          ? "Video in registrazione"
          : mode === 'AI'
            ? "AI in elaborazione"
            : "Meme in creazione";
    }
    
    if (isPlaying) {
      return mode === 'AUDIO' 
        ? "Audio in riproduzione" 
        : mode === 'VIDEO' 
          ? "Video in riproduzione" 
          : mode === 'AI'
            ? "AI in esecuzione"
            : "Meme visualizzato";
    }
    
    return mode === 'AUDIO' 
      ? "Audio pronto" 
      : mode === 'VIDEO' 
        ? "Video pronto" 
        : mode === 'AI'
          ? "AI pronto"
          : "Meme pronto";
  };

  // Stile condizionale per il container in base alla modalità
  const containerStyle = () => {
    switch(mode) {
      case 'AUDIO':
        return styles.audioContainer;
      case 'VIDEO':
        return styles.videoContainer;
      case 'MEME':
        return styles.memeContainer;
      case 'AI':
        return styles.aiContainer;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.container, containerStyle()]}>
      {mode === 'AI' ? (
        <Text style={[styles.statusText, { fontSize: 20 }]}>Seleziona una funzionalità AI</Text>
      ) : mode === 'MEME' ? (
        <View style={styles.memePreview}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
          <Text style={styles.placeholderText}>Seleziona un template</Text>
        </View>
      ) : (
        <Text style={styles.statusText}>{getStatusText()}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 10,
  },
  memePreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  videoContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  memeContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.controlGreen,
  },
  aiContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.controlRed,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: Platform.OS === 'android' ? 200 : 220, // Ulteriormente aumentata per allineare al nuovo design
    backgroundColor: '#222222',
    borderRadius: 0, // Rimuovere bordi arrotondati per aspetto pulito
    marginHorizontal: 0, // Rimuovere margini laterali
  },
  statusText: {
    fontSize: Platform.OS === 'android' ? 28 : 32,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});

export default StatusDisplay;