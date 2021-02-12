import React from 'react';
import taskManager from './src/screens/taskManager'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import MainTab from './src/bottonTabs/MainTab'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="taskManager" component={taskManager}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={MainTab}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

