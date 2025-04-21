import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Mic, Video, Image, Bot } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';
import { MediaMode } from '@/types/player';

const ModeSelector = () => {
  const { mode, setMode } = usePlayerStore();

  const modes: { type: MediaMode; label: string; icon: React.ReactNode }[] = [
    {
      type: 'AUDIO',
      label: 'AUDIO',
      icon: <Mic size={16} color={mode === 'AUDIO' ? colors.text : '#BBBBBB'} />
    },
    {
      type: 'VIDEO',
      label: 'VIDEO',
      icon: <Video size={16} color={mode === 'VIDEO' ? colors.text : '#BBBBBB'} />
    },
    {
      type: 'MEME',
      label: 'MEME',
      icon: <Image size={16} color={mode === 'MEME' ? colors.text : '#BBBBBB'} />
    },
    {
      type: 'AI',
      label: 'AI ZONE',
      icon: <Bot size={16} color={mode === 'AI' ? colors.text : '#BBBBBB'} />
    }
  ];

  const handleModeChange = (newMode: MediaMode) => {
    setMode(newMode);
  };

  return (
    <View style={styles.container}>
      {modes.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={[
            styles.modeButton,
            mode === item.type && styles.activeMode,
          ]}
          onPress={() => handleModeChange(item.type)}
          activeOpacity={0.7}
        >
          {item.icon}
          <Text
            style={[
              styles.modeText,
              mode === item.type && styles.activeModeText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: Platform.OS === 'android' ? 5 : 10, // Ridotto su Android
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#2A2A2A', // Leggermente più chiaro per un migliore contrasto
    borderRadius: 30,
    gap: 6,
    minWidth: 80,
    marginHorizontal: 2,
    height: 36,
  },
  activeMode: {
    backgroundColor: colors.primary, // Ora turchese
  },
  modeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text, // Cambiato in bianco per migliore visibilità
    textAlign: 'center',
  },
  activeModeText: {
    color: colors.text,
  },
});

export default ModeSelector;