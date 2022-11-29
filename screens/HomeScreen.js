import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoomManage from '../components/home/RoomManage'
import Rooms from '../components/home/Rooms'

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<RoomManage />
			<Rooms />
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
})
