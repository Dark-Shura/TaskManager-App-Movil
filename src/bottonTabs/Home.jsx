import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import ListaHome from "../components/inicio/ListaHome";
import { Title } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { DB, AUTH } from "../../firebase";
import Reportes from "../components/inicio/reportes/Reportes";
import Prioridades from "../components/inicio/reportes/Prioridades";

const Home = ({navigation}) => {
  const [datos, setDatos] = useState([]);
  const [userID, setUserID] = useState();
  const [prioridad, setPrioridad] = useState({
    p: "",
  });
  const [reportes, setReportes] = useState({
    fechaInicio: 0,
    fechaFin: 0,
  });

  const reporte = (val) => {
    setReportes({
      ...reportes,
      fechaInicio: Number(val.fechaI),
      fechaFin: Number(val.fechaF),
    });
  };

  const mostrarTodos = async () => {
    await DB.collection("users")
      .doc(userID)
      .collection("tareas")
      .onSnapshot((querySnapshot) => {
        var tareas = [];
        querySnapshot.forEach((doc) => {
          tareas.push({ ...doc.data(), id: doc.id });
        });
        setDatos(tareas);
      });
  };
  const filtrarFechas = async () => {
    await DB.collection("users")
      .doc(userID)
      .collection("tareas")
      .where("createAt", ">=", reportes.fechaInicio)
      .where("createAt", "<=", reportes.fechaFin)
      .onSnapshot((querySnapshot) => {
        var tareas = [];
        querySnapshot.forEach((doc) => {
          tareas.push({ ...doc.data(), id: doc.id });
        });
        setDatos(tareas);
      });
  };
  const NumeroP = (val) => {
    setPrioridad({ p: val.numero.toString() });
  };
  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      }else {
        navigation.navigate('taskManager')
      }
    });
  }, []);

  const Item = ({ item }) => (
    <View>
      <ListaHome lista={item} />
    </View>
  );
  const ordenado = datos.sort((a, b) =>
    a.prioridad.toString().localeCompare(b.prioridad.toString())
  );
  const filtrarTareaPorPrioridad =
    prioridad.p === ""
      ? ordenado
      : ordenado.filter((e) => e.prioridad === prioridad.p);

  return (
    <>
      <SafeAreaView style={{ marginBottom: 140 }}>
        <View
          style={{
            alignItems: "center",
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title>
            {" "}
            <Entypo name="megaphone" size={24} color="black" /> Reportes de
            Tareas
          </Title>
          <TouchableOpacity
            onPress={mostrarTodos}
            style={[
              styles.singUp,
              {
                borderColor: "#009387",
                borderWidth: 1,
                borderRadius: 30,
                marginTop: 20,
                width: "35%",
              },
            ]}
          >
            <Text style={{ color: "#009387", fontSize: 14 }}>
              Todas las Tareas
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}} >
        <Text>
          <AntDesign name="filter" size={24} color="black" />
          Buscar por Rango
          de Fechas
        </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Reportes reporte={reporte} />
          <TouchableOpacity
            onPress={filtrarFechas}
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
            <Text style={{ color: "#009387", fontSize: 14 }}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent:'center', alignItems:'center'}}>
        <Text style={{ marginLeft: 15 }}>
          <AntDesign name="filter" size={24} color="black" />
          Mostrar por
          prioridades
        </Text>
        </View>
        <Prioridades NumeroP={NumeroP} />
        <FlatList
          data={filtrarTareaPorPrioridad}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singUp: {
    width: "15%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  infoBox: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
