import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/buttons/Map'

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Oui</Text>
			<Map />
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
})
