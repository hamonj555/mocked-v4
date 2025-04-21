import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';

const VolumeControl = () => {
  const { volume, increaseVolume, decreaseVolume } = usePlayerStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={increaseVolume}
      >
        <ChevronUp size={20} color={colors.controlGreen} />
      </TouchableOpacity>
      
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{volume}%</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={decreaseVolume}
      >
        <ChevronDown size={20} color={colors.controlGreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 44, // Adattato al design di riferimento
    height: 44, // Adattato al design di riferimento
    borderRadius: 22, // Corrispondente alla metà della larghezza/altezza
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2, // Ulteriormente ridotto
  },
  valueText: {
    fontSize: 16, // Ridotto da 18
    fontWeight: '600',
    color: colors.text,
  },
});

export default VolumeControl;