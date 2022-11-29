import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Room = ({name}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.button}
      onPress={() => {}}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Room

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'start',
  },

  button: {
    backgroundColor: '#051D34',
    width: '100%',
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