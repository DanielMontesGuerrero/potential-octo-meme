import DefaultStyles from '../../shared/styles';
import {Board as BoardType} from '../../shared/types';
import drawBoard from './animator';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type BoardProps = {
  width: number;
  height: number;
  board: BoardType;
};

const Board = (props: BoardProps) => {
  let canvas: any = null;
  let ctx: any = null;

  function draw() {
    if (ctx === null) {
      return;
    }
    requestAnimationFrame(() => draw());
    drawBoard(ctx, props);
  }

  const initCanvas = (_canvas: any) => {
    if (canvas) {
      return;
    }
    canvas = _canvas;
    ctx = canvas.getContext('2d');
    draw();
  };

  return (
    <View style={DefaultStyles.centeredContainer}>
      <GCanvasView
        onCanvasCreate={initCanvas}
        style={[styles.gcanvas, {width: props.width, height: props.height}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gcanvas: {
    flex: 1,
  },
});

export default Board;
