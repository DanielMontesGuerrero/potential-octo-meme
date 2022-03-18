import ColorSchema from '../../assets/ColorSchema';
import Button from '../components/Button';
import DefaultStyles from '../shared/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={DefaultStyles.centeredContainer}>
      <View style={styles.titleContainer}>
        <Text style={[DefaultStyles.defaultText, styles.title]}>
          un nombre mamalón
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Play"
          onPress={() => navigation.navigate('Game')}
          color="white"
          bgColor={ColorSchema.red.normal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
  },
  title: {
    marginTop: '20%',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default Home;
