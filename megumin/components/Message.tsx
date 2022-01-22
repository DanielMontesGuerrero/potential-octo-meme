import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ColorSchema from '../assets/ColorSchema';
import * as Animatable from 'react-native-animatable';

type MessageProps = {
  height: number;
  message: string;
  state: string;
};

const defaultProps = {
  state: 'hidden',
  message: '',
};

const Message = (props: MessageProps) => {
  const gradientColors = [
    ColorSchema.purple.normal,
    ColorSchema.purple.normal,
    ColorSchema.purple.light,
    ColorSchema.purple.light,
    ColorSchema.purple.dark,
    ColorSchema.purple.dark,
  ];
  const gradientLocations = [0.75, 0.75, 0.75, 0.85, 0.85, 1];
  const view = useRef(null);
  const animationDuration = 1000;

  useEffect(() => {
    switch (props.state) {
      case 'show':
        view?.current?.pulse(animationDuration);
        break;
      case 'enter':
        view?.current?.bounceInLeft(animationDuration);
        break;
      case 'exit':
        view?.current?.bounceOutRight(animationDuration);
        break;
      case 'hide':
      default:
        console.log('Hide');
    }
  });

  return (
    <Animatable.View ref={view} style={styles.container}>
      {props.state !== 'hide' ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={gradientLocations}
          colors={gradientColors}
          style={styles.rouletteView}>
          <Text style={styles.rouletteViewText}>{props.message}</Text>
        </LinearGradient>
      ) : (
        <></>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  rouletteView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteViewText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

Message.defaultProps = defaultProps;

export default Message;
