import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Messages from '../components/chat/Messages'
import Users from '../components/buttons/Users'
import {
	addDoc,
	collection,
	query,
	serverTimestamp,
	where,
	getDocs,
	getDoc,
	doc,
} from 'firebase/firestore'
import { auth, db } from '../firebase'

const ChatScreen = ({ route }) => {
	const { roomId, users } = route.params

	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	const handleSendMessage = async () => {
		let timestamp = serverTimestamp()
		try {
			if(message.length > 0) {
				await addDoc(collection(db, 'rooms_messages'), {
					roomId: roomId,
					userEmail: auth.currentUser.email,
					message: message,
					timestamp: timestamp,
				})
				global.socket.emit('message', {
					roomId: roomId,
					userEmail: auth.currentUser.email,
					message: message,
					timestamp: timestamp,
				})
				setMessage('')
				handleGetMessages()
			} else {
				alert('Please enter a message')
			}
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}

	const handleGetMessages = async () => {
		let q = query(
			collection(db, 'rooms_messages'),
			where('roomId', '==', roomId)
		)
		const querySnapshot = await getDocs(q)
		const messages = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		messages.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)

		setMessages(messages)
	}

	useEffect(() => {
		global.socket.on('message', (data) => {
			setMessages((prev) => [...prev, data])
			handleGetMessages()
		})
		handleGetMessages()
	}, [])

	return (
		<View style={styles.container}>
			<Users users={users} />
			<Messages messages={messages} />
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Message...'
					name='message'
					value={message}
					onChangeText={(text) => setMessage(text)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={handleSendMessage}
				>
					<Text style={styles.buttonText}>Send</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ChatScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '100%',

	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingBottom: 50,
		paddingTop: 20,
	},

	input: {
		backgroundColor: '#E1E1E1',
		padding: 15,
		width: '70%',
		borderRadius: 10,
	},
	button: {
		backgroundColor: '#2C6BED',
		width: '20%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
	},
})
