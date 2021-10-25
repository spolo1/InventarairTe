import React from 'react';
import {View, Text} from 'react-native'
import Button from '../Components/Button';

const Login = ({navigation}) =>{
    return (
        <View>
            <Button
                text="Ir al Login"
                onPress={()=>{navigation.navigate('Login')}}
                />
        </View>
    )
}

export default Login
