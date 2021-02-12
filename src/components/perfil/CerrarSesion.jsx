import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

const CerrarSesion = () => {
  const cerrarSesion = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <TouchableOpacity onPress={cerrarSesion}>
        <Entypo name="log-out" size={24} color="black" />
        <Text>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CerrarSesion;
