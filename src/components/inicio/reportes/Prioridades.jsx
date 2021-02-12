import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const Prioridades = ({NumeroP}) =>{

const mostrarPrioridad1  = () =>{
  NumeroP({numero:'1'})
}
const mostrarPrioridad2  = () =>{
  NumeroP({numero:'2'})
}
const mostrarPrioridad3  = () =>{
  NumeroP({numero:'3'})
}
const mostrarTodos = () =>{
  NumeroP({numero:''})
}

  return(
    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
      <TouchableOpacity
          onPress={mostrarPrioridad1}
          style={[
            styles.singUp,
            {
              borderColor: "#009387",
              borderWidth: 1,
              borderRadius: 30,
              marginTop: 20,
            },
          ]}
        >
          <Text style={{ color: "#009387", fontSize: 14 }}>
            Prioridad 1
          </Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={mostrarPrioridad2}
          style={[
            styles.singUp,
            {
              borderColor: "#009387",
              borderWidth: 1,
              borderRadius: 30,
              marginTop: 20,
            },
          ]}
        >
          <Text style={{ color: "#009387", fontSize: 14 }}>
            Prioridad 2
          </Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={mostrarPrioridad3}
          style={[
            styles.singUp,
            {
              borderColor: "#009387",
              borderWidth: 1,
              borderRadius: 30,
              marginTop: 20,
            },
          ]}
        >
          <Text style={{ color: "#009387", fontSize: 14 }}>
            Prioridad 3
          </Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={mostrarTodos}
          style={[
            styles.singUp,
            {
              borderColor: "#009387",
              borderWidth: 1,
              borderRadius: 30,
              marginTop: 20,
              width:'20%'
            },
          ]}
        >
          <Text style={{ color: "#009387", fontSize: 14 }}>
            Mostrar Todos
          </Text>
        </TouchableOpacity>
    </View>
  )

}

export default Prioridades

const styles = StyleSheet.create({
  singUp: {
    width: "15%",
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },

})