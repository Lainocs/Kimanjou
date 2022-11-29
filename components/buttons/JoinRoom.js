import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const JoinRoom = () => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => {}}
    >
      <Text style={styles.buttonText}>Join</Text>
    </TouchableOpacity>
  )
}

export default JoinRoom

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E1E1E1',
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