import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MainGame from './src/components/MainGame/MainGame';
import { Level } from './src/types/types';
import { Provider } from "react-redux";
import { store } from './src/redux'
import MainScreen from './src/components/MainScreen/MainScreen';

const defaultLevel = {
  goal: 0,
  time: 0,
  level: 0
}

const App = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [levelProps, setLevelProps] = useState<Level>(defaultLevel);

  useEffect(() => { // Function for Back Button
    const backAction = () => {
      setIsPlaying(false)
      if (isPlaying === false) BackHandler.exitApp()
      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar hidden />
        {isPlaying ?
          <MainGame levelProps={levelProps} />
          :
          <MainScreen
            setIsPlaying={setIsPlaying}
            setLevelProps={setLevelProps}
            isPlaying={isPlaying}
          />
        }
      </SafeAreaView>
    </Provider>
  );
};

export default App;
