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
  let canvas = null;
  let ctx = null;

  function draw() {
    if (ctx === null) {
      console.log('draw returned');
      return;
    }
    requestAnimationFrame(() => draw());
    drawBoard(ctx, props);
  }

  const initCanvas = _canvas => {
    if (canvas) {
      return;
    }
    canvas = _canvas;
    ctx = canvas.getContext('2d');
    draw();
    console.log('init');
  };

  return (
    <View style={styles.container}>
      <GCanvasView
        onCanvasCreate={initCanvas}
        style={[styles.gcanvas, {width: props.width, height: props.height}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gcanvas: {
    flex: 1,
  },
});

export default Board;
