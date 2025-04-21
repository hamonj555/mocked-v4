import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wand2, Library, Clock, Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type TabItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

type BottomTabBarProps = {
  onToggleEffectsGrid?: () => void;
  showEffectsGrid?: boolean;
};

const BottomTabBar = ({ onToggleEffectsGrid, showEffectsGrid }: BottomTabBarProps) => {
  const [activeTab, setActiveTab] = React.useState('effects');
  
  // Handle tab press
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    
    // Toggle effects grid when FX tab is pressed
    if (tabKey === 'effects' && onToggleEffectsGrid) {
      onToggleEffectsGrid();
    }
  };

  const tabs: TabItem[] = [
    {
      key: 'effects',
      icon: <Wand2 size={16} color={activeTab === 'effects' ? colors.text : colors.textSecondary} />,
      label: 'FX',
    },
    {
      key: 'library',
      icon: <Library size={16} color={activeTab === 'library' ? colors.text : colors.textSecondary} />,
      label: 'Libreria',
    },
    {
      key: 'recent',
      icon: <Clock size={16} color={activeTab === 'recent' ? colors.text : colors.textSecondary} />,
      label: 'Recenti',
    },
    {
      key: 'favorites',
      icon: <Heart size={16} color={activeTab === 'favorites' ? colors.text : colors.textSecondary} />,
      label: 'Preferiti',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
          onPress={() => handleTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            {tab.icon}
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'android' ? 52 : 60, // Ridotto da 60/68
    backgroundColor: '#121212',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'android' ? 8 : 12,
  },
  tabButton: {
    height: 32, // Ridotto da 36
    minWidth: 60, // Ridotto da 70
    marginHorizontal: 4,
    borderRadius: 16, // Metà dell'altezza
    backgroundColor: '#2a2a2a',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.secondary, // Arancione
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabLabel: {
    fontSize: 10,
    marginLeft: 4,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: colors.text,
    fontWeight: '600',
  }
});

export default BottomTabBar;