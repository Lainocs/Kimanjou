import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import Logout from '../components/buttons/Logout'

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Email: {auth.currentUser?.email}</Text>
			<Logout />
		</View>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
