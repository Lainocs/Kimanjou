import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation()

	const handleSignOut = () => {
		auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => alert(error.message))
	}

	return (
		<View style={styles.container}>
			<Text>Email: {auth.currentUser?.email}</Text>
			<TouchableOpacity 
        style={styles.button}
        onPress={handleSignOut}
      >
				<Text style={styles.buttonText}>Logout</Text>
			</TouchableOpacity>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#f9c2ff',
		width: '60%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 40,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
})
