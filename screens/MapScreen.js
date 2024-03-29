import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import firebaseConfig from '../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { Chat } from '../components/buttons/Chat'
import {
	selectDestination,
	selectOrigin,
	selectTravelTimeInformation,
	setDestination,
	setOrigin,
	setTravelTimeInformation,
} from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'

const MapScreen = ({ route }) => {
	const { roomName, roomCode, roomId, users } = route.params
	// const [location, setLocation] = useState(null);
	// const [errorMsg, setErrorMsg] = useState(null);
	const mapRef = useRef(null)

	// Get current location
	// useEffect(() => {
	//   (async () => {

	//     let { status } = await Location.requestForegroundPermissionsAsync();
	//     if (status !== 'granted') {
	//       setErrorMsg('Permission to access location was denied');
	//       return;
	//     }

	//     let location = await Location.getCurrentPositionAsync({});
	//     setLocation(location);
	//   })();
	// }, []);

	// let text = 'Waiting..';
	// if (errorMsg) {
	//   text = errorMsg;
	//   console.log('error ', text)
	// } else if (location) {
	//   text = JSON.stringify(location);
	//   long = location.coords.longitude
	//   lat = location.coords.latitude
	// }

	// Zoom out when choose destination

	useEffect(() => {
		if (!origin || !destination) return

		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, left: 50, bottom: 50, right: 50 },
		})
	}, [origin, destination])

	// Calculate Travel time
	useEffect(() => {
		if (!origin || !destination) {
			const getTravelTime = async () => {
				fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
        origins=${origin}&destinations=${destination}
        &key=${firebaseConfig.GOOGLE_MAPS_API_KEY}`)
					.then((res) => res.json())
					.then((data) => {
						console.log('data ')
						// dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
					})
			}

			getTravelTime()
		}
	}, [origin, destination, firebaseConfig.GOOGLE_MAPS_API_KEY])

	const dispatch = useDispatch()
	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)
	const travelTimeInformation = useSelector(selectTravelTimeInformation)

	console.log('origin ', origin)
	console.log('destination ', destination)
	console.log('travelTime ', travelTimeInformation)

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
					longitudeDelta: 0.005,
				}}
				// onPress={(event) => {
				//   dispatch(
				//     setDestination({
				//       location: event.nativeEvent.coordinate,
				//       description: 'Destination'
				//     })
				//   );
				//   console.log('event ', event.nativeEvent)
				// }}
			>
				{origin && destination && (
					<MapViewDirections
						origin={origin.description}
						destination={destination.description}
						apikey={firebaseConfig.GOOGLE_MAPS_API_KEY}
						strokeWidth={3}
						strokeColor='black'
					/>
				)}
				{/* {destination?.location && (
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

        } */}
				<SafeAreaView style={{ zIndex: 2 }}>
					<GooglePlacesAutocomplete
						placeholder='Point de départ'
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={400}
						styles={{
							container: {
								flex: 1,
								zIndex: 2,
								width: '100%',
							},
							textInput: {
								fontSize: 18,
								zIndex: 2,
								width: '100%',
							},
							listContainer: {
								zIndex: 10,
								width: '100%',
							},
							list: {
								width: '100%',
								zIndex: 10,
							},
							listView: {
								flex: 1,
								position: 'absolute',
								top: 40,
								marginHorizontal: 5,
								width: '100%',
								minHeight: 160,
							},
						}}
						onPress={(data, details = null) => {
							dispatch(
								setOrigin({
									location: details.geometry.location,
									description: data.description,
								})
							)
						}}
						query={{ key: firebaseConfig.GOOGLE_MAPS_API_KEY, language: 'fr' }}
						enablePoweredByContainer={false}
						fetchDetails={true}
						returnKeyType={'search'}
					/>
				</SafeAreaView>
				{origin?.location && (
					<Marker
						coordinate={{
							latitude: origin.location.lat,
							longitude: origin.location.lng,
						}}
						title='Origin'
						description={origin.description}
						identifier='origin'
					/>
				)}

				<SafeAreaView style={{ zIndex: 2 }}>
					<GooglePlacesAutocomplete
						placeholder="Point d'arrivee"
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={400}
						styles={{
							container: {
								flex: 1,
								zIndex: 2,
								width: '100%',
							},
							textInput: {
								fontSize: 18,
								zIndex: 2,
								width: '100%',
								marginTop: 100,
							},
							listContainer: {
								zIndex: 10,
								width: '100%',
							},
							list: {
								width: '100%',
								zIndex: 10,
							},
							listView: {
								flex: 1,
								position: 'absolute',
								top: 40,
								marginHorizontal: 5,
								width: '100%',
								minHeight: 160,
							},
						}}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							)
						}}
						query={{ key: firebaseConfig.GOOGLE_MAPS_API_KEY, language: 'fr' }}
						enablePoweredByContainer={false}
						fetchDetails={true}
						returnKeyType={'search'}
					/>
				</SafeAreaView>
				{destination?.location && (
					<Marker
						coordinate={{
							latitude: destination.location.lat,
							longitude: destination.location.lng,
						}}
						title='Destination'
						description={destination.description}
						identifier='destination'
					/>
				)}
			</MapView>
			<Chat roomId={roomId} users={users} />
		</View>
	)
}

export default MapScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
		zIndex: 1,
	},
})
