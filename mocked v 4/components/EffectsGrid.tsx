import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { 
  Zap, 
  Sparkles, 
  Clapperboard, 
  Sun, 
  ZoomIn, 
  Sparkle, 
  Flame, 
  Stars, 
  Waves, 
  Eye 
} from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { colors } from '@/constants/colors';
import { effects } from '@/mocks/effects';

const EffectsGrid = () => {
  const { toggleEffect, activeEffects } = usePlayerStore();

  const getIconForEffect = (iconName: string, color: string) => {
    const size = 18; // Ridotto da 20
    
    switch (iconName) {
      case 'Zap':
        return <Zap size={size} color={color} />;
      case 'Sparkles':
        return <Sparkles size={size} color={color} />;
      case 'Clapperboard':
        return <Clapperboard size={size} color={color} />;
      case 'Sun':
        return <Sun size={size} color={color} />;
      case 'ZoomIn':
        return <ZoomIn size={size} color={color} />;
      case 'Sparkle':
        return <Sparkles size={size} color={color} />;
      case 'Flame':
        return <Flame size={size} color={color} />;
      case 'Stars':
        return <Stars size={size} color={color} />;
      case 'Waves':
        return <Waves size={size} color={color} />;
      case 'Eye':
        return <Eye size={size} color={color} />;
      case 'ScanLine':
        return <Zap size={size} color={color} />;
      default:
        return <Sparkles size={size} color={color} />;
    }
  };

  // Display 15 effects (3 rows of 5)
  const displayEffects = effects.slice(0, 15);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {displayEffects.map((effect) => {
          const isActive = activeEffects.includes(effect.id);
          return (
            <TouchableOpacity
              key={effect.id}
              style={[
                styles.effectItem,
                isActive && { borderColor: effect.color || colors.primary }
              ]}
              onPress={() => toggleEffect(effect.id)}
              activeOpacity={0.7}
            >
              {getIconForEffect(effect.icon || 'Sparkles', effect.color || colors.primary)}
              <Text style={styles.effectName}>{effect.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 8, // Ridotto da 10
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 6, // Ridotto da 8
  },
  effectItem: {
    width: '18%', // Mantenuto per avere 5 colonne
    aspectRatio: 0.9, // Leggermente più rettangolare per risparmiare spazio verticale
    backgroundColor: '#222222',
    borderRadius: 5, // Ulteriormente ridotto
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Ulteriormente ridotto
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 2, // Ulteriormente ridotto
  },
  effectName: {
    fontSize: 8, // Ridotto da 9
    color: colors.text,
    marginTop: 2, // Ridotto da 3
    textAlign: 'center',
  },
});

export default EffectsGrid;