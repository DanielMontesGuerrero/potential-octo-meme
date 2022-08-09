import ColorSchema from '../../assets/ColorSchema';
import DefaultStyles from '../shared/styles';
import {Player} from '../shared/types';
import {secondsSinceEpoch} from '../shared/utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type ScoreboardProps = {
  players: Player[];
  beginTime: number;
  endTime: number;
};

function getColorFromPlayerId(id: number) {
  switch (id) {
    case 0:
      return ColorSchema.green.normal;
    case 1:
      return ColorSchema.yellow.normal;
    case 2:
      return ColorSchema.blue.normal;
    case 3:
      return ColorSchema.red.normal;
    default:
      return ColorSchema.purple.normal;
  }
}

function playerItem(player: Player, index: number) {
  const textStyles = [DefaultStyles.defaultText];
  if (player.isDead) {
    textStyles.push({color: ColorSchema.light.dark});
  }
  return (
    <View style={styles.listItem} key={index}>
      <Svg height="10" width="10" style={styles.playerIcon}>
        <Circle cx="5" cy="5" r="5" fill={getColorFromPlayerId(player.id)} />
      </Svg>
      <Text style={textStyles}>{`${player.score} - ${player.name}`}</Text>
    </View>
  );
}

const Scoreboard = (props: ScoreboardProps) => {
  const [matchTime, setMatchTime] = useState(0);
  const seconds = (matchTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor(matchTime / 60)
    .toString()
    .padStart(2, '0');
  const playerList = props.players.map((item, index) => {
    return playerItem(item, index);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime =
        props.endTime !== 0 ? props.endTime : secondsSinceEpoch() * 1000;
      setMatchTime(Math.round((currentTime - props.beginTime) / 1000));
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>{playerList}</View>
      <View style={styles.timeContainer}>
        <View>
          <Text
            style={DefaultStyles.defaultText}>{`${minutes}:${seconds}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  playerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIcon: {
    marginRight: 5,
  },
});

export default Scoreboard;
