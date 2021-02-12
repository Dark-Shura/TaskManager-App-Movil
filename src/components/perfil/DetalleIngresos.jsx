import React,{ useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Caption, Title } from "react-native-paper";
import { DB, AUTH } from '../../../firebase';
import moment from 'moment'



const DetalleIngresos = () => {

  const [DATA, setDATA] = useState([])
    const Item = ({ dato }) => (
      <View style={styles.item}>
        <Title >{ moment.unix(dato.fecha).format('LLLL')}</Title>
        <Caption style={styles.caption}>Se registro el ingreso de {dato.saldo} Bs.</Caption>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item dato={item} />
    );
    useEffect(() => {
      AUTH.onAuthStateChanged((user) => {
        if( user ) {
         let credenciales = user.uid
          getDatos(credenciales)
        }
      })
      }, [])
  const getDatos = async (credenciales) =>{
    await DB.collection("users").doc(credenciales).collection('Ingresos-Egresos').orderBy('fecha','desc')
    .onSnapshot(function(querySnapshot) {
      var tareas = [];
      querySnapshot.forEach(function(doc) {
        tareas.push({...doc.data(), id: doc.id});
      });
      setDATA(tareas)
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}> Detalle de Ingresos  </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#cccccc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:25,
    alignItems:'stretch'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  caption:{
    fontSize:15
  }
});

export default DetalleIngresos