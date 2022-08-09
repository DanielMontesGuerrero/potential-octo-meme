import ColorSchema from '../../../assets/ColorSchema';
import {Matrix, Board, Arrow, Player} from '../../shared/types';
import interpolate from 'color-interpolate';

type BoardSetup = {
  width: number;
  height: number;
  board: Board;
  players: Player[];
};

type Color = {
  light: string;
  normal: string;
  dark: string;
};

const colorsMap = new Map([
  [
    0,
    interpolate([
      ColorSchema.green.extralight,
      ColorSchema.green.light,
      ColorSchema.green.normal,
    ]),
  ],
  [
    1,
    interpolate([
      ColorSchema.yellow.extralight,
      ColorSchema.yellow.light,
      ColorSchema.yellow.normal,
    ]),
  ],
  [
    2,
    interpolate([
      ColorSchema.blue.extralight,
      ColorSchema.blue.light,
      ColorSchema.blue.normal,
    ]),
  ],
  [
    3,
    interpolate([
      ColorSchema.red.extralight,
      ColorSchema.red.light,
      ColorSchema.red.normal,
    ]),
  ],
]);

function getCellColor(id: number, health: number) {
  let colormap = colorsMap.get(id);
  if (colormap === undefined) {
    return ColorSchema.background.normal;
  }
  return colormap(health / 100);
}

function getIdFromCoords(x: number, y: number, matrix: Matrix) {
  const rowSide = y >= matrix.rows / 2;
  const colSide = x >= matrix.cols / 2;
  return 1 * (colSide ? 1 : 0) + 2 * (rowSide ? 1 : 0);
}

function getColorFromId(id: number): Color {
  switch (id) {
    case 0:
      return ColorSchema.green;
    case 1:
      return ColorSchema.yellow;
    case 2:
      return ColorSchema.blue;
    case 3:
      return ColorSchema.red;
    default:
      return ColorSchema.background;
  }
}

function mapCoords(x: number, y: number, setup: BoardSetup) {
  const diffX = setup.width / setup.board.matrix.cols;
  const diffY = setup.height / setup.board.matrix.rows;
  return [x * diffX, y * diffY];
}

function drawMatrix(ctx, setup: BoardSetup) {
  const width = setup.width / setup.board.matrix.cols;
  const height = setup.height / setup.board.matrix.rows;
  const drawCell = (i: number, j: number) => {
    const cellColor = getCellColor(
      getIdFromCoords(j, i, setup.board.matrix),
      setup.board.matrix.get(i, j).health,
    );
    const color = getColorFromId(getIdFromCoords(j, i, setup.board.matrix));
    const [x, y] = mapCoords(j, i, setup);
    ctx.fillStyle = cellColor;
    ctx.strokeStyle = color.dark;
    ctx.strokeRect(x, y, width, height);
    if (setup.board.matrix.matrix[i][j].health > 0) {
      ctx.fillRect(x, y, width, height);
    }
  };
  for (let i = 0; i < setup.board.matrix.rows; i++) {
    for (let j = 0; j < setup.board.matrix.cols; j++) {
      drawCell(i, j);
    }
  }
}

function drawArrows(ctx, setup: BoardSetup) {
  const drawArrow = (playerId: number, arrow: Arrow) => {
    if (setup.players[playerId].isDead) {
      return;
    }
    let x0, y0, x1, y1;
    const arrowLength = 0.7;
    const headlen = 5;
    const radio = setup.width / (2 * setup.board.matrix.cols);
    switch (playerId) {
      case 0:
        x0 = setup.board.matrix.cols / 4;
        y0 = setup.board.matrix.rows / 4;
        break;
      case 1:
        x0 = (3 * setup.board.matrix.cols) / 4;
        y0 = setup.board.matrix.rows / 4;
        break;
      case 2:
        x0 = setup.board.matrix.cols / 4;
        y0 = (3 * setup.board.matrix.rows) / 4;
        break;
      case 3:
        x0 = (3 * setup.board.matrix.cols) / 4;
        y0 = (3 * setup.board.matrix.rows) / 4;
        break;
      default:
        x0 = 0;
        y0 = 0;
        break;
    }
    x1 = x0 + arrowLength * Math.cos(arrow.angle);
    y1 = y0 + arrowLength * Math.sin(arrow.angle);
    [x0, y0] = mapCoords(x0, y0, setup);
    [x1, y1] = mapCoords(x1, y1, setup);
    const angle = Math.atan2(y1 - y0, x1 - x0);

    ctx.strokeStyle = ColorSchema.light.light;
    ctx.fillStyle = ColorSchema.light.light;
    ctx.beginPath();
    ctx.arc(x0, y0, radio, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(
      x1 - headlen * Math.cos(angle - Math.PI / 6),
      y1 - headlen * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headlen * Math.cos(angle + Math.PI / 6),
      y1 - headlen * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();
  };
  for (let i = 0; i < 4; i++) {
    drawArrow(i, setup.board.arrows[i]);
  }
}

function drawBalls(ctx, setup: BoardSetup) {
  const drawBall = (playerId: number, x: number, y: number) => {
    const radio = 3;
    const color = getColorFromId(playerId);
    [x, y] = mapCoords(x, y, setup);

    ctx.fillStyle = color.dark;
    ctx.strokeStyle = color.dark;
    ctx.beginPath();
    ctx.arc(x, y, radio, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < setup.board.balls[i].length; j++) {
      drawBall(
        i,
        setup.board.balls[i][j].position.x,
        setup.board.balls[i][j].position.y,
      );
    }
  }
}

export default function drawBoard(ctx, setup: BoardSetup) {
  ctx.clearRect(0, 0, setup.width, setup.height);
  drawMatrix(ctx, setup);
  drawArrows(ctx, setup);
  drawBalls(ctx, setup);
}
