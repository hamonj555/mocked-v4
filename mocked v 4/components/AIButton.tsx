import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Bot } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const AIButton = () => {
  const handlePress = () => {
    Alert.alert(
      "Funzionalità AI",
      "Le funzionalità di intelligenza artificiale saranno disponibili in una versione futura.",
      [{ text: "OK" }]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Bot size={28} color={colors.iconActive} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60, // Reduced size
    height: 60, // Reduced size
    borderRadius: 15,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 5, // Reduced margin
    marginBottom: 10, // Reduced margin
  },
});

export default AIButton;