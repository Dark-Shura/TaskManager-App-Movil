import React from 'react';
import { View, Text, Image, Button, StyleSheet,TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {MaterialIcons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
const taskManager = ({navigation}) => {

    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle='light-content'/>
        <View style={styles.header}>
          <Image
          source= {require('../../assets/logo_main.png')}
          style={styles.logo}
          resizeMode="stretch"
          />
        </View>
        <Animatable.View animation='fadeInUpBig' style={styles.footer} >
          <Text style={ styles.title }> Note Alert </Text>
          <Text style={ styles.text }> Una App para el control de Gastos en sus Salidas :)</Text>
          <View style={styles.buttonS}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.buttonSign}>
                <Text style={styles.textSing}> Empieza Ahora </Text>
                <MaterialIcons
                  name="navigate-next"
                  color='#fff'
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

      </View>
    );
};

export default taskManager;
const {height} = Dimensions.get("screen")
const height_logo = height * 0.28
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems:'center'

  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    height: height_logo,
    width: height_logo
  },
  buttonSign: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,
    width: 230,
    height:55
  },
  buttonS: {
    marginTop: 50,
    alignItems:'flex-end'
  },
  textSing: {
    color:'white',
    fontWeight: 'bold'
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    marginTop: 5,
    fontSize: 15,
    color: 'grey'
  }

});