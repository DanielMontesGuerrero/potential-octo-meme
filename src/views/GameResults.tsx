import ColorSchema from '../../assets/ColorSchema';
import Button from '../components/Button';
import DefaultStyles from '../shared/styles';
import {IPlayer} from '../shared/types';
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GameResults = ({route, navigation}) => {
  const {players} = route.params;
  const gradientLocations = [0.6, 0.6, 0.6, 0.65, 0.65, 1];
  const getGradientColorFromIndex = (index: number) => {
    switch (index) {
      case 0:
        return [
          '#7FBCD2',
          '#7FBCD2',
          '#E1FFEE',
          '#E1FFEE',
          '#A5F1E9',
          '#A5F1E9',
        ];
      case 1:
        return [
          '#E38B29',
          '#E38B29',
          '#FFF9B0',
          '#FFF9B0',
          '#FFD384',
          '#FFD384',
        ];
      case 2:
        return [
          '#A2B5BB',
          '#A2B5BB',
          '#F5EDDC',
          '#F5EDDC',
          '#CFD2CF',
          '#CFD2CF',
        ];
      default:
        return [
          '#61481C',
          '#61481C',
          '#BF9742',
          '#BF9742',
          '#A47E3B',
          '#A47E3B',
        ];
    }
  };

  const getPlayerBanner = (player: IPlayer, index: number) => {
    const icon = player.isDead ? '💀' : '';
    return (
      <LinearGradient
        style={styles.playerBanner}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={gradientLocations}
        colors={getGradientColorFromIndex(index)}>
        <Text style={styles.bannerName}>{`#${index + 1} ${
          player.name
        } ${icon}`}</Text>
        <Text style={styles.bannerScore}>{player.score}</Text>
      </LinearGradient>
    );
  };
  return (
    <View style={DefaultStyles.centeredContainer}>
      <View style={styles.titleContainer}>
        <Text style={[DefaultStyles.defaultText, styles.title]}>Results:</Text>
      </View>
      <View style={styles.bannersContainer}>
        <FlatList
          data={players}
          renderItem={({item, index}) => getPlayerBanner(item, index)}
          keyExtractor={item => item.id}
        />
        <Button
          title="Done"
          onPress={() => navigation.dispatch(StackActions.popToTop())}
          color="white"
          bgColor={ColorSchema.red.normal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerBanner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    width: (Dimensions.get('window').width / 5) * 4,
  },
  bannerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerScore: {
    color: 'black',
    fontStyle: 'italic',
  },
  titleContainer: {
    flex: 1,
  },
  bannersContainer: {
    flex: 4,
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

export default GameResults;
