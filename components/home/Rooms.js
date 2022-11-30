import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../../firebase'
import Room from '../buttons/Room'

const Rooms = ({rooms}) => {

	return (
		<View style={styles.container}>
			<Text>Rooms</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} alignItems='center'>
        {rooms.map((room) => (
          <Room key={room.id} id={room.id} name={room.name} nbUsers={room.users.length} code={room.code} />
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
    height: '80%',
  },
})
