import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  bgColor: string;
};

const Button = (props: ButtonProps) => {
  const color = {color: props.color};
  const bgColor = {backgroundColor: props.bgColor};
  return (
    <TouchableOpacity style={[bgColor, styles.button]} onPress={props.onPress}>
      <Text style={[color, styles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  color: 'white',
  bgColor: 'black',
  onPress: () => 0,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default Button;
