import DefaultStyles from '../shared/styles';
import {Player} from '../shared/types';
import {secondsSinceEpoch} from '../shared/utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

type ScoreboardProps = {
  players: Player[];
  beginTime: number;
};

function playerItem(player: Player, index: number) {
  return (
    <View style={styles.listItem} key={index}>
      <Svg height="10" width="10" style={styles.playerIcon}>
        <Circle cx="5" cy="5" r="5" fill={player.color} />
      </Svg>
      <Text
        style={
          DefaultStyles.defaultText
        }>{`${player.score} - ${player.name}`}</Text>
    </View>
  );
}

const Scoreboard = (props: ScoreboardProps) => {
  const [matchTime, setMatchTime] = useState(0);
  const seconds = (matchTime % 60).toString().padStart(2, '0');
  const minutes = Math.floor(matchTime / 60)
    .toString()
    .padStart(2, '0');
  const playerList = props.players
    .sort((a, b) => {
      return b.score - a.score;
    })
    .map((item, index) => {
      return playerItem(item, index);
    });

  useEffect(() => {
    const interval = setInterval(() => {
      setMatchTime(Math.round(secondsSinceEpoch() - props.beginTime));
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
