import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Alert, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { DB, AUTH } from '../../../firebase'

const Eliminar = ({id}) => {
	const [idR, setIdR] = useState(id)

 const credenciales = AUTH.currentUser.uid
		const removeTarea = async () => {
		await DB.collection('users').doc(credenciales).collection('tareas')
			.doc(idR.id)
			.delete()
	}
		const createTwoButtonAlert = () =>
		Alert.alert(
			"Eliminar Tarea",
			"Esta seguro que desea Eliminar esta Tarea?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress:removeTarea }
			],
			{ cancelable: false }
		);
	return(
	<View>
		<TouchableOpacity onPress={createTwoButtonAlert}>
		<FontAwesome name="remove" size={24} color="black" />
		</TouchableOpacity>
	</View>
	)
}

export default Eliminar

