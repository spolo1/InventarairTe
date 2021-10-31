import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Checkbox } from 'react-native-paper';

const UniqueProduct = (props) => {
    const [checked,setCheked] = useState(false);
    const {text,date} = props

    const borrar=()=>{

    }
    return(
            <View style={styles.container}>
                <View>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setCheked(!checked);
                    }}
                    color='green'
                />
                </View>
                <View style={styles.content}>    
                    <Text style = {styles.text}>{text}</Text>
                    <Text>{date}</Text>
                </View>
                <View style={styles.trash}>
                    <TouchableOpacity onPress={()=>borrar()}>
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
        backgroundColor: '#EA8D8D',
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