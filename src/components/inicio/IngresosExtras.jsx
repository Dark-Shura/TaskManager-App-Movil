import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Title, Caption } from 'react-native-paper'
import { AUTH, DB } from '../../../firebase'

const Saldo =() => {
  const [Extras, setExtras] = useState([])
  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {
      if( user ) {
       let credenciales = user.uid
        updateBilletera(credenciales)
      }
    })
    }, [])
const updateBilletera = (credenciales) => {
  DB.collection("users").doc(credenciales).collection('tareas')
  .onSnapshot(function(querySnapshot) {
    var tareas = [];
    querySnapshot.forEach(function(doc) {
      tareas.push({...doc.data(), id: doc.id});
    });
    setExtras(tareas)
  })
}
  const extras = Extras.filter(x => x.gasto=== 'INGRESO')
  const extrasTotal = extras.map(x => x.monto)
  const extrasSuma = extrasTotal.reduce((acc, el) => acc + el, 0)



  return(
     <>
       <Title> Bs. {extrasSuma} </Title>
       <Caption>Ingresos Extras</Caption>
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
