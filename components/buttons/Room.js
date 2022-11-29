import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Room = ({ id, name, nbUsers }) => {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate('Map', { roomId: id })
				}}
			>
				<Text style={styles.buttonText}>{name}</Text>
				<View style={styles.nbUsers}>
					<Image
						source={require('../../assets/user.png')}
						style={styles.image}
					/>
					<Text style={styles.buttonText}> {nbUsers}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default Room

const styles = StyleSheet.create({
	container: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'start',
	},

	button: {
		backgroundColor: '#051D34',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 40,
	},

	nbUsers: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
	},

	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	image: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
})
