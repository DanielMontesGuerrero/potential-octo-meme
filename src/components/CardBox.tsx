import ColorSchema from '../../assets/ColorSchema';
import BishopIcon from '../../assets/bishop.svg';
import KingIcon from '../../assets/king.svg';
import KnigthIcon from '../../assets/knight.svg';
import PawnIcon from '../../assets/pawn.svg';
import QueenIcon from '../../assets/queen.svg';
import RookIcon from '../../assets/rook.svg';
import DefaultStyles from '../shared/styles';
import {IPiece, PieceType} from '../shared/types';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

type CardProps = {
  piece: {
    type: PieceType;
    quantity: number;
    isActive: boolean;
    length: number;
    containerHeight: number;
    onPress: (event: GestureResponderEvent) => void;
    onRelease: () => void;
  };
};

type GestureContext = {
  translateX: number;
  translateY: number;
};

function getIcon(type: PieceType, length: number) {
  switch (type) {
    case PieceType.KING:
      return <KingIcon width={length} height={length} />;
    case PieceType.QUEEN:
      return <QueenIcon width={length} height={length} />;
    case PieceType.BISHOP:
      return <BishopIcon width={length} height={length} />;
    case PieceType.KNIGHT:
      return <KnigthIcon width={length} height={length} />;
    case PieceType.ROOK:
      return <RookIcon width={length} height={length} />;
    case PieceType.PAWN:
      return <PawnIcon width={length} height={length} />;
  }
}

const Card = (props: CardProps) => {
  const backgroundColor = props.piece.isActive
    ? {backgroundColor: ColorSchema.purple.light}
    : {backgroundColor: ColorSchema.purple.dark};
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onReleaseWraper = () => props.piece.onRelease();
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      if (Math.abs(translateY.value) < props.piece.containerHeight) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        runOnJS(onReleaseWraper)();
        translateX.value = 0;
        translateY.value = 0;
      }
    },
  });
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.flex}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[translateStyle, styles.flex]}>
          <TouchableOpacity
            onPress={event => props.piece.onPress(event)}
            style={[
              DefaultStyles.centeredContainer,
              styles.cardContainer,
              backgroundColor,
            ]}>
            {getIcon(props.piece.type, props.piece.length)}
            <Text style={DefaultStyles.defaultText}>
              {props.piece.quantity}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

type CardBoxProps = {
  height: number;
  hand: IPiece[];
  onActiveChanged: (type: PieceType) => void;
  onPieceReleased: (type: PieceType) => void;
  iconSize: number;
};

const DefaultCardBoxProps = {
  iconSize: 40,
};

const CardBox = (props: CardBoxProps) => {
  const sizeStyle = {
    height: props.height,
  };
  const [, setDummy] = useState(true);
  const getPropsFromPiece = useCallback(
    (piece: IPiece) => {
      return {
        ...piece,
        length: props.iconSize,
        containerHeight: props.height,
        onPress: (_event: GestureResponderEvent) =>
          props.onActiveChanged(piece.type),
        onRelease: () => props.onPieceReleased(piece.type),
      };
    },
    [props],
  );
  let cardProps = props.hand.map(getPropsFromPiece);
  const cardPropsRef = useRef(cardProps);

  useEffect(() => {
    cardPropsRef.current = props.hand.map(getPropsFromPiece);
    setDummy(d => !d);
  }, [props, getPropsFromPiece]);

  return (
    <View style={sizeStyle}>
      <View style={[DefaultStyles.centeredContainer, styles.container]}>
        {props.hand.map((piece, index) => {
          if (piece.quantity > 0) {
            return <Card piece={cardPropsRef.current[index]} key={index} />;
          } else {
            return <React.Fragment key={index} />;
          }
        })}
      </View>
    </View>
  );
};

CardBox.defaultProps = DefaultCardBoxProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cardContainer: {
    padding: 4,
    borderColor: ColorSchema.purple.normal,
    borderWidth: 1,
    borderRadius: 4,
  },
  flex: {
    flex: 1,
  },
});

export default CardBox;
