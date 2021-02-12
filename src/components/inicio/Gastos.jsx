import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import { Title, Caption, Avatar } from 'react-native-paper'
import { AUTH, DB } from '../../../firebase'

const Gastos = () =>{
  const [GASTOS, setGASTOS] = useState([])

  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {
      if( user ) {
       let credenciales = user.uid
        getDatosGastos(credenciales)
      }
    })
    }, [])

  const getDatosGastos = (credenciales) =>{
     DB.collection("users").doc(credenciales).collection('tareas')
    .onSnapshot(function(querySnapshot) {
      var tareas = [];
      querySnapshot.forEach(function(doc) {
        tareas.push({...doc.data(), id: doc.id});
      });
      setGASTOS(tareas)
    })
  }
  
  const filtrandoGastos = GASTOS.filter(e => e.gasto === 'GASTO')
  const gastos = filtrandoGastos.map(x => x.monto)
  const gastoTotal = gastos.reduce((acc, el) => acc+ el,0)
  return(
    <>
       <Title> Bs. {gastoTotal} </Title>
       <Caption> Gastos </Caption>
     </>
    )
}
export default Gastos

const styles = StyleSheet.create({
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },

})