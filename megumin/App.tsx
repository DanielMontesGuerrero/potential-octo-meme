/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import ColorSchema from './assets/ColorSchema';
import Message from './src/components/Message';
import Roulette from './src/components/Roulette';
import Scoreboard from './src/components/Scoreboard';
import {secondsSinceEpoch} from './src/shared/utils';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const App = () => {
  const defaultState = {
    options: ['x2', 'pieza', '+100', '-100', 'efecto'],
    messages: ['Hola xd', 'Que pro B)', 'Que noob'],
    players: [
      {
        id: 1,
        name: 'Player 1',
        color: ColorSchema.yellow.normal,
        score: 0,
      },
      {
        id: 2,
        name: 'Player 2',
        color: ColorSchema.red.normal,
        score: 0,
      },
      {
        id: 3,
        name: 'Player 3',
        color: ColorSchema.blue.normal,
        score: 0,
      },
      {
        id: 4,
        name: 'Player 4',
        color: ColorSchema.green.normal,
        score: 0,
      },
    ],
    beginTime: secondsSinceEpoch(),
  };
  const [state, setState] = useState(defaultState);
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
    const intervalMessage = setInterval(() => {
      setMessageIndex((messageIndex + 1) % state.messages.length);
    }, 9000);
    const intervalScoreboard = setInterval(() => {
      const index = Math.round(Math.random() * 3);
      const value = Math.round(Math.random() * 10);
      state.players[index].score += value;
      setState(state);
    }, 800);
    return () => {
      clearInterval(intervalMessage);
      clearInterval(intervalScoreboard);
    };
  });

  return (
    <View>
      <View style={{height: 100}}>
        <Message message={state.messages[messageIndex]} />
      </View>
      <View style={{height: 150}}>
        <Scoreboard players={state.players} beginTime={state.beginTime} />
      </View>
      <View style={{height: 100}}>
        <Roulette
          width={50}
          height={50}
          options={state.options}
          active={rouletteActive}
          onPress={manageRoulette}
          selectedOption={selectedRouletteOption}
        />
      </View>
    </View>
  );
};

export default App;
