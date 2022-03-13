import CardBox from '../components/CardBox';
import Message from '../components/Message';
import Roulette from '../components/Roulette';
import Scoreboard from '../components/Scoreboard';
import Board from '../components/board/Board';
import GameHandler from '../game/GameHandler';
import {PieceType} from '../shared/types';
import {EventCode, GamePhase} from '@danielmontes/darkness/build/game/types';
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
  const messageDelay = 500;
  const playerId = 0;
  const [gameHandler] = useState(new GameHandler());
  const [message, setMessage] = useState('Starting game');
  const [dummy, setDummy] = useState(true);
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const rouletteOptions = gameHandler.getRouletteOptions(playerId);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameHandler.game.phase === GamePhase.IDLE) {
        gameHandler.start();
      } else {
        gameHandler.update();
      }
    }, 10);
    const messagesInterval = setInterval(() => {
      const nextMessage = gameHandler.getNextMessage(playerId);
      if (nextMessage !== undefined) {
        setMessage(nextMessage);
      }
    }, messageDelay);
    return () => {
      clearInterval(interval);
      clearInterval(messagesInterval);
    };
  });

  const changeActive = (type: PieceType) => {
    gameHandler.addEvent({
      code: EventCode.CHANGED_ACTIVE_PIECE,
      playerId,
      newActivePiece: type,
    });
    setDummy(!dummy);
  };
  const releasePiece = (type: PieceType) => {
    gameHandler.addEvent({
      code: EventCode.RELEASED_PIECE,
      playerId,
      pieceType: type,
    });
    setDummy(!dummy);
  };
  const manageRoulette = () => {
    gameHandler.addEvent({
      code: EventCode.TRIGGERED_ROULETTE,
      playerId,
      triggeredAt: Date.now(),
    });
    setRouletteActive(true);
    setTimeout(() => {
      setRouletteActive(false);
      setSelectedRouletteOption(-1);
    }, 3000);
  };

  return (
    <>
      <View style={styles.messageContainer}>
        <Message message={message} />
      </View>
      <View style={styles.scoreContainer}>
        <Scoreboard
          players={gameHandler.getPlayers()}
          beginTime={gameHandler.getBeginTime() / 1000}
        />
      </View>
      <View style={styles.boardContainer}>
        {TEST_MODE === 'UI' ? (
          <View style={styles.boardTestBox} />
        ) : (
          <Board
            width={boardSize}
            height={boardSize}
            board={gameHandler.getBoard()}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.cardsContainer}>
          <CardBox
            height={cardsHeight}
            hand={gameHandler.getPlayers()[playerId].hand}
            onActiveChanged={type => changeActive(type)}
            onPieceReleased={type => releasePiece(type)}
          />
        </View>
        <View style={styles.rouletteContainer}>
          <Roulette
            width={rouletteHeight}
            height={rouletteHeight}
            options={rouletteOptions}
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
    width: boardSize,
    height: boardSize,
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
