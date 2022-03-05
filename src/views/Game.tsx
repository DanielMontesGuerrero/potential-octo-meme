import CardBox from '../components/CardBox';
import Message from '../components/Message';
import Roulette from '../components/Roulette';
import Scoreboard from '../components/Scoreboard';
import Board from '../components/board/Board';
import {defaultPlayers, defaultState} from '../shared/defaultGameState';
import {PieceType} from '../shared/types';
import {TEST_MODE} from '@env';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const boardSize =
  Dimensions.get('window').width >= Dimensions.get('window').height
    ? Dimensions.get('window').width / 2
    : Dimensions.get('window').width;
const flexContainersSize = {
  messageContainer: 1.1,
  scoreContainer: 1.5,
  bottomContainer: 1,
};
const totalFlexSize =
  flexContainersSize.messageContainer +
  flexContainersSize.scoreContainer +
  flexContainersSize.bottomContainer;
const cardsContainerHeight =
  flexContainersSize.bottomContainer *
  ((Dimensions.get('window').height - boardSize) / totalFlexSize);
const rouletteHeight = 3 * (cardsContainerHeight / 6);
const cardsHeight = 3 * (cardsContainerHeight / 4);

const Game = () => {
  const [players, setPlayers] = useState(defaultPlayers);
  const [state] = useState(defaultState);
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const [messageIndex, setMessageIndex] = useState(0);
  const changeActive = (type: PieceType) => {
    let prevIndex = 0;
    let newIndex = 0;
    for (let i = 0; i < players[0].hand.length; i++) {
      if (players[0].hand[i].isActive) {
        prevIndex = i;
        break;
      }
    }
    for (let i = 0; i < players[0].hand.length; i++) {
      if (players[0].hand[i].type === type) {
        newIndex = i;
        break;
      }
    }
    setPlayers(p => {
      let newPlayers = JSON.parse(JSON.stringify(p));
      newPlayers[0].hand[prevIndex].isActive = false;
      newPlayers[0].hand[newIndex].isActive = true;
      return newPlayers;
    });
  };
  const releasePiece = (type: PieceType) => {
    const playersCopy = JSON.parse(JSON.stringify(players));
    for (let i = 0; i < players[0].hand.length; i++) {
      if (playersCopy[0].hand[i].type === type) {
        playersCopy[0].hand[i].quantity = 0;
        break;
      }
    }
    setPlayers(playersCopy);
  };
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
      players[index].score += value;
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
    <>
      <View style={styles.messageContainer}>
        <Message message={state.messages[messageIndex]} />
      </View>
      <View style={styles.scoreContainer}>
        <Scoreboard players={players} beginTime={state.beginTime} />
      </View>
      <View style={styles.boardContainer}>
        {TEST_MODE === 'UI' ? (
          <View style={styles.boardTestBox} />
        ) : (
          <Board width={boardSize} height={boardSize} board={state.board} />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.cardsContainer}>
          <CardBox
            height={cardsHeight}
            hand={players[0].hand}
            onActiveChanged={type => changeActive(type)}
            onPieceReleased={type => releasePiece(type)}
          />
        </View>
        <View style={styles.rouletteContainer}>
          <Roulette
            width={rouletteHeight}
            height={rouletteHeight}
            options={state.options}
            active={rouletteActive}
            onPress={manageRoulette}
            selectedOption={selectedRouletteOption}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: flexContainersSize.messageContainer,
  },
  scoreContainer: {
    flex: flexContainersSize.scoreContainer,
  },
  boardContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bottomContainer: {
    flex: flexContainersSize.bottomContainer,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rouletteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flex: 6,
  },
  boardTestBox: {
    backgroundColor: 'red',
    width: boardSize,
    height: boardSize,
  },
});

export default Game;
