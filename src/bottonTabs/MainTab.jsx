import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Home from './Home'
import Perfil from './Perfil'
import Tareas from './Tareas'

const Tab = createBottomTabNavigator()

 const FooterTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#1adbb5',
        // activeBackgroundColor: '#feb72b',
        inactiveTintColor:"black",
        //inactiveBackgroundColor:'#527318'
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Tareas}
        options={{
          tabBarLabel: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default FooterTabs