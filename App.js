import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './components/MainMenu';
import Gallery from './components/Gallery';

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Danviewer' }}/>
        <Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
