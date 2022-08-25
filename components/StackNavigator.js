import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen"
import MasterList from './MasterList';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Group>
        <Stack.Screen name='Current List' component={HomeScreen} />
        <Stack.Screen name='Master List' component={MasterList} />
      </Stack.Group>
  </Stack.Navigator>
  )
}


export default StackNavigator