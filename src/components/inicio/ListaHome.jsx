import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import moment from 'moment'

const ListaHome = ({ lista }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((previusState) => !previusState);
  };
  const backgroundColor =
    lista.prioridad === "1"
      ? "#6e3b6e"
      : lista.prioridad === "2"
      ? "green"
      : "red";
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 86,
          paddingLeft: 25,
          paddingRight: 18,
          alignItems: "center",
          backgroundColor,
        }}
        onPress={() => toggleExpand()}
      >
        <Text style={styles.title}> {lista.tarea}</Text>
        <Icon
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={30}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text> Descripcion: {lista.descripcion} </Text>
          <Text> Prioridad: {lista.prioridad} </Text>
          <Text> Gasto/Ingreso: {lista.gasto} </Text>
          <Text> Bs: {lista.monto} </Text>
          <Text> Fecha: { moment.unix(lista.createAt).format('LLLL')} </Text>
        </View>
      )}
    </View>
  );
};

export default ListaHome;
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
  },
  parentHr: {
    height: 1,
    color: "#ffffff",
    width: "100%",
  },
  child: {
    backgroundColor: "#C7C7C7",
    padding: 10,
  },
});
