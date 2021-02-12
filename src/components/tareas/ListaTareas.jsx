import React, { useState, useEffect } from "react";
import { DB, AUTH } from '../../../firebase'
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Foundation } from '@expo/vector-icons'
import Editar from './Editar'
import Eliminar from './Eliminar'

const Item = ({ item, style }) => (
  <View style={[styles.item, style]}>
    <View style={styles.contenedor}>
      <View>
        <Text style={styles.title}>{item.tarea}</Text>
        <Text> prioridad: {item.prioridad}  </Text>
      </View>
      <View style={styles.editRemove}>
        <View style={styles.space}>
          <Eliminar id={item}/>
        </View>
        <View style={styles.space}>
          <Editar item={item}/>
        </View>
      </View>
    </View>
 </View>
);
const ListaTareas = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [datos, setDatos] = useState([])

  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {

      if( user ) {
       let credenciales = user.uid
        getDatos(credenciales)
      }
    })
    }, [])
    const getDatos = async (credenciales) =>{
     await DB.collection("users").doc(credenciales).collection('tareas')
      .onSnapshot(function(querySnapshot) {
        var tareas = [];
        querySnapshot.forEach(function(doc) {
          tareas.push({...doc.data(), id: doc.id});
        });
        setDatos(tareas)
      });
    }

    const renderItem = ({ item }) => {
      const backgroundColor = item.prioridad === '1' ? "#6e3b6e" :(item.prioridad === '2' ? "green": "red");
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };
  const ordenado = datos.sort((a, b) =>
  a.prioridad.toString().localeCompare(b.prioridad.toString()))
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={ordenado}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        />
    </SafeAreaView>
  );
};
export default ListaTareas;

const styles = StyleSheet.create({
  contenedor: {
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  editRemove:{
    flexDirection: 'row'
  },
  space: {
    marginLeft:15
  }
});

