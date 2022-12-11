import React, { Component, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, AppRegistry, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebaseConfig from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setOrigin, setTravelTimeInformation } from '../slices/navSlice';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  let long = '';
  let lat = '';
  if (errorMsg) {
    text = errorMsg;
    console.log('error ', text)
  } else if (location) {
    text = JSON.stringify(location);
    long = location.coords.longitude
    lat = location.coords.latitude
  }

  // Zoom out when choose destination

  useEffect(() => {
    if(!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, left: 50, bottom: 50, right: 50 }
    })
  }, [origin, destination])

  // Calculate Travel time
  useEffect(() => {
    if(!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=${destination.location}
      &key=${firebaseConfig.GOOGLE_MAPS_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        console.log(data)
      })
    }

    getTravelTime();

  }, [origin, destination, firebaseConfig.GOOGLE_MAPS_API_KEY])

  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  console.log('destination ', destination)


  // const placeMark = (e) => {
  //   // if(this.state.isPlace) {
  //   //   this.setState({marker: e.nativeEvent.coordinate})
  //   //   this.setState({isPlace: false})
  //   // }
  //   this.setState({marker: e.nativeEvent.coordinate})
  // }


    return (
      <View style={styles.container}>
        <MapView
        ref={mapRef}
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
        onPress={(event) => {
          dispatch(
            setDestination({
              location: event.nativeEvent.coordinate,
              description: 'Destination'
            })
          );
          test()
        }}
        >
          {origin && destination && (
            <MapViewDirections 
              origin={origin.description}
              destination={destination.location}
              apikey={firebaseConfig.GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor='black'
            />
          )}
          <SafeAreaView style={{zIndex: 2, position: 'absolute'}}>
            <GooglePlacesAutocomplete
              placeholder="Point de départ"
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
              styles={{
                container: {
                  flex: 1,
                  zIndex: 2,
                  width: '100%'
                },
                textInput: {
                  fontSize: 18,
                  zIndex: 2
                }
              }}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description
                }))
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
          title='Origin'
          description={origin.description}
          identifier="origin"
          />
        )

        }

        {destination?.location && (
          <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title='Destination'
          description={destination.description}
          identifier="destination"
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
    height: '100%',
    zIndex: 1
  }
})