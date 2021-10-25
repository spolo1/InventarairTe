import React from 'react';
import {View, Text} from 'react-native'
import Button from '../Components/Button';

const Login = ({navigation}) => {
    return (
        <Button
            text="Ir al registro"
            onPress={()=>{navigation.navigate('Register')}}
        />
    )
}

export default Login