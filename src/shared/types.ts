import {
  PieceType as PieceType_,
  MessageType as MessageType_,
} from '@danielmontes/darkness/build/game/types';

export type Arrow = {
  angle: number;
};

export type Player = {
  id: number;
  name: string;
  score: number;
  hand: Piece[];
  isDead: boolean;
};

export type Cell = {
  health: number;
};

export type Matrix = {
  rows: number;
  cols: number;
  matrix: Cell[][];
};

export {PieceType_ as PieceType};

export type Vector2 = {
  x: number;
  y: number;
};

export type Ball = {
  type: PieceType_;
  position: Vector2;
};

export type Board = {
  matrix: Matrix;
  balls: Ball[][];
  arrows: Arrow[];
};

export type Piece = {
  type: PieceType_;
  quantity: number;
  isActive: boolean;
};

export {MessageType_ as MessageType};

export type Message = {
  content: string;
  type: MessageType_;
};
