import ColorSchema from '../../assets/ColorSchema';
import BishopIcon from '../../assets/bishop.svg';
import KingIcon from '../../assets/king.svg';
import KnigthIcon from '../../assets/knight.svg';
import PawnIcon from '../../assets/pawn.svg';
import QueenIcon from '../../assets/queen.svg';
import RookIcon from '../../assets/rook.svg';
import {Piece, PieceType} from '../shared/types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CardProps = {
  length: number;
  piece: Piece;
};

function getIcon(type: PieceType, length: number) {
  switch (type) {
    case PieceType.KING:
      return <KingIcon width={length} height={length} />;
    case PieceType.QUEEN:
      return <QueenIcon width={length} height={length} />;
    case PieceType.BISHOP:
      return <BishopIcon width={length} height={length} />;
    case PieceType.KNIGTH:
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
    : {};
  return (
    <View style={[styles.cardContainer, backgroundColor]}>
      {getIcon(props.piece.type, props.length)}
      <Text>{props.piece.quantity}</Text>
    </View>
  );
};

const CardBox = () => {
  const piece = {
    type: PieceType.KING,
    quantity: 40,
    isActive: true,
  };

  return (
    <View style={styles.container}>
      <Card piece={piece} length={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: ColorSchema.background.dark,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderColor: ColorSchema.purple.normal,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default CardBox;
