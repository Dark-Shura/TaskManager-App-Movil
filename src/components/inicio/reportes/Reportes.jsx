import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Button,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const Reportes = ({ reporte }) => {

  const [date, setDate] = useState(new Date());
  const [dateF, setDateF] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showF, setShowF] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const onChangeF = (event, selectedDate) => {
    const currentDate = selectedDate || dateF;
    setShowF(Platform.OS === "ios");
    setDateF(currentDate);
  };

  const enviarFechas = () => {
    let unix = Number(moment.unix(date));
    let unixF = Number(moment.unix(dateF));
    reporte({
      fechaI: unix.toString().slice(0, 10),
      fechaF: unixF.toString().slice(0, 10),
    });
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const showDatepickerF = () => {
    setShowF(true);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent:'space-evenly' }}>
        <TouchableOpacity
          onPress={showDatepicker}
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
          <Text style={{ color: "#009387", fontSize: 12 }}>
            {" "}
            Desde: {moment(date).format("L")}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showDatepickerF}
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
          <Text style={{ color: "#009387", fontSize: 12 }}>
            {" "}
            Hasta: {moment(dateF).format("L")}{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={enviarFechas}
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
          <Text style={{ color: "#009387", fontSize: 14 }}>
            {" "}
            Establecer Rango{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            // is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </>
      <>
        {showF && (
          <DateTimePicker
            value={dateF}
            mode="date"
            display="default"
            onChange={onChangeF}
          />
        )}
      </>
    </View>
  );
};

export default Reportes;

const styles = StyleSheet.create({
  singUp: {
  width: "27%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  infoBox: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
});
