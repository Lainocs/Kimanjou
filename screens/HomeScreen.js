import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native'
import RoomManage from '../components/home/RoomManage'
import Rooms from '../components/home/Rooms'
import { React, useState, useEffect } from 'react'
import { doc, getDoc, getDocs, collection, query, where, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
	const navigation = useNavigation()
	
	let [modalVisible, setModalVisible] = useState(false)
	let [roomCode, setRoomCode] = useState('')

	const [rooms, setRooms] = useState([])

	const getUserRooms = async () => {
    const q = query(collection(db, 'rooms_users'), where('userId', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q)
    const roomIds = []
    querySnapshot.forEach((doc) => {
      roomIds.push(doc.data().roomId)
    })

    roomIds.forEach(async (roomId) => {
      const docRef = doc(db, 'rooms', roomId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const room = docSnap.data()
        room.id = docSnap.id

        // get users who are in the room
        const q = query(collection(db, 'rooms_users'), where('roomId', '==', room.id))
        const querySnapshot = await getDocs(q)
        const users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data().userId)
        })
        room.users = users

				setRooms((rooms) => {
					// sort rooms by name
					const newRooms = [...rooms, room]
					newRooms.sort((a, b) => {
						if (a.name < b.name) {
							return -1
						} else if (a.name > b.name) {
							return 1
						} else {
							return 0
						}
					})
					return newRooms
				})
      }
    })
	}

	const displayModal = () => {
		setModalVisible(true)
	}

	const handleJoinRoom = async () => {
		const q = query(collection(db, 'rooms'), where('code', '==', roomCode))
		const querySnapshot = await getDocs(q)
		if(!querySnapshot.empty) {
			querySnapshot.forEach((doc) => {
				// if user is not already in the room
				const q2 = query(collection(db, 'rooms_users'), where('roomId', '==', doc.id), where('userId', '==', auth.currentUser.uid))
				getDocs(q2).then((querySnapshot2) => {
					if(querySnapshot2.empty) {
						addDoc(collection(db, 'rooms_users'), {
							roomId: doc.id,
							userId: auth.currentUser.uid,
						})
						setModalVisible(false)
						setRoomCode('')
						navigation.navigate('Map', {roomName: doc.data().name, roomCode: doc.data().code})
						setRooms([])
						getUserRooms()
					} else {
						alert('You are already in this room')
					}
				})
			})
		} else {
			alert('Room does not exist')
		}
	}
  useEffect(() => {
    getUserRooms()
  }, [])

	return (
		<View style={styles.container}>
			<RoomManage displayModal={displayModal} />

			<Modal
				transparent={true}
				visible={modalVisible}
			>
				<View 
					style={styles.modal}
				>
					<Text style={styles.text}>Entrer le code:</Text>
					<TextInput style={styles.input} value={roomCode} onChangeText={setRoomCode} />
					<View style={styles.buttons}>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => {
								setModalVisible(false)
								setRoomCode('')
							}}
						>
							<Text style={styles.buttonText}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.button}
							onPress={handleJoinRoom}
						>
							<Text style={styles.buttonText}>Rejoindre</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Rooms rooms={rooms} />
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
	modal: {
		backgroundColor: 'white',
		width: '80%',
		height: '30%',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: '50%',
		borderRadius: 10,
		padding: 20,
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 20,
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		padding: 10,
		marginTop: 20,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 20,
	},

	button: {
		textAlign: 'center',
		backgroundColor: '#f9c2ff',
		width: '40%',
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
