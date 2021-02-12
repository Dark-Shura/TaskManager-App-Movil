import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Avatar, Title } from "react-native-paper";
import Ingresos from "./Ingresos";
import DetalleIngresos from "./DetalleIngresos";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AUTH } from "../../../firebase";
import Saldo from '../inicio/Saldo'
import Gastos from '../inicio/Gastos'
import IngresosExtras from '../inicio/IngresosExtras'
import Alerta from './Alerta'
import CerrarSesion from './CerrarSesion'

const PerfilUsuario = () => {
  const user = AUTH.currentUser
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{ flexDirection: "row", marginTop: 25, alignItems: "center" }}
        >
          <Avatar.Image source={{ uri: user.photoURL }} size={120} />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              {user.displayName.toUpperCase()}
            </Title>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row }>
          <View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons name="gmail" size={24} color="black" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
          </View>
        <CerrarSesion />
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
           <Saldo/>
          </View>
          <View style={[styles.infoBox,{borderRightColor:'#dddddd', borderRightWidth:1}]}>
            <Gastos/>
          </View>
          <View style={styles.infoBox}>
            <IngresosExtras/>
          </View>
      </View>
      <View style={{ justifyContent: "flex-start", marginBottom:10 }}>
        <Ingresos />
      </View>
      <View
        style={{
          borderBottomColor: "#dddddd",
          borderBottomWidth: 3,
          marginTop:30
        }}
      />
      <Alerta />
      <DetalleIngresos />
    </SafeAreaView>
  );
};
export default PerfilUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent:'space-between'
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
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  singUp: {
    width: "45%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 20,
  },
});
