import { StyleSheet, Text, View } from 'react-native'
import { React } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './components/buttons/Profile'
import { io } from 'socket.io-client'

const socket = io('http://172.20.10.4:3000')
global.socket = socket
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator()

import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import NewRoomScreen from './screens/NewRoomScreen'
import MapScreen from './screens/MapScreen'
import ChatScreen from './screens/ChatScreen'
import UsersScreen from './screens/UsersScreen'
import { store } from './store'

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					{/* Auth */}
					<Stack.Screen
						options={{ headerShown: false }}
						name='Login'
						component={LoginScreen}
					/>

					{/* Home */}
					<Stack.Screen
						options={{
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
							headerRight: () => <Profile />,
							headerBackVisible: false,
						}}
						name='Home'
						component={HomeScreen}
					/>

					{/* Profile */}
					<Stack.Screen
						options={{
							headerBackTitle: 'Rooms',
						}}
						name='Profile'
						component={ProfileScreen}
					/>

					{/* NewRoom */}
					<Stack.Screen
						options={{
							headerBackTitle: 'Rooms',
						}}
						name='NewRoom'
						component={NewRoomScreen}
					/>

					{/* Map */}
					<Stack.Screen
						options={{
							headerBackTitle: 'Home',
						}}
						name={'Map'}
						component={MapScreen}
					/>

					{/* Chat */}
					<Stack.Screen
						options={{
							headerBackTitle: 'Map',
						}}
						name={'Chat'}
						component={ChatScreen}
					/>

					{/* Users */}
					<Stack.Screen
						options={{
							headerBackTitle: 'Chat',
						}}
						name={'Users'}
						component={UsersScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
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
