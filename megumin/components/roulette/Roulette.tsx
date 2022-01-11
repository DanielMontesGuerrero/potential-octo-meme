import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import LeverLeft from '../../assets/LeverLeft.svg';
import LeverRight from '../../assets/LeverRight.svg';
import ColorSchema from '../../assets/ColorSchema';

type RouletteProps = {
  width: number;
  height: number;
  options: string[];
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
  selectedOption: number;
};

const Roulette = (props: RouletteProps) => {
  const [option, setOption] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const displayedOption =
        props.selectedOption !== -1
          ? props.selectedOption
          : (option + 1) % props.options.length;
      setOption(displayedOption);
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={{}}>
        {props.active ? (
          <LeverLeft width={props.width} height={props.height} />
        ) : (
          <LeverRight width={props.width} height={props.height} />
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.active}
        hardwareAccelerated={true}>
        <View style={styles.centeredView}>
          <View style={styles.rouletteView}>
            <Text style={styles.rouletteViewText}>{props.options[option]}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteView: {
    backgroundColor: ColorSchema.light.normal,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  rouletteViewText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default Roulette;
