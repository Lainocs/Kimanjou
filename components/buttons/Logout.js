import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'

const Logout = () => {
  const navigation = useNavigation()

	const handleSignOut = () => {
		auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => alert(error.message))
	}
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleSignOut}
    >
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  )
}

export default Logout

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#f9c2ff',
		width: '60%',
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