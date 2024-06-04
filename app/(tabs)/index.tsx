import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MagicSquare } from '@/components/MagicSquare';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/detective.png')}
          style={styles.detectiveWallpaper}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Magic Square Calculator</ThemedText>
        <HelloWave />
      </ThemedView>
      <MagicSquare
        height='3'
        width='3'
      >
      </MagicSquare>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 'auto',
    marginBottom: 30
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  detectiveWallpaper: {
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
