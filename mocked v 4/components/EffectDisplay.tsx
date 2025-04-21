import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Mic, Plus } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';

const EffectDisplay = () => {
  const { activeEffects, getActiveEffectsNames } = usePlayerStore();
  
  const effectNames = getActiveEffectsNames();
  const effectsText = effectNames.join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.effectsContainer}>
        <Text style={styles.effectText}>
          {effectsText ? "Effetti applicati: " + effectsText : "Nessun effetto applicato"}
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={14} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 8,
    width: '100%',
    marginTop: 15, // Aumentato leggermente per distanziare meglio dai controlli
  },
  effectsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20, // Molto più arrotondato come nell'immagine di riferimento
    paddingVertical: 8,
    paddingHorizontal: 14,
    height: 36,
  },
  label: {
    fontSize: 12, // Ridotto da 13
    color: colors.textSecondary,
    marginRight: 4, // Ridotto da 6
  },
  effectText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary, // Turchese
  },
  addButton: {
    width: 22, // Ridotto da 24
    height: 22, // Ridotto da 24
    borderRadius: 11, // Ridotto da 12
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EffectDisplay;