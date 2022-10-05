import ColorSchema from '../../assets/ColorSchema';
import DefaultStyles from '../shared/styles';
import {IMessage, MessageType} from '../shared/types';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

type MessageProps = {
  message: IMessage;
};

const defaultProps = {
  message: {
    content: '',
    type: MessageType.INFO,
  },
};

const getGradientColorFromType = (type: MessageType) => {
  switch (type) {
    case MessageType.WIN:
      return ['#C4A90C', '#C4A90C', '#F4D63E', '#F4D63E', '#AE920A', '#AE920A'];
    case MessageType.LOSE:
      return ['#8A0AAD', '#8A0AAD', '#C218F2', '#C218F2', '#6B0887', '#6B0887'];
    case MessageType.DEAD_PLAYER:
      return ['#2E2E3E', '#2E2E3E', '#575775', '#575775', '#23232f', '#23232f'];
    case MessageType.WARNING:
      return ['#9A480A', '#9A480A', '#E66C0F', '#E66C0F', '#733607', '#733607'];
    case MessageType.INFO:
    default:
      return [
        ColorSchema.purple.normal,
        ColorSchema.purple.normal,
        ColorSchema.purple.light,
        ColorSchema.purple.light,
        ColorSchema.purple.dark,
        ColorSchema.purple.dark,
      ];
  }
};

const Message = (props: MessageProps) => {
  const gradientLocations = [0.75, 0.75, 0.75, 0.85, 0.85, 1];
  const view = useRef<any>(null);
  const animationDuration = 1000;
  const animationGap = 1000;
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [gradientColors, setGradientColors] = useState(
    getGradientColorFromType(MessageType.INFO),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      view?.current?.pulse(animationDuration);
    }, animationGap);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    view?.current?.bounceOutRight(animationDuration).then(() => {
      setDisplayedMessage(props.message.content);
      setGradientColors(getGradientColorFromType(props.message.type));
      view?.current?.bounceInLeft(animationDuration);
    });
  }, [props.message]);

  return (
    <Animatable.View
      ref={view}
      style={[DefaultStyles.centeredContainer, styles.container]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={gradientLocations}
        colors={gradientColors}
        style={styles.messageView}>
        <Text
          adjustsFontSizeToFit
          style={[DefaultStyles.defaultText, styles.messageViewText]}>
          {displayedMessage}
        </Text>
      </LinearGradient>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  messageView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageViewText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

Message.defaultProps = defaultProps;

export default Message;
