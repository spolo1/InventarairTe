import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'

const UniqueProduct = (props) => {
    const {text,date,erase, } = props

    return(
            <View style={styles.container}>
                <View>
                </View>
                <View style={styles.content}>    
                    <Text style = {styles.text}>{text}</Text>
                    <Text>{date}</Text>
                </View>
                <View style={styles.trash}>
                    <TouchableOpacity onPress={erase}>
                        <IconIonicons 
                            name='trash-outline'
                            size={30}
                            color='#188209'
                        /> 
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default UniqueProduct;
const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        height:60,
        backgroundColor: '#9ADB91',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:'85%',
        marginLeft:'5.5%',
        marginBottom:'5%',
    },
    content:{
        flexDirection:'column',
        justifyContent: 'space-around',
        flex:4,
        marginLeft:'3%',
    },
    trash:{
        flex:1,
    },
    text:{
        fontSize:18,
        fontWeight:'bold'
    }

})