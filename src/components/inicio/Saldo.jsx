import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Title, Caption } from 'react-native-paper'
import { AUTH, DB } from '../../../firebase'
import Gastos from './Gastos'

const Saldo =() => {
  const [Billetera, setBilletera] = useState([])
  const [gastos, setGastos] = useState([])

  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {
      if( user ) {
       let credenciales = user.uid
        getDatos(credenciales)
        getMontos(credenciales)
      }
    })
    }, [])
const getDatos =  (credenciales) =>{
   DB.collection("users").doc(credenciales).collection('Ingresos-Egresos')
  .onSnapshot(function(querySnapshot) {
    var tareas = [];
    querySnapshot.forEach(function(doc) {
      tareas.push({...doc.data(), id: doc.id});
    });
    setBilletera(tareas)
  })
}
const getMontos = (credenciales) =>{
  DB.collection("users").doc(credenciales).collection('tareas')
  .onSnapshot(function(querySnapshot) {
    var tareas = [];
    querySnapshot.forEach(function(doc) {
      tareas.push({...doc.data(), id: doc.id});
    });
    setGastos(tareas)
  })
}
  const saldos = Billetera.map(x => x.saldo)
  const saldoTotal = saldos.reduce((acc, el) => acc+ el,0)


  const extras = gastos.filter(x => x.gasto=== 'INGRESO')
  const extrasTotal = extras.map(x => x.monto)
  const extrasSuma = extrasTotal.reduce((acc, el) => acc + el, 0)

  const filtrandoGastos = gastos.filter(e => e.gasto === 'GASTO')
  const arrelgoGastos = filtrandoGastos.map(e => e.monto)
  const gastosTotales = arrelgoGastos.reduce((acc, el) => acc + el,0)


  return(
     <>
       <Title> Bs. {saldoTotal + extrasSuma - gastosTotales}</Title>
       <Caption>Saldo</Caption>
     </>
  )


}

export default Saldo

const styles = StyleSheet.create({

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
})
