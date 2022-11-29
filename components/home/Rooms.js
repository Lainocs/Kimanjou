import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import Room from '../buttons/Room'

const Rooms = () => {

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
        setRooms((prev) => [...prev, room])
      }
    })
	}

  useEffect(() => {
    getUserRooms()
  }, [])

	return (
		<View style={styles.container}>
			<Text>Rooms</Text>
      {rooms.map((room) => (
        <Room key={room.id} name={room.name} />
      ))}
		</View>
	)
}

export default Rooms

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
	},
})
