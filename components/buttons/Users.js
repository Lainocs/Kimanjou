import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Users = ({users}) => {
  const navigation = useNavigation()

	const handleUsers = () => {
		navigation.navigate('Users', {
      users: users
    })
	}
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleUsers}
    >
      <Text style={styles.buttonText}>{users.length} {users.length > 1 ? 'Users' : 'User'}</Text>
    </TouchableOpacity>
  )
}

export default Users

const styles = StyleSheet.create({
	button: {
		paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
    textDecorationLine: 'underline',
	},

})