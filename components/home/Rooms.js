import { ScrollView, StyleSheet, Text, View } from 'react-native'
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

        // get users who are in the room
        const q = query(collection(db, 'rooms_users'), where('roomId', '==', room.id))
        const querySnapshot = await getDocs(q)
        const users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data().userId)
        })
        room.users = users

        setRooms((prevRooms) => [...prevRooms, room])
      }
    })
	}

  useEffect(() => {
    getUserRooms()
  }, [])

	return (
		<View style={styles.container}>
			<Text>Rooms</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} alignItems='center'>
        {rooms.map((room) => (
          <Room key={room.id} name={room.name} nbUsers={room.users.length} />
        ))}
      </ScrollView>
		</View>
	)
}

export default Rooms

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
    width: '100%',
    alignItems: 'center',
	},
  scroll: {
    width: '100%',
  },
})
