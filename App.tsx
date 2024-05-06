import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const App = () => {

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

  const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='Details' component={DetailsScreen}/>
    </Stack.Navigator>

   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})