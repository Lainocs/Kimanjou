import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, View, Text, AppRegistry, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import firebaseConfig from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';

export default function MapScreen() {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     marker: { latitude: 48.8928156, longitude: 2.2266284 },
  //     randomLong: null,
  //     randomLat: null,
  //     isPlace: true,
  //     restau: {
  //       title: 'La spaghettoni de Papa',
  //       coord: {
  //         longitude: 2.2277606651186947,
  //         latitude: 48.89122385510402,
  //       }
  //     }
  //   }
  // }

  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  // placeMark = (e) => {
  //   // if(this.state.isPlace) {
  //   //   this.setState({marker: e.nativeEvent.coordinate})
  //   //   this.setState({isPlace: false})
  //   // }
  //   this.setState({marker: e.nativeEvent.coordinate})
  // }


    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType='mutedStandard'
        userInterfaceStyle='dark'
        showsUserLocation={true}
        userLocationPriority='high'
        initialRegion={{
          latitude: 48.8928156,
          longitude: 2.2266284,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        //onPress={this.placeMark}
        // onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate )}
        >
          <SafeAreaView>
            <GooglePlacesAutocomplete
              placeholder="Type a place"
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
              styles={{
                container: {
                  flex: 0
                },
                textInput: {
                  fontSize: 18
                }
              }}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description
                }))

                dispatch(setDestination(null))
              }}
              query={{key: firebaseConfig.GOOGLE_MAPS_API_KEY,
              language: 'fr' }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              returnKeyType={"search"}
              // onFail={error => console.log('errur ', error)}
              // onNotFound={() => console.log('no results')}
              // listEmptyComponent={() => (
              //   <View style={{flex: 1}}>
              //     <Text>No results were found</Text>
              //   </View>
              // )}
            />
        </SafeAreaView>
        {origin?.location && (
          <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          />
        )

        }
          {/* {
            this.state.marker &&
            <Marker draggable={true} onDragEnd={(e) => {console.log('dragEnd ', e.nativeEvent.coordinate)}} coordinate={this.state.marker} />
          }
          <Marker image={require('../assets/restaurant.png')} title={this.state.restau.title} coordinate={this.state.restau.coord}>
          </Marker> */}
        </MapView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  }
})