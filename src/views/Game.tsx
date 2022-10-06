import CardBox from '../components/CardBox';
import Message from '../components/Message';
import Roulette from '../components/Roulette';
import Scoreboard from '../components/Scoreboard';
import Board from '../components/board/Board';
import GameHandler from '../game/GameHandler';
import {ConnectionEvents, ErrorCodes} from '../shared/connectionTypes';
import DefaultStyles from '../shared/styles';
import {
  PieceType,
  MessageType,
  EventCode,
  GamePhase,
  IGameState,
} from '../shared/types';
import {TEST_MODE} from '@env';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {io, Socket} from 'socket.io-client';

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

const logSocketError = (
  result: boolean,
  errorCode: ErrorCodes,
  errorDescription: string,
) => {
  if (!result) {
    console.log('Error:', errorCode, errorDescription);
  }
};

const Game = ({route, navigation}) => {
  const {token, host, mode, playerName} = route.params;
  const messageDelay = 250;
  const gameUpdateRate = 10;
  const rouletteSelectionTime = 500;
  const rouletteSelectedShowTime = 100;
  const refreshRate = 1000;

  const socket = useRef<Socket>();
  const isConnected = useRef<boolean>(false);
  const playerId = useRef<number>(0);

  const [gameHandler] = useState(new GameHandler(playerName, mode, socket));
  const [message, setMessage] = useState({
    content: 'Starting game',
    type: MessageType.INFO,
  });
  const [dummy, setDummy] = useState(true);
  const [rouletteActive, setRouletteActive] = useState(false);
  const [selectedRouletteOption, setSelectedRouletteOption] = useState(-1);
  const [gameReady, setGameReady] = useState(false);
  const [rouletteOptions, setRouletteOptions] = useState(
    gameHandler.getRouletteOptions(),
  );
  const [playersOrderedByScore, setPlayersOrdered] = useState(
    gameHandler.getPlayersOrderedByScore(),
  );
  const [waitingMessage, setWaitingMessage] = useState('Connecting...');

  const updateGame = useCallback(
    (state: IGameState) => {
      setGameReady(true);
      gameHandler.setGameState(state);
    },
    [gameHandler],
  );

  const updateGameStateRequestLoop = useCallback(() => {
    if (isConnected.current) {
      socket.current?.emit(ConnectionEvents.GET_STATE_REQUEST, logSocketError);
    }
    requestAnimationFrame(() => updateGameStateRequestLoop());
  }, []);

  const setPlayerId = useCallback(
    (id: number) => {
      gameHandler.setPlayerId(id);
      playerId.current = id;
    },
    [gameHandler],
  );

  const changeWaitMessage = useCallback((count: number) => {
    setWaitingMessage(`Starting game in ${count}`);
  }, []);

  useEffect(() => {
    if (mode !== 'ONLINE') {
      setGameReady(true);
      return;
    }
    socket.current = io(host);
    socket.current?.on('connect', () => {
      socket.current?.emit(
        ConnectionEvents.PLAYER_JOINED,
        {
          name: playerName,
          token,
        },
        logSocketError,
      );
    });
    socket.current?.on(ConnectionEvents.CONNECTION_ACCEPTED, id => {
      setPlayerId(id);
      isConnected.current = true;
    });

    socket.current?.on(ConnectionEvents.COUNTDOWN, count => {
      changeWaitMessage(count);
    });

    socket.current?.on(ConnectionEvents.STATE_UPDATE, state => {
      updateGame(state);
    });

    socket.current?.on(ConnectionEvents.GAME_FINISHED, () => {
      console.log('Game finished');
    });

    socket.current?.on('reconnect', () => {
      console.log('reconnect');
    });

    socket.current?.on('close', () => {
      console.log('disconnected');
    });

    updateGameStateRequestLoop();
    return () => {
      socket.current?.disconnect();
    };
  }, [
    host,
    updateGame,
    updateGameStateRequestLoop,
    setPlayerId,
    changeWaitMessage,
    mode,
    playerName,
    token,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameHandler.getGamePhase() === GamePhase.IDLE) {
        gameHandler.start();
      } else {
        gameHandler.update();
      }
    }, gameUpdateRate);
    const messagesInterval = setInterval(() => {
      const nextMessage = gameHandler.getNextMessage();
      if (
        nextMessage !== undefined &&
        nextMessage.content !== message.content
      ) {
        setMessage(nextMessage);
      }
    }, messageDelay);
    const refreshStateInterval = setInterval(() => {
      setRouletteOptions(gameHandler.getRouletteOptions());
      setPlayersOrdered(gameHandler.getPlayersOrderedByScore());
      if (gameHandler.getGamePhase() === GamePhase.FINISHED) {
        navigation.navigate('GameResults', {
          players: gameHandler.getPlayersOrderedByScore(),
        });
      }
    }, refreshRate);
    return () => {
      clearInterval(interval);
      clearInterval(messagesInterval);
      clearInterval(refreshStateInterval);
    };
  });

  const changeActive = (type: PieceType) => {
    gameHandler.addEvent({
      code: EventCode.CHANGED_ACTIVE_PIECE,
      playerId: playerId.current,
      newActivePiece: type,
    });
    setDummy(!dummy);
  };
  const releasePiece = (type: PieceType) => {
    gameHandler.addEvent({
      code: EventCode.RELEASED_PIECE,
      playerId: playerId.current,
      pieceType: type,
    });
    setDummy(!dummy);
  };
  const manageRoulette = () => {
    if (
      gameHandler.getGamePhase() !== GamePhase.RUNNING ||
      gameHandler.isPlayerDead()
    ) {
      return;
    }
    gameHandler.addEvent({
      code: EventCode.TRIGGERED_ROULETTE,
      playerId: playerId.current,
      triggeredAt: Date.now(),
    });
    setRouletteActive(true);
    setTimeout(() => {
      setSelectedRouletteOption(gameHandler.getRouletteSelectedOption());
      gameHandler.addEvent({
        code: EventCode.ACKNOWLEDGED_ROULETTE,
        playerId: playerId.current,
      });
      setTimeout(() => {
        setRouletteActive(false);
        setSelectedRouletteOption(-1);
      }, rouletteSelectedShowTime);
    }, rouletteSelectionTime);
  };

  return (
    <>
      {!gameReady ? (
        <View style={DefaultStyles.centeredContainer}>
          <Text>{waitingMessage}</Text>
        </View>
      ) : (
        <>
          <View style={styles.messageContainer}>
            <Message message={message} />
          </View>
          <View style={styles.scoreContainer}>
            <Scoreboard
              players={playersOrderedByScore}
              beginTime={gameHandler.getBeginTime()}
              endTime={gameHandler.getEndTime()}
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
                players={gameHandler.getPlayers()}
              />
            )}
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.cardsContainer}>
              <CardBox
                height={cardsHeight}
                hand={gameHandler.getPlayers()[playerId.current].hand}
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
      )}
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
