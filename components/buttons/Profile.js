import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Profile = () => {
  const navigation = useNavigation()

	const handleProfile = () => {
		navigation.navigate('Profile')
	}
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleProfile}
    >
      <Text style={styles.buttonText}>Profile</Text>
    </TouchableOpacity>
  )
}

export default Profile

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
})