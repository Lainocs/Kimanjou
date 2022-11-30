import { ScrollView, StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import { React, createRef, useEffect } from 'react'
import { auth } from '../../firebase'
import { StatusBar } from 'expo-status-bar'

const Messages = ({ messages }) => {
	return (
      <FlatList
			data={messages}
      inverted
      style={styles.container}
			renderItem={({ item }) => (
				<View
					style={[
						styles.message,
						{
							alignItems:
								item.userEmail === auth.currentUser.email
									? 'flex-end'
									: 'flex-start',
						},
					]}
				>
          <Text style={styles.messageUser}>{item.userEmail}</Text>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
				</View>
			)}
			keyExtractor={(item) => item.id}r
		/>
	)
}

export default Messages

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: 'black',
		padding: 10,
		height: '100%',
	},
  message: {
    margin: 10,
  },

  messageUser: {
    color: 'white',
    fontWeight: '700',
    marginRight: 5,
  },
	messageBox: {
		backgroundColor: '#E1E1E1',
		maxWidth: '70%',
		padding: 15,
		borderRadius: 10,
		marginTop: 5,
    marginBottom: 20,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
})
