import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Picker,
  TextInput,
  Platform,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Foundation, MaterialIcons } from "@expo/vector-icons";
import { DB, AUTH } from "../../../firebase";

const Agregar = () => {
  const credenciales = AUTH.currentUser.uid;
  const vaciarTarea = {
    tarea: "",
    prioridad: "1",
    descripcion: "",
    errorMessage: "",
    estado: false,
    monto: 0,
    gasto: "GASTO",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [gasto, setGasto] = useState(false);
  const [tareas, setTareas] = useState({
    tarea: "",
    prioridad: "1",
    descripcion: "",
    errorMessage: "",
    estado: gasto,
    monto: 0,
    gasto: "GASTO",
  });
  const cerrarModal = () => {
    setModalVisible(!modalVisible);
    setTareas(vaciarTarea);
  };
  const toggleSwitch = () => {
    setGasto((previusState) => !previusState);
    gasto
      ? setTareas({ ...tareas, gasto: "GASTO" }) && setGasto(false)
      : setTareas({ ...tareas, gasto: "INGRESO" }) && setGasto(true);
  };
  const nombreTarea = (nombre) => {
    setTareas({ ...tareas, tarea: nombre });
  };
  const nombreDescripcion = (descripcion) => {
    setTareas({ ...tareas, descripcion: descripcion });
  };
  const nombrePrioridad = (prioridad) => {
    setTareas({ ...tareas, prioridad: prioridad });
  };
  const numeroMonto = (monto) => {
    setTareas({ ...tareas, monto: Number(monto) });
  };
  const guardarBD = async () => {
    await DB.collection("users")
      .doc(credenciales)
      .collection("tareas")
      .doc()
    .set({
      ...tareas,
      createAt: Math.floor(new Date().getTime()/1000.0)
    })
      .then(() => {
        setModalVisible(!modalVisible);
      })
      .then(() => {
        setTareas(vaciarTarea);
      })
      .catch((error) => setTareas({ ...tareas, errorMessage: error.message }));
  };
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Tarea </Text>
            <View style={styles.action}>
              <Foundation name="clipboard-pencil" size={24} color="black" />
              <TextInput
                style={styles.input}
                onChangeText={(nombre) => nombreTarea(nombre)}
                value={tareas.tarea}
                placeholder="ingrese tarea"
              />
            </View>
            <Text style={styles.modalText}> Descripcion </Text>
            <View style={styles.action}>
              <MaterialIcons name="description" size={24} color="black" />
              <TextInput
                style={styles.input}
                onChangeText={(descripcion) => nombreDescripcion(descripcion)}
                value={tareas.descripcion}
                placeholder="ingrese Descripcion"
              />
            </View>
            <Text style={styles.modalText}> Prioridad </Text>
            <View style={styles.action}>
              <Picker
                selectedValue={tareas.prioridad}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue) => nombrePrioridad(itemValue)}
              >
                <Picker.Item label="1 (Importante)" value="1" />
                <Picker.Item label="2 (Semi Importante)" value="2" />
                <Picker.Item label="3 (No Importante)" value="3" />
              </Picker>
            </View>
            <Text style={styles.modalText}> Gasto/Ingreso </Text>
            <View style={styles.action}>
              <MaterialIcons name="attach-money" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Sin Gastos"
                keyboardType="numeric"
                onChangeText={(monto) => numeroMonto(monto)}
              />
              {tareas.monto > 0 ? (
                <>
                  <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={gasto ? "#009387" : "#c70039"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={gasto}
                  />
                  <Text style={{ fontWeight: "bold" }}>{tareas.gasto} Bs.</Text>
                </>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={styles.contenedorButtons}>
              <TouchableOpacity
                onPress={cerrarModal}
                style={[
                  styles.singUp,
                  {
                    borderColor: "#c70039",
                    borderWidth: 1,
                    borderRadius: 30,
                    marginTop: 20,
                  },
                ]}
              >
                <Text style={{ color: "#c70039", fontSize: 20 }}>
                  {" "}
                  Cancelar{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={guardarBD}
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
                <Text style={{ color: "#009387", fontSize: 20 }}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.button}>
          <AntDesign name="pluscircleo" size={24} color="white" />
          <Text style={styles.text}>Agregar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default Agregar;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 35,
    width: 150,
    // marginTop:25
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    marginTop: 25,
    fontSize: 20,
    fontWeight: "300",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  input: {
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  singUp: {
    width: "35%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 20,
  },
  contenedorButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  errorM: {
    justifyContent: "center",
    alignItems: "center",
  },
});
