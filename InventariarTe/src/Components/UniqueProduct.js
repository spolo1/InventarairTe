import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const erase =() => {
        
        }
        return (
        <View style={styles.box}
            flexDirection="row"
        >
            <View style={styles.checked}>

            </View>
            <View style={styles.cont}>
                <Text style = {styles.title}> Product </Text>
                <Text style = {styles.date}>Due Date</Text>
            </View>
            <View style={styles.trash}>
                <TouchableOpacity onPress={erase()}>
                    <Feather
                        name='x'
                        size={30}
                        color='white'/>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

export default Product;

const styles = StyleSheet.create({
    box:{
        borderWidth:1,
        borderRadius:5,
        backgroundColor: '#CCDB6D',
        width:350,
        height:50,
    },
    checked:{
        borderWidth:1,
        borderColor:'white',
        width:20,
        flex:1
    },
    cont:{
        flex:6,
        justifyContent: 'space-around'
    },
    trash:{
        flex:1,
        marginTop:'2.5%'
    },
    title:{
        fontSize:20,
        marginLeft:'5%',
        fontWeight:'bold'
    },
    date:{
        fontSize:15,
        marginLeft:'10%',
    }
})