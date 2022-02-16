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
import CardBox from './src/components/CardBox';
import Message from './src/components/Message';
import Roulette from './src/components/Roulette';
import Scoreboard from './src/components/Scoreboard';
import Board from './src/components/board/Board';
import {secondsSinceEpoch} from './src/shared/utils';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';

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
    board: {
      arrows: [{angle: 0}, {angle: 0}, {angle: 0}, {angle: 0}],
      balls: [
        [
          {type: 1, position: {x: 0, y: 0}},
          {type: 1, position: {x: 1, y: 1}},
        ],
        [
          {type: 1, position: {x: 0, y: 5}},
          {type: 1, position: {x: 1, y: 6}},
        ],
        [
          {type: 1, position: {x: 5, y: 0}},
          {type: 1, position: {x: 6, y: 1}},
        ],
        [
          {type: 1, position: {x: 5, y: 5}},
          {type: 1, position: {x: 6, y: 6}},
        ],
      ],
      matrix: {
        rows: 10,
        cols: 10,
        cells: [
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 10},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 0},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 10},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 0},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 10},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 0},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 10},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
          ],
          [
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 100},
            {health: 10},
          ],
        ],
      },
    },
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
    const intervalBoard = setInterval(() => {
      for (let i = 0; i < 4; i++) {
        state.board.arrows[i].angle += 0.01;
        if (state.board.arrows[i].angle > 2 * Math.PI) {
          state.board.arrows[i].angle -= 2 * Math.PI;
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < state.board.balls[i].length; j++) {
          state.board.balls[i][j].position.x += 0.01;
          if (state.board.balls[i][j].position.x > 10) {
            state.board.balls[i][j].position.x -= 10;
          }
          state.board.balls[i][j].position.y += 0.01;
          if (state.board.balls[i][j].position.y > 10) {
            state.board.balls[i][j].position.y -= 10;
          }
        }
      }
    }, 10);
    return () => {
      clearInterval(intervalMessage);
      clearInterval(intervalScoreboard);
      clearInterval(intervalBoard);
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
      <View style={{height: Dimensions.get('window').width}}>
        <Board
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width}
          board={state.board}
        />
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
      <View style={{height: 100}}>
        <CardBox />
      </View>
    </View>
  );
};

export default App;
