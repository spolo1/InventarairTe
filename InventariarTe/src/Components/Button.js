import React from 'react';
import {Text,StyleSheet, TouchableOpacity } from 'react-native';

const Button = (props) => {
    const {text,onPress} = props
    return (
        <TouchableOpacity 
            style = {styles.buttonContainer}
            onPress = {onPress}
        > 
            <Text style = {styles.text}>{text}</Text>    
        </TouchableOpacity>
    )
}
export default Button;

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'#188209',
        marginBottom:10,
        width:330,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        marginTop:10,
    },
    text:{
        textAlign:'center',
        color:'#FFFFFF',
    },
})