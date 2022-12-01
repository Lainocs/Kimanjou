import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UsersScreen = ({route}) => {
  const {users} = route.params
  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <Text key={index} style={styles.user}>{user}</Text>
      ))}
    </View>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  user: {
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
})