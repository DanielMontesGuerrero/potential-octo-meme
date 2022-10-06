import {ErrorCodes, ConnectionEvents} from '../shared/connectionTypes';
import {defaultState} from '../shared/defaultGameState';
import {IGameState} from '../shared/types';
import Game from '@danielmontes/darkness';
import {EnqueuedEvent} from '@danielmontes/darkness/build/game/Event';
import BehaviourTree from '@danielmontes/darkness/build/game/bot/BehaviorTree';
import createBehaviorTree from '@danielmontes/darkness/build/game/bot/BehaviourTreeFactoty';
import {GamePhase} from '@danielmontes/darkness/build/game/types';

class LocalGameExecutor {
  game: Game;
  behaviorTrees: BehaviourTree[];
  playerId: number;

  constructor(name: string) {
    this.playerId = 0;
    this.game = new Game([name]);
    this.behaviorTrees = [
      createBehaviorTree('atack'),
      createBehaviorTree('random'),
      createBehaviorTree('defense'),
    ];
    for (let id = 1; id < 4; id++) {
      this.behaviorTrees[id - 1].bind(this.game, id);
    }
  }

  setGameState() {}

  start() {
    this.game.start();
  }

  update() {
    this.botActions();
    this.game.update();
  }

  stop() {
    this.game.stop();
  }

  botActions() {
    if (this.game.phase === GamePhase.RUNNING) {
      this.behaviorTrees.forEach(tree => {
        tree.nextAction();
      });
    }
  }

  getNextMessage() {
    const message = this.game.getNextMessage(this.playerId);
    return message;
  }

  getRouletteOptions() {
    return this.game.players[this.playerId].roulette.options.map(
      option => option.name,
    );
  }

  addEvent(event: EnqueuedEvent) {
    this.game.addEvent(event);
  }

  getBoard() {
    return this.game.board;
  }

  getBeginTime() {
    return this.game.beginTime;
  }

  getEndTime() {
    return this.game.endTime;
  }

  getPlayers() {
    return this.game.players;
  }

  getPlayersOrderedByScore() {
    return this.game.getPlayersOrderedByScore();
  }

  getRouletteSelectedOption() {
    return this.game.players[this.playerId].roulette.selectedOption;
  }

  isPlayerDead() {
    return this.game.players[this.playerId].isDead;
  }

  getGamePhase() {
    return this.game.phase;
  }
}

class OnlineGameExecutor {
  gameState: IGameState;
  socket: any;
  playerId?: number;

  constructor(name: string, socket: any) {
    this.socket = socket;
    this.gameState = defaultState;
  }

  setGameState(state: IGameState) {
    for (let i = 0; i < this.gameState.players.length; i++) {
      this.gameState.players[i].name = state.players[i].name;
      this.gameState.players[i].isDead = state.players[i].isDead;
      this.gameState.players[i].id = state.players[i].id;
      this.gameState.players[i].hand = state.players[i].hand;
      this.gameState.players[i].score = state.players[i].score;
      this.gameState.players[i].message = state.players[i].message;
    }
    this.gameState.rouletteOptions = state.rouletteOptions;
    this.gameState.gameInfo.endTime = state.gameInfo.endTime;
    this.gameState.gameInfo.phase = state.gameInfo.phase;
    this.gameState.gameInfo.beginTime = state.gameInfo.beginTime;
    this.gameState.rouletteSelectedOptions = state.rouletteSelectedOptions;
    this.gameState.board.balls = state.board.balls;
    this.gameState.board.arrows = state.board.arrows;
    this.gameState.board.matrix = state.board.matrix;
  }
  start() {}
  update() {}
  stop() {}

  getNextMessage() {
    if (this.playerId !== undefined && this.gameState !== undefined) {
      return this.gameState.players[this.playerId].message;
    }
    return defaultState.players[0].message;
  }

  getRouletteOptions() {
    if (this.playerId !== undefined && this.gameState !== undefined) {
      return this.gameState.rouletteOptions[this.playerId];
    }
    return defaultState.rouletteOptions[0];
  }

  addEvent(event: EnqueuedEvent) {
    this.socket.current?.emit(
      ConnectionEvents.GAME_EVENT,
      event,
      (result: boolean, errorCode: ErrorCodes, message: string) => {
        if (!result) {
          console.log(message);
        }
      },
    );
  }

  getBoard() {
    if (this.gameState === undefined) {
      return defaultState.board;
    }
    return this.gameState?.board;
  }

  getBeginTime() {
    if (this.gameState === undefined) {
      return defaultState.gameInfo.beginTime;
    }
    return this.gameState?.gameInfo.beginTime;
  }

  getEndTime() {
    if (this.gameState === undefined) {
      return defaultState.gameInfo.endTime;
    }
    return this.gameState?.gameInfo.endTime;
  }

  getPlayers() {
    if (this.gameState === undefined) {
      return defaultState.players;
    }
    return this.gameState?.players;
  }

  getPlayersOrderedByScore() {
    if (this.gameState === undefined) {
      return defaultState.players;
    }
    return this.gameState?.players;
  }

  getRouletteSelectedOption() {
    if (this.playerId !== undefined && this.gameState !== undefined) {
      return this.gameState?.rouletteSelectedOptions[this.playerId];
    }
    return defaultState.rouletteSelectedOptions[0];
  }

  isPlayerDead() {
    if (this.playerId !== undefined && this.gameState !== undefined) {
      return this.gameState?.players[this.playerId].isDead;
    }
    return defaultState.players[0].isDead;
  }

  getGamePhase() {
    if (this.gameState === undefined) {
      return defaultState.gameInfo.phase;
    }
    return this.gameState?.gameInfo.phase;
  }
}

export default class GameHandler {
  executor: LocalGameExecutor | OnlineGameExecutor;

  constructor(name: string, mode: string, socket: any) {
    if (mode === 'ONLINE') {
      this.executor = new OnlineGameExecutor(name, socket);
    } else {
      this.executor = new LocalGameExecutor(name);
    }
  }

  setPlayerId(id: number) {
    this.executor.playerId = id;
  }

  setGameState(state: IGameState) {
    this.executor.setGameState(state);
  }

  start() {
    this.executor.start();
  }

  update() {
    this.executor.update();
  }

  stop() {
    this.executor.stop();
  }

  getNextMessage() {
    return this.executor.getNextMessage();
  }

  getRouletteOptions() {
    return this.executor.getRouletteOptions();
  }

  addEvent(event: EnqueuedEvent) {
    this.executor.addEvent(event);
  }

  getBoard() {
    return this.executor.getBoard();
  }

  getBeginTime() {
    return this.executor.getBeginTime();
  }

  getEndTime() {
    return this.executor.getEndTime();
  }

  getPlayers() {
    return this.executor.getPlayers();
  }

  getPlayersOrderedByScore() {
    return this.executor.getPlayersOrderedByScore();
  }

  getRouletteSelectedOption() {
    return this.executor.getRouletteSelectedOption();
  }

  isPlayerDead() {
    return this.executor.isPlayerDead();
  }

  getGamePhase() {
    return this.executor.getGamePhase();
  }
}
