import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import React from 'react'
import { auth, db } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import { ref, set } from 'firebase/database'

const NewRoomScreen = () => {
	const navigation = useNavigation()

	const [roomName, setRoomName] = React.useState('')

  const uuid = () => {
    let random = Math.floor((1 + Math.random()) * 0x1000000)
        .toString(16)
        .substring(1);
    return random
}

	const handleCreateRoom = () => {
    let id = uuid()
    set(ref(db, 'rooms/' + id), {
      id: id,
      name: roomName,
      creator: auth.currentUser.uid
    }).then(() => {
      navigation.replace('Home')
    }).catch((error) => {
      console.log(error)
    })
	}

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text style={styles.logo}>New Room</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Room's name"
					value={roomName}
					onChangeText={(text) => setRoomName(text)}
					style={styles.input}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleCreateRoom}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Create Room</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
}

export default NewRoomScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 50,
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: '#2C6BED',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
})
