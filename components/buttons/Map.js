import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Map = () => {
    const navigation = useNavigation();

    const handleMap = () => {
        navigation.navigate('Map')
    }

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleMap}
    >
      <Text style={styles.buttonText}>Map</Text>
    </TouchableOpacity>
  )
}

export default Map

const styles = StyleSheet.create({
    button: {
		paddingVertical: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: '#000',
		fontWeight: '700',
		fontSize: 16,
	},
})