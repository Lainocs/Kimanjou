import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const MapScreen = ({route}) => {
  const { roomName, roomCode } = route.params

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{roomName}</Text>
        <Text style={styles.code}>{roomCode}</Text>
      </View>
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
      customMapStyle={styles.map}>
        <Marker coordinate={{
          longitude: 2.2266284,
          latitude: 48.8928156
        }}>
        </Marker>
      </MapView>
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
    height: '100%',
  },
  codeContainer: {
    flexDirection: 'row',
    backgroundColor: '#051D34',
    width: '100%',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  code: {
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
  }
})