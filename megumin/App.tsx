/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import Roulette from './components/Roulette';
import Message from './components/Message';

const App = () => {
  const state = {
    options: ['x2', 'pieza', '+100', '-100', 'efecto'],
    messageState: ['hide', 'enter', 'show', 'exit'],
  };
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const [messageState, setMessageState] = useState(0);
  const manageRoulette = () => {
    setRouletteActive(true);
    setTimeout(() => {
      manageRouletteSelectedOption();
    }, 2500);
    setTimeout(() => {
      setRouletteActive(false);
      setSelectedRouletteOption(-1);
    }, 3000);
  };
  const manageRouletteSelectedOption = () => {
    const value = Math.floor(Math.random() * state.options.length);
    setSelectedRouletteOption(value);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageState((messageState + 1) % 4);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{height: 100}}>
        <Message
          height={10}
          message="Hola xd"
          state={state.messageState[messageState]}
        />
      </View>
      <Roulette
        width={50}
        height={50}
        options={state.options}
        active={rouletteActive}
        onPress={manageRoulette}
        selectedOption={selectedRouletteOption}
      />
    </SafeAreaView>
  );
};

export default App;
