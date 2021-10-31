import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
const UniqueProduct = (props) => {

    return(
            <View style={styles.container}>
                <View>
                    <Text>CheckBox</Text>
                </View>
                <View style={styles.content}>    
                    <Text>Prodcuto</Text>
                    <Text>DueDate</Text>
                </View>
                <View style={styles.trash}>
                    <IconIonicons 
                        name='notifications-outline'
                        size={30}
                        color='#FFFFFF'
                    /> 
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
        width:'80%',
    },
    content:{
        flexDirection:'column',
        justifyContent: 'space-around',
        flex:4,
    },
    trash:{
        flex:1,
    },
})