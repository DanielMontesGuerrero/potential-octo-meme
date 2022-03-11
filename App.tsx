/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import ColorSchema from './assets/ColorSchema.js';
import Game from './src/views/Game';
import Home from './src/views/Home';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: ColorSchema.background.normal,
    text: 'white',
    primary: ColorSchema.purple.normal,
  },
};

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
