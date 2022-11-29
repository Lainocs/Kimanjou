import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NewRoom = () => {
  const navigation = useNavigation()

  const handleNewRoom = () => {
		navigation.navigate('NewRoom')
  }

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleNewRoom}
    >
      <Text style={styles.buttonText}>New</Text>
    </TouchableOpacity>
  )
}

export default NewRoom

const styles = StyleSheet.create({
  button: {
		backgroundColor: '#2C6BED',
		width: '30%',
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