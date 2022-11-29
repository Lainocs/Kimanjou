import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './components/buttons/Profile'

const Stack = createNativeStackNavigator()

import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import NewRoomScreen from './screens/Rooms/NewRoomScreen'

export default function App() {
	return (
    <NavigationContainer>
      <Stack.Navigator>
				{/* Auth */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />

				{/* Home */}
        <Stack.Screen options={{
					headerStyle: {
						backgroundColor: '#2C6BED',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontSize: 30,
						fontWeight: 'bold',
					},
					headerTitle: 'Kimanjou',
					// add to the header a logout button
					headerRight: () => (
						<Profile />
					),
					headerBackVisible: false
				}} name="Home" component={HomeScreen} />

				{/* Profile */}
				<Stack.Screen options={{
				headerBackTitle: 'Rooms',
				}} name="Profile" component={ProfileScreen} />

				{/* NewRoom */}
				<Stack.Screen options={{
					headerBackTitle: 'Rooms',
				}} name="NewRoom" component={NewRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
