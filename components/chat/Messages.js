import { ScrollView, StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import { React, createRef, useEffect } from 'react'
import { auth } from '../../firebase'
import { StatusBar } from 'expo-status-bar'

const Messages = ({ messages }) => {
	return (
      <FlatList
			data={messages}
			style={styles.container}
      inverted
			renderItem={({ item }) => (
				<View
					style={[
						styles.message,
						{
							alignSelf:
								item.userId === auth.currentUser.uid
									? 'flex-end'
									: 'flex-start',
						},
					]}
				>
					<Text style={styles.messageText}>{item.userId}</Text>
					<Text style={styles.messageText}>{item.message}</Text>
				</View>
			)}
			keyExtractor={(item) => item.id}
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
  // safeContainer: {
  //   flex: 1,
  //   marginTop: StatusBar.current
  // },
	message: {
		backgroundColor: '#E1E1E1',
		width: '60%',
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
