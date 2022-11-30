import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Chat = ({roomId}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        navigation.navigate('Chat', {
          roomId: roomId,
        })
			}}
    >
      <Image source={require('../../assets/chat.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

export default Chat

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#051D34',
		width: 100,
    height: 100,
		padding: 15,
		borderRadius: 50,
    justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
  image: {
    width: 50,
    height: 50,
  }
})