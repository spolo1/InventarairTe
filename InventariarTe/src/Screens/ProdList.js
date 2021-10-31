import React,{useState}from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import TopBar from '../Components/TopBar'
import BottomBar from '../Components/BottomBar'
import Parse from 'parse/react-native';
import Product from '../Components/UniqueProduct';


const CreateProd = ({navigation}) => {  

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <TopBar/>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Lista de productos</Text>
                <Product/>
            </View>
            <View style={styles.bot}>
            <BottomBar
                pr2={()=>{navigation.navigate('CreateProd')}}
                pr3={()=>{navigation.navigate('ScanCode')}}
                pr4={()=>{navigation.navigate('Profile')}}
            />
        </View>
        </View>
    );
}

export default CreateProd;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor: '#F3F5DC',
        flex:1,
    },
    bot:{
        justifyContent:'flex-end',
        flex:1,
        backgroundColor: '#188209'
    },
    top:{
        justifyContent:'flex-start',
        flex:1,
        backgroundColor: '#188209'
    },
    content:{
        flex:10,
        alignItems:'center',
    },
    text:{
        marginTop:'10%',
        fontSize:20,
        color:'#188209'
    },
})