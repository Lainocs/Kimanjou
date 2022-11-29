// import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
// import React from 'react'
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

// const MapScreen = () => {
//   return (
//     <View style={styles.container}>
//       <MapView 
//       provider={PROVIDER_GOOGLE}
//       mapType='standard'
//       style={styles.map}
//       initialRegion={{
//         latitude: 48.8928156,
//         longitude: 2.2266284,
//         latitudeDelta: 0.003,
//         longitudeDelta: 0.003
//       }}
//       customMapStyle={styles.map}>
//         <Marker coordinate={{
//           longitude: 2.2266284,
//           latitude: 48.8928156
//         }}>
//         </Marker>
//       </MapView>
//     </View>
//   )
// }

// export default MapScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '100%'
//   }
// })

import React, { Component } from 'react'
import { StyleSheet, View, Text, AppRegistry } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class MapScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          cost: `$${getRandomInt(50, 300)}`
        }
      ]
    })
  }

  render() {
    return (
      <MapView style={styles.container}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 48.8928156,
        longitude: 2.2266284,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }}
      onPress={this.handlePress}
      >
        {this.state.markers.map((marker) => {
          return <Marker {...marker} />
        })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})