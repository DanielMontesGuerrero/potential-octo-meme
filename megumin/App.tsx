/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';

import Roulette from './components/Roulette';

const App = () => {
  const state = {
    options: ['x2', 'pieza', '+100', '-100', 'efecto'],
  };
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const [canvas, setCanvas] = useState(null);
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
  const initCanvas = (_canvas) => {
    if (canvas) {
      return;
    }
    setCanvas(_canvas);
    draw(_canvas.getContext('2d'));
  };
  const draw = (ctx) => {
    console.log('Drawing');
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Roulette
        width={50}
        height={50}
        options={state.options}
        active={rouletteActive}
        onPress={manageRoulette}
        selectedOption={selectedRouletteOption}
      />
      <GCanvasView
        onCanvasCreate={initCanvas}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
