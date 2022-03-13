import Game from '@danielmontes/darkness';
import {EnqueuedEvent} from '@danielmontes/darkness/build/game/Event';

export default class GameHandler {
  game: Game;

  constructor() {
    this.game = new Game(['Player 1']);
  }

  start() {
    this.game.start();
  }

  update() {
    this.game.update();
  }

  stop() {
    this.game.stop();
  }

  getNextMessage(playerId: number) {
    const message = this.game.players[playerId].messageManager.messages.shift();
    if (message !== undefined) {
      return message;
    }
    return undefined;
  }

  getRouletteOptions(playerId: number) {
    return this.game.players[playerId].roulette.options.map(
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
}
