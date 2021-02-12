import React, { useState, useEffect } from "react";
import { Text, Alert } from "react-native";
import { DB, AUTH } from " ../../../firebase";

const Alerta = () => {
  const [saldo, setSaldo] = useState([]);
  const [gastos, setGastos] = useState([]);
  useEffect(() => {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        let credenciales = user.uid;
        getDatos(credenciales);
        getMontos(credenciales);
      }
    });
  }, []);
  const getDatos = (credenciales) => {
    DB.collection("users")
      .doc(credenciales)
      .collection("Ingresos-Egresos")
      .onSnapshot(function (querySnapshot) {
        var tareas = [];
        querySnapshot.forEach(function (doc) {
          tareas.push({ ...doc.data(), id: doc.id });
        });
        setSaldo(tareas);
      });
  };
  const getMontos = (credenciales) => {
    DB.collection("users")
      .doc(credenciales)
      .collection("tareas")
      .onSnapshot(function (querySnapshot) {
        var tareas = [];
        querySnapshot.forEach(function (doc) {
          tareas.push({ ...doc.data(), id: doc.id });
        });
        setGastos(tareas);
      });
  };
  const saldos = saldo.map((x) => x.saldo);
  const saldoTotal = saldos.reduce((acc, el) => acc + el, 0);

  const extras = gastos.filter((x) => x.gasto === "INGRESO");
  const extrasTotal = extras.map((x) => x.monto);
  const extrasSuma = extrasTotal.reduce((acc, el) => acc + el, 0);

  const filtrandoGastos = gastos.filter((e) => e.gasto === "GASTO");
  const arrelgoGastos = filtrandoGastos.map((e) => e.monto);
  const gastosTotales = arrelgoGastos.reduce((acc, el) => acc + el, 0);

  return (
    <>
      {saldoTotal + extrasSuma - gastosTotales>= 100 || saldoTotal + extrasSuma - gastosTotales == 0 ?
        <Text></Text>
       : (
        Alert.alert(
          "Alerta",
          "Su saldo se esta Acabando",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK" },
          ],
          { cancelable: false }
        )
      )}
    </>
  );
};
export default Alerta;
