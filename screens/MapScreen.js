import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView 
      provider={PROVIDER_GOOGLE}
      mapType='standard'
      style={styles.map}
      initialRegion={{
        latitude: 48.8928156,
        longitude: 2.2266284,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }}
      customMapStyle={styles.map} />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
})