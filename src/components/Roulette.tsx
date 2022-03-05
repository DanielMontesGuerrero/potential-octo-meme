import ColorSchema from '../../assets/ColorSchema';
import LeverLeft from '../../assets/LeverLeft.svg';
import LeverRight from '../../assets/LeverRight.svg';
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
      const displayedOption = Math.floor(Math.random() * props.options.length);
      setOption(displayedOption);
    }, 100);
    return () => clearInterval(interval);
  });

  const options = props.options.map((item, index) => {
    const itemStyle: any[] = [styles.optionsItem];
    if (index === option && props.selectedOption === -1) {
      itemStyle.push(styles.optionsActive);
    }
    if (index === props.selectedOption) {
      itemStyle.push(styles.optionsSelected);
    }
    return (
      <View key={index} style={itemStyle}>
        <Text style={styles.optionsText}>{item}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
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
            <Text style={styles.rouletteViewText}>
              {
                props.options[
                  props.selectedOption === -1 ? option : props.selectedOption
                ]
              }
            </Text>
            <View style={styles.optionsContainer}>{options}</View>
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
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteView: {
    padding: 35,
    alignItems: 'center',
    borderRadius: 5,
  },
  rouletteViewText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionsItem: {
    margin: 2,
    backgroundColor: ColorSchema.light.dark,
    width: (1 * Dimensions.get('window').width) / 4,
    height: (1 * Dimensions.get('window').width) / 4,
  },
  optionsActive: {
    backgroundColor: ColorSchema.light.normal,
  },
  optionsSelected: {
    backgroundColor: 'white',
  },
  optionsText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Roulette;
