import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MainGame from './src/components/MainGame/MainGame';
import { globalStyles } from './src/globalStyles';
import { LEVELS } from './src/constants/Levels';
import RNFadedScrollView from 'rn-faded-scrollview';
import { Level } from './src/types/types';
import LevelButton from './src/components/LevelButton/LevelButton';

const defaultLevel = {
  goal: 0,
  time: 0,
  level: 0
}

const App = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [levelProps, setLevelProps] = useState<Level>(defaultLevel)

  const handleLevelPress = (level: any) => {
    console.log(level)
    setLevelProps(level)
    setIsPlaying(true)
  }

  return (
    <SafeAreaView>
      <StatusBar hidden />

      {isPlaying ?
        <MainGame levelProps={levelProps} />
        :
        <View style={styles.container}>

          <View style={styles.titleContainer}>
            <Text style={styles.serchoText}>Sercho's</Text>
            <Text style={styles.quickPressText}>Quick Press</Text>
          </View>


          <ScrollView
            fadingEdgeLength={50}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.levelsContainer}>
              {LEVELS.map((level: any) => {
                return (
                  <View key={level?.level} style={styles.lvlBtnContainer}>
                    <LevelButton number={level?.level} onPress={() => handleLevelPress(level)} />
                  </View>
                )
              })}
            </View>
          </ScrollView>

        </View>

      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: globalStyles.backgroundColor,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: globalStyles.backgroundColor,
  },
  backgroundStyle: {
    flex: 1
  },
  serchoText: {
    color: globalStyles.color,
    ...globalStyles.textShadow,

  },
  quickPressText: {
    fontSize: 40,
    ...globalStyles.textShadow,
    color: globalStyles.color
  },
  levelsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 0,
  },
  lvlBtnContainer: {
    margin: '2%'
  }
});

export default App;
