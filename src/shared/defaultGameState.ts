import {IGameState, IPlayer, PieceType, GamePhase} from './types';

export const defaultPlayers: IPlayer[] = [
  {
    id: 0,
    name: 'Player 1',
    score: 0,
    isDead: false,
    hand: [
      {
        type: PieceType.KING,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.QUEEN,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.BISHOP,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.KNIGHT,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.ROOK,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.PAWN,
        quantity: 1,
        isActive: true,
      },
    ],
  },
  {
    id: 1,
    name: 'Player 2',
    score: 0,
    isDead: false,
    hand: [
      {
        type: PieceType.KING,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.QUEEN,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.BISHOP,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.KNIGHT,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.ROOK,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.PAWN,
        quantity: 1,
        isActive: true,
      },
    ],
  },

  {
    id: 2,
    name: 'Player 3',
    score: 0,
    isDead: false,
    hand: [
      {
        type: PieceType.KING,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.QUEEN,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.BISHOP,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.KNIGHT,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.ROOK,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.PAWN,
        quantity: 1,
        isActive: true,
      },
    ],
  },

  {
    id: 3,
    name: 'Player 4',
    score: 0,
    isDead: false,
    hand: [
      {
        type: PieceType.KING,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.QUEEN,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.BISHOP,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.KNIGHT,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.ROOK,
        quantity: 0,
        isActive: false,
      },
      {
        type: PieceType.PAWN,
        quantity: 1,
        isActive: true,
      },
    ],
  },
];

export const defaultState: IGameState = {
  players: defaultPlayers,
  gameInfo: {
    beginTime: 0,
    endTime: 0,
    phase: GamePhase.IDLE,
  },
  rouletteOptions: [[], [], [], []],
  rouletteSelectedOptions: [-1, -1, -1, -1],
  board: {
    arrows: [{angle: 0}, {angle: 0}, {angle: 0}, {angle: 0}],
    balls: [[], [], [], []],
    matrix: {
      rows: 1,
      cols: 1,
      matrix: [
        [{health: 100}],
        [{health: 100}],
        [{health: 100}],
        [{health: 100}],
      ],
    },
  },
};
