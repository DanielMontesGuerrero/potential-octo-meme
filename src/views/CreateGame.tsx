import ColorSchema from '../../assets/ColorSchema';
import Button from '../components/Button';
import DefaultStyles from '../shared/styles';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import SwitchSelector from 'react-native-switch-selector';

const CreateGame = ({navigation}) => {
  const gameConfig = {
    playerName: '',
    host: 'ws://192.168.0.40:3000',
    token: 'token123',
  };

  const [isOnline, setIsOnline] = useState(false);

  const validateGameConfig = () => {
    if (gameConfig.playerName.length === 0) {
      showMessage({
        message: 'Missing player name',
        type: 'danger',
      });
      return;
    }
    if (isOnline) {
      if (gameConfig.host.length === 0 || gameConfig.token.length === 0) {
        showMessage({
          message: 'Missing connection data',
          type: 'danger',
        });
        return;
      }
    }
    console.log(gameConfig);
    navigation.navigate('Game', {
      playerName: gameConfig.playerName,
      host: gameConfig.host,
      token: gameConfig.token,
      mode: isOnline ? 'ONLINE' : 'OFFLINE',
    });
  };

  return (
    <View style={DefaultStyles.centeredContainer}>
      <View style={styles.titleContainer}>
        <Text
          style={[DefaultStyles.defaultText, styles.title]}
          adjustsFontSizeToFit={true}>
          Game settings
        </Text>
      </View>
      <SwitchSelector
        options={[
          {
            label: 'Offline',
            value: false,
            activeColor: ColorSchema.red.normal,
          },
          {
            label: 'Online',
            value: true,
            activeColor: ColorSchema.blue.normal,
          },
        ]}
        onPress={(val: boolean | ((prevState: boolean) => boolean)) =>
          setIsOnline(val)
        }
        initial={0}
        backgroundColor={ColorSchema.purple.normal}
        borderRadius={10}
        bold={true}
        style={styles.buttonsContainer}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.intput}
          onChangeText={name => (gameConfig.playerName = name)}
          placeholder="Player name..."
          placeholderTextColor="black"
          cursorColor="black"
          autoFocus={true}
        />
        {isOnline ? (
          <>
            <TextInput
              style={styles.intput}
              onChangeText={host => (gameConfig.host = host)}
              placeholder="Host..."
              placeholderTextColor="black"
              cursorColor="black"
              defaultValue={gameConfig.host}
            />
            <TextInput
              style={styles.intput}
              onChangeText={token => (gameConfig.token = token)}
              placeholder="Token..."
              placeholderTextColor="black"
              cursorColor="black"
              defaultValue={gameConfig.token}
            />
          </>
        ) : (
          <></>
        )}
        <Button
          title="Play"
          onPress={validateGameConfig}
          color="white"
          bgColor={ColorSchema.green.normal}
          style={styles.playButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playButton: {
    marginTop: 20,
  },
  intput: {
    backgroundColor: ColorSchema.light.light,
    color: 'black',
    width: Dimensions.get('window').width / 2,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    margin: '15%',
  },
  formContainer: {
    flex: 3,
  },
  title: {
    marginTop: '15%',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default CreateGame;
