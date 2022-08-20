import Game from '@danielmontes/darkness';
import {EnqueuedEvent} from '@danielmontes/darkness/build/game/Event';
import BehaviourTree from '@danielmontes/darkness/build/game/bot/BehaviorTree';
import createBehaviorTree from '@danielmontes/darkness/build/game/bot/BehaviourTreeFactoty';
import {GamePhase} from '@danielmontes/darkness/build/game/types';

export default class GameHandler {
  game: Game;
  behaviorTrees: BehaviourTree[];

  constructor() {
    this.game = new Game(['Player 1']);
    this.behaviorTrees = [
      createBehaviorTree('atack'),
      createBehaviorTree('random'),
      createBehaviorTree('defense'),
    ];
    for (let id = 1; id < 4; id++) {
      this.behaviorTrees[id - 1].bind(this.game, id);
    }
  }

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

  getNextMessage(playerId: number) {
    const message = this.game.getNextMessage(playerId);
    return message;
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

  getPlayersOrderedByScore() {
    return this.game.getPlayersOrderedByScore();
  }

  getRouletteSelectedOption(playerId: number) {
    return this.game.players[playerId].roulette.selectedOption;
  }

  isPlayerDead(playerId: number) {
    return this.game.players[playerId].isDead;
  }
}
