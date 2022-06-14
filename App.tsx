import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LevelButton from './src/components/LevelButton/LevelButton';
import MainGame from './src/components/MainGame/MainGame';
import { globalStyles } from './src/globalStyles';

const App = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <SafeAreaView>
      <StatusBar hidden />

      {!isPlaying ?
        <View style={styles.container}>
          <LevelButton number={3} onPress={() => { }} />
        </View>
        :
        <MainGame />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: globalStyles.backgroundColor,

  }
});

export default App;
