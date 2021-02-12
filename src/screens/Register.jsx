import React, { useState } from "react";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  StatusBar,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { STORAGE_REF, STORAGE } from "../../firebase";

const Register = ({ navigation }) => {
  const Bs = React.createRef();
  const Fall = new Animated.Value(1);

  const [image, setImage] = useState(
    "https://library.kissclipart.com/20181001/wbw/kissclipart-gsmnet-ro-clipart-computer-icons-user-avatar-4898c5072537d6e2.png"
  );
  const [fotoPerfil, setFotoPerfil] = useState();
  const pickImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((imagenPerfil) => {
      Bs.current.snapTo(1);
      setImage(imagenPerfil.uri);
    });
  };
  const pickImageCamera = async () => {
    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((imagenPerfil) => {
      Bs.current.snapTo(1);
      setImage(imagenPerfil.uri);
    });
  };
  const guardarImagen = (uri) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const [data, setData] = useState({
    nombre: "",
    email: "",
    password: "",
    errorMessage: null,
    check_textInputChange: false,
    check_textInputChangeNombre: false,
    isValidPassword: false,
    secureTextEntry: true,
    secureConfirmTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange: true });
    } else {
      setData({ ...data, email: val, check_textInputChange: false });
    }
  };

  const handlePasswordChange = (val) => {
    setData({ ...data, password: val });
  };
  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  const textInputChangeName = (val) => {
    setData({ ...data, nombre: val });
  };

  const registerCuenta = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((credenciales) => {
        guardarImagen(image).then((resolve) => {
          STORAGE_REF.child("FotosPerfil/" + credenciales.user.uid)
            .put(resolve)
            .then((resolve) => {
              STORAGE.ref(`FotosPerfil/${credenciales.user.uid}`)
                .getDownloadURL()
                .then((resolve) => {
                  credenciales.user.updateProfile({
                    displayName: data.nombre,
                    photoURL: resolve,
                  });
                });
              console.log("imagen subida");
            })
            .catch((error) => {
              console.log("error al subir");
            });
        });
      })
      .then(() => navigation.navigate("Home"))
      .catch((error) => setData({ errorMessage: error.message }));
  };
  const RenderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Subir Foto </Text>
        <Text style={styles.panelSubtitle}>Elige tu imagen de Perfil </Text>
        <TouchableOpacity style={styles.panelButton} onPress={pickImageCamera}>
          <Text style={styles.panelButtonTitle}>Tomar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
          <Text style={styles.panelButtonTitle}>Escoger desde Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => Bs.current.snapTo(1)}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const RenderHeader = () => (
    <View style={styles.header2}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <View style={styles.content}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Crear Cuenta</Text>
      </View>
      <BottomSheet
        ref={Bs}
        snapPoints={[330, 0]}
        renderContent={RenderInner}
        renderHeader={RenderHeader}
        initialSnap={1}
        callbackNode={Fall}
        enabledGestureInteraction={true}
      />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Animated.View
          style={{ opacity: Animated.add(0.1, Animated.multiply(Fall, 1.0)) }}
        >
          <View style={styles.errorM}>
            {data.errorMessage && (
              <Text
                style={{ color: "#c70039", fontSize: 15, fontWeight: "600" }}
              >
                {data.errorMessage}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.textInput}> Elija una Foto </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => Bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{ uri: image }}
                    style={{ height: 100, width: 100 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo
                        name="camera"
                        size={30}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: "#fff",
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={(styles.textInput, { marginTop: 10 })}>Nombre</Text>
          <View style={styles.action}>
            <FontAwesome name="user" color="black" size={20} />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="ingresa tu Nombre"
              autoCapitalize="none"
              onChangeText={(val) => textInputChangeName(val)}
              value={data.nombre}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={(styles.textInput, { marginTop: 15 })}>Email</Text>
          <View style={styles.action}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="ingresa tu Email"
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              value={data.email}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textInput, { marginTop: 15 }]}> Password </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              style={styles.input}
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
              value={data.password}
              placeholder="ingresa tu password"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonIS}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.button}
              >
                <Text style={styles.text}> Volver Login </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={registerCuenta}
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
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animatable.View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#009387",
  },
  input: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  text_header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    // paddingBottom: 5,
  },
  textInput: {
    fontWeight: "bold",
    fontSize: 15,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 55,
  },
  buttonIS: {
    marginTop: 30,
  },
  singUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  header2: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
    width: 300,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
