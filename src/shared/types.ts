import {
  PieceType as PieceType_,
  MessageType as MessageType_,
  GamePhase as GamePhase_,
  EventCode as EventCode_,
} from '@danielmontes/darkness/build/game/types';

export type IArrow = {
  angle: number;
};

export type IPlayer = {
  id: number;
  name: string;
  score: number;
  hand: IPiece[];
  isDead: boolean;
  message?: IMessage;
};

export type ICell = {
  health: number;
};

export type IMatrix = {
  rows: number;
  cols: number;
  matrix: ICell[][];
};

export {PieceType_ as PieceType};

export type IVector2 = {
  x: number;
  y: number;
};

export type IBall = {
  type: PieceType_;
  position: IVector2;
};

export type IBoard = {
  matrix: IMatrix;
  balls: IBall[][];
  arrows: IArrow[];
};

export type IPiece = {
  type: PieceType_;
  quantity: number;
  isActive: boolean;
};

export {MessageType_ as MessageType};

export type IMessage = {
  content: string;
  type: MessageType_;
};

export interface IGameInfo {
  beginTime: number;
  endTime: number;
  phase: GamePhase_;
}

export interface IGameState {
  players: IPlayer[];
  gameInfo: IGameInfo;
  board: IBoard;
  rouletteOptions: string[][];
  rouletteSelectedOptions: number[];
}

export {GamePhase_ as GamePhase};

export {EventCode_ as EventCode};
