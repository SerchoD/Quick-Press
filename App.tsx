import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import MainGame from './src/components/MainGame/MainGame';
import { globalStyles } from './src/globalStyles';
import { LEVELS } from './src/constants/Levels';
import { Level } from './src/types/types';
import LevelButton from './src/components/LevelButton/LevelButton';
import { getStoredCurrentLevel } from './src/asyncStorage/currentLevelStorage';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomModal from './src/components/CustomModal/CustomModal';
import CustomButton from './src/components/CustomButton/CustomButton';

const defaultLevel = {
  goal: 0,
  time: 0,
  level: 0
}

const App = () => {

  const [showMenuModal, setShowMenuModal] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [levelProps, setLevelProps] = useState<Level>(defaultLevel)
  const [currentLevel, setCurrentLevel] = useState<number>(1)

  const handleLevelPress = (level: any) => {
    setLevelProps(level)
    setIsPlaying(true)
  }

  useEffect(() => {
    getStoredCurrentLevel()
      .then(storedCurrentLevel => {
        if (storedCurrentLevel > 1) {
          setCurrentLevel(storedCurrentLevel)
        }
      });
  }, [isPlaying])

  useEffect(() => { // Function for Back Button
    const backAction = () => {
      setIsPlaying(false)
      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar hidden />
      {isPlaying ?
        <MainGame levelProps={levelProps} />
        :
        <View style={styles.container}>

          <View style={styles.menuIcon}>
            <TouchableOpacity onPress={() => setShowMenuModal(true)}>
              <Ionicons name="menu" size={35} color={globalStyles.color} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.serchoText}>Sercho's</Text>
            <Text style={styles.quickPressText}>Quick Press</Text>
          </View>

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            start={{ x: 0, y: .1 }}
          >
            <ScrollView
              fadingEdgeLength={50}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.levelsContainer}>
                {LEVELS.map((level: any) => {
                  return (
                    <View key={level?.level} style={styles.lvlBtnContainer}>
                      <LevelButton
                        number={level?.level}
                        onPress={() => handleLevelPress(level)}
                        disabled={currentLevel < level?.level} />
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </LinearGradient>

          <CustomModal showModal={showMenuModal}>
            <CustomButton text='X' onPress={() => setShowMenuModal(false)} />
          </CustomModal>
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
  menuIcon: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    right: 10,
    opacity: .5
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
