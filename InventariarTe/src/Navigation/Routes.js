import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register'

const Stack = createNativeStackNavigator();

const Routes =()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerShown:false
                }}
            >
                <Stack.Screen 
                    name = "Login"
                    component = {Login}
                />
                <Stack.Screen
                    name = "Register"
                    component = {Register}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes