export type Arrow = {
  angle: number;
};

export type Player = {
  id: number;
  name: string;
  color: string;
  score: number;
};

export type Cell = {
  health: number;
};

export type Matrix = {
  rows: number;
  cols: number;
  cells: Cell[][];
};

export enum PieceType {
  KING,
  QUEEN,
  BISHOP,
  KNIGTH,
  ROOK,
  PAWN,
}

export type Vector2 = {
  x: number;
  y: number;
};

export type Ball = {
  type: PieceType;
  position: Vector2;
};

export type Board = {
  matrix: Matrix;
  balls: Ball[][];
  arrows: Arrow[];
};

export type Piece = {
  type: PieceType;
  quantity: number;
  isActive: boolean;
};
