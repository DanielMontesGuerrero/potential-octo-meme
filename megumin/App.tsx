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
    messages: ['Hola xd', 'Que pro B)', 'Que noob'],
  };
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const [messageIndex, setMessageIndex] = useState(0);
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
      setMessageIndex((messageIndex + 1) % state.messages.length);
    }, 9000);
    return () => clearInterval(interval);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{height: 100}}>
        <Message message={state.messages[messageIndex]} />
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
