import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Agregar from '../components/tareas/Agregar'
import ListaTareas from '../components/tareas/ListaTareas'

const Tareas =() => {
	return(
		<View style={ styles.container }>
			<View style={styles.agregarTask}>
				<Agregar />
			</View>
			<ListaTareas />
		</View>
	)
}
export default Tareas

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	agregarTask: {
		marginTop: 15,
		alignItems: 'flex-end'
	}
})