import React, { useState }  from 'react';
import { Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'


const TopBar = () => {
    return (
        <View style={styles.box}>
            <View style={styles.box1}>
                <Text style={styles.text}>
                    Inventariarte
                </Text>
            </View>
                <TouchableOpacity>
                    <IconIonicons 
                        name='notifications-outline'
                        size={30}
                        color='#FFFFFF'
                    />  
                </TouchableOpacity>
        </View>
    );
}

export default TopBar;

const styles = StyleSheet.create({
    box:{
        backgroundColor:'#188209',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        height:60,
        margin:10,
        width:'100%',
        justifyContent:'space-evenly'
    },
    text:{
        color:'#FFFFFF',
        fontSize:20
    },
    box1:{
        flex:2
    },
    box2:{
        flexDirection:'row',
        alignItems:'center',
    },
})