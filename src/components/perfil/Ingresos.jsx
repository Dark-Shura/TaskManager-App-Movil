import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  Platform
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { AUTH, DB } from '../../../firebase'
import moment from 'moment'

const Ingresos = () => {
  const credenciales = AUTH.currentUser.uid
  const [modalVisible, setModalVisible] = useState(false);
  const [ingresos, setingresos] = useState({
    saldo:0,
    egresos:0,
    fecha: Math.floor(new Date().getTime()/1000.0)
  })
  const aumentarSaldo = (val) => {
    setingresos({...ingresos, saldo: Number(val)})
  }
  const cerrarModal = () => {
    setModalVisible(!modalVisible);
  };
  const guardarEnDB = async () =>{
    await DB.collection("users")
      .doc(credenciales)
      .collection("Ingresos-Egresos")
      .doc()
      .set(ingresos)
      .then(()=> {
        setModalVisible(!modalVisible)
      })
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Aumentar Saldo</Text>
            <View style={styles.action}>
              <MaterialIcons name="attach-money" size={24} color="black" />
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(val) => aumentarSaldo(val)}
                // value={(ingresos.ingresos).toString()}
                placeholder="ingrese el Monto Bs."
              />
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
                onPress={guardarEnDB}
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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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
        <Text style={{ color: "#009387", fontSize: 20 }}> + Fondos </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Ingresos;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight:'bold'
  },
  input: {
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
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
});
