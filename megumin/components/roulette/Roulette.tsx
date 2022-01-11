import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  const gradientColors = [
    ColorSchema.light.normal,
    ColorSchema.light.normal,
    ColorSchema.light.light,
    ColorSchema.light.light,
    ColorSchema.light.dark,
    ColorSchema.light.dark,
  ];
  const gradientLocations = [0.75, 0.75, 0.75, 0.85, 0.85, 1];
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
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            locations={gradientLocations}
            colors={gradientColors}
            style={styles.rouletteView}>
            <Text style={styles.rouletteViewText}>{props.options[option]}</Text>
          </LinearGradient>
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
    width: (2 * Dimensions.get('window').width) / 5,
    padding: 35,
    alignItems: 'center',
    borderRadius: 5,
  },
  rouletteViewText: {
    color: 'black',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default Roulette;
