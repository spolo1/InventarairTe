import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import CreateProd from '../Screens/CreateProd';
import ScanCode from '../Screens/ScanCode';
import Profile from '../Screens/Profile';
import ProdList from '../Screens/ProdList';
import Stats from '../Screens/Stats';
import History from '../Screens/History';
import RestorePassword from '../Screens/RestorePassword';
import SearchProduct from '../Screens/SearchProduct';

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
                <Stack.Screen
                    name ='CreateProd'
                    component = {CreateProd}
                />
                <Stack.Screen
                    name='ProdList'
                    component={ProdList}
                />
                <Stack.Screen
                    name='ScanCode'
                    component={ScanCode}
                />
                <Stack.Screen
                    name='Stats'
                    component={Stats}
                />
                <Stack.Screen
                    name='History'
                    component={History}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                />
                <Stack.Screen 
                    name='RestorePassword'
                    component={RestorePassword}
                />
                <Stack.Screen
                    name="SearchProduct"
                    component = {SearchProduct}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes