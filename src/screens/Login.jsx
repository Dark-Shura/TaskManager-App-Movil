import { Feather, FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, Platform, TextInput, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AUTH } from '../../firebase'

const Login = ({navigation}) => {
  const datos = {
    email: '',
    password: ''
  }
  const [data, setData] = React.useState({
    email: '',
    password: '',
    errorMessage: null,
    check_textInputChange: false,
    isValidPassword: false,
    secureTextEntry: true
  })
  const  handleLogin = () => {
      AUTH
      .signInWithEmailAndPassword(data.email, data.password)
      .then(()=> navigation.navigate('Home'))
      .then(() => { setData({...datos}) })
      .catch( error =>  setData({errorMessage: error.message}))
  }
  const textInputChange = (val) => {
    if( val.length !== 0 ) {
      setData({ ...data, email: val, check_textInputChange: true })
    } else {
      setData({ ...data, email: val, check_textInputChange: false })
    }
  }
  const handlePasswordChange = (val) => {
    setData({ ...data, password: val })
  }
  const updateSecureTextEntry = () =>{
    setData({ ...data, secureTextEntry: !data.secureTextEntry})
  }
  return(
    <View style={styles.content}>
      <StatusBar backgroundColor='#009387' barStyle='light-content'/>
      <View style={styles.header}>
      <Text style={styles.text_header}> Bienvenido!!</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <View style={styles.errorM}>
          { data.errorMessage && <Text style={{color: '#c70039', fontSize:15, fontWeight:'600' }}> { data.errorMessage } </Text> }
        </View>
        <Text style={styles.textInput}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20}
            />
            <TextInput 
            style={styles.input}
            keyboardType='email-address'
            placeholder='ingresa tu Email'
            autoCapitalize='none'
            onChangeText={(val) => textInputChange(val)}
            value={data.email}
            />
            {data.check_textInputChange ?
              <Animatable.View
              animation='bounceIn'>
              <Feather
              name='check-circle'
              color='green'
              size={ 20 } />
              </Animatable.View>
            : null }
          </View>
        <Text
          style={[styles.textInput,
          {marginTop: 35 }]}>
          Password
        </Text>
          <View style={styles.action}>  
            <FontAwesome name='lock' color='#05375a' size={20}
            />
            <TextInput
            style={styles.input} 
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
            value={data.password}
            placeholder='ingresa tu password'
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? 
                <Feather name='eye-off' color='gray' size={20} />
              :
                <Feather name='eye' color='gray' size={20} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.buttonIS} >
            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient colors={['#08d4c4','#01ab9d']} style={styles.button}>
                <Text style={styles.text} > Iniciar Sesion </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
              <TouchableOpacity
                onPress={()=> navigation.navigate('Register')} style={[styles.singUp, {borderColor:'#009387', borderWidth: 1, borderRadius: 30, marginTop: 20}]}
              >
                <Text style={{color:'#009387', fontSize:20}}> Registrate </Text>
              </TouchableOpacity>
          </View>
      </Animatable.View>
    </View>
  )
}
export default Login

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#009387'
  },
  input: {
    flex: 1,
    marginTop: Platform.OS ==='android'? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  text_header: {
    fontSize:40,
    fontWeight:'bold',
    color: '#fff'
  },
  header: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50 
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    color:'#fff',
    fontSize: 20
  },
  errorM: {
    justifyContent:'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,  
    height:50
  },
  buttonIS :{
    marginTop: 50
  },
  singUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})