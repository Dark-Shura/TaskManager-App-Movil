import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { AUTH } from '../../firebase'
import PerfilUsuario from '../components/perfil/PerfilUsuario'

const Perfil = () => {
  return(
    <>
      <PerfilUsuario />
    </>
  )
}

export default Perfil

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
  justifyContent: 'center',
  alignItems: 'center'
  }
})