import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Info } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { usePlayerStore } from "@/store/player-store";
import ModeSelector from "@/components/ModeSelector";
import StatusDisplay from "@/components/StatusDisplay";
import ProgressBar from "@/components/ProgressBar";
import VolumeControl from "@/components/VolumeControl";
import SpeedControl from "@/components/SpeedControl";
import RecordButton from "@/components/RecordButton";
import PlaybackControls from "@/components/PlaybackControls";
import EffectDisplay from "@/components/EffectDisplay";
import BottomTabBar from "@/components/BottomTabBar";
import EffectsGrid from "@/components/EffectsGrid";

export default function HomeScreen() {
  const { mode } = usePlayerStore();
  const [showEffectsGrid, setShowEffectsGrid] = useState(false);
  
  // Reset effects grid visibility when mode changes
  useEffect(() => {
    setShowEffectsGrid(false);
  }, [mode]);
  
  // Function to toggle effects grid visibility
  const toggleEffectsGrid = () => {
    setShowEffectsGrid(prev => !prev);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MOCKED</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Info size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* Mode Selector - Positioned 70px from top */}
      <View style={styles.modeSelectorContainer}>
        <View style={{width: '100%', paddingHorizontal: 8}}>
          <ModeSelector />
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Status Display - Custom text based on mode */}
        <StatusDisplay />
        
        {/* Progress Bar - Hidden in AI mode */}
        {mode !== 'AI' && <ProgressBar />}
        
        {/* Controls Section - Repositioned */}
        <View style={styles.controlsSection}>
          {/* Volume and Speed Controls - Hidden in AI mode */}
          {mode !== 'AI' && <View style={styles.controlsRow}>
            {/* Volume Control */}
            <VolumeControl />
            
            {/* Record Button */}
            <RecordButton />
            
            {/* Speed Control */}
            <SpeedControl />
          </View>}}}
          
          {/* Playback Controls - Hidden in AI mode */}
          {mode !== 'AI' && <View style={styles.playbackControlsContainer}>
            <PlaybackControls />
          </View>
          
          {/* Effect Display - Shown when effects are active and not in AI mode */}
          {mode !== 'AI' && <View style={styles.effectDisplayContainer}>
            <EffectDisplay />
          </View>
          
          {/* Effects Grid - Toggle visibility with FX button from bottom tab */}
          {mode !== 'AI' && showEffectsGrid && (
            <View style={styles.effectsGridContainer}>
              <EffectsGrid />
            </View>
          )}
          
          {/* AI Mode Content */}
          {mode === 'AI' && (
            <View style={styles.aiModeContainer}>
              <Text style={styles.aiModeTitle}>AI ZONE</Text>
              <Text style={styles.aiModeSubtitle}>Funzionalità AI in arrivo</Text>
              
              <View style={styles.aiFeatureList}>
                {[
                  "Parla come...",
                  "Sintesi vocale da testo",
                  "Meme Combo Generator",
                  "Genera immagine da voce",
                  "Sottotitoli automatici",
                  "Green screen AI"
                ].map((feature, index) => (
                  <TouchableOpacity key={index} style={styles.aiFeatureButton}>
                    <Text style={styles.aiFeatureText}>{feature}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
      
      {/* Bottom Tab Bar - Anchored to bottom */}
      <View style={styles.bottomTabContainer}>
        <BottomTabBar onToggleEffectsGrid={toggleEffectsGrid} showEffectsGrid={showEffectsGrid} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // Ridotto da 20
    paddingVertical: Platform.OS === 'android' ? 6 : 12, // Ridotto per Android
    height: 46, // Ridotto da 50
  },
  headerTitle: {
    fontSize: 16, // Ridotto da 18
    fontWeight: 'bold',
    color: colors.error, // Cambiato in rosso
  },
  infoButton: {
    width: 32, // Ridotto da 36
    height: 32, // Ridotto da 36
    borderRadius: 16, // Ridotto da 18
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  modeSelectorContainer: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 4 : 0, // Ulteriormente ridotto
    height: 44, // Ulteriormente ridotto
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controlsSection: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16, // Ridotto da 20
    marginBottom: 8, // Ridotto da 10
  },
  playbackControlsContainer: {
    width: '100%',
    marginTop: -20, // Spostato più in alto per essere più vicino al pulsante REC
    alignItems: 'center',
    marginBottom: 10,
  },
  effectDisplayContainer: {
    width: '100%',
    marginTop: 4, // Ulteriormente ridotto per ottimizzare lo spazio verticale
  },
  effectsGridContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 4, // Ulteriormente ridotto per ottimizzare lo spazio verticale
  },
  aiModeContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'center',
  },
  aiModeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  aiModeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  aiFeatureList: {
    width: '100%',
  },
  aiFeatureButton: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  aiFeatureText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  bottomTabContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});