import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import Button from '../Components/Button';
import RoundButton from '../Components/RoundButton';
import Parse from 'parse/react-native';

const RestorePassword = ({navigation}) => {

    const [mail,setMail] = useState()

    const doUserPasswordReset = async function () {
        // Note that this value come from state variables linked to your text input
        const emailValue = mail;
        return await Parse.User.requestPasswordReset(emailValue)
            .then(() => {
            // logIn returns the corresponding ParseUser object
            navigation.navigate('Login')
            Alert.alert(
                'Exito!',
                `Revise su correo ${mail} para proceder con el reinicio de su contraseña.`,
            );
            return true;
        })
        .catch((error) => {
            // Error can be caused by lack of Internet connection
            Alert.alert('Error!', error.message);
            return false;
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                    style={styles.return}
                    onPress={()=>{
                        navigation.navigate('Login')
                }}>
                    <IconIonicons name='arrow-back' size={30}/>
            </TouchableOpacity>
            <View style={styles.form}>
                <Text style={styles.text}>Reiniciar Contraseña</Text>
                <Text style={styles.label}> Correo </Text>
                <View style={styles.inputs}>
                    <IconFontisto 
                        name='email' 
                        size={30}
                        style={styles.icons}
                    />
                    <View style={styles.InputBox}>
                        <TextInput
                            placeholder='correo' 
                            textAlign='left'
                            value={mail}
                            autoCapitalize='none'
                            onChangeText={(val)=>setMail(val)}
                        />            
                    </View>
                </View>
            </View>
            <Button 
                text="Cambiar Contraseña"
                onPress={() => doUserPasswordReset()}
            />
            <RoundButton
                text="Cancelar"
                onPress={()=>{navigation.navigate('Login')}}
            />
        </SafeAreaView>
    );
}

export default RestorePassword;
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor: '#F3F5DC',
        flex:1,
    },
    return:{
        borderRadius:50,
        borderWidth:1,
        borderColor:'#188209',
        marginLeft:-275,
        marginTop:30
    },
    form:{
        marginTop:'15%',
        justifyContent:'center',
        alignItems:'center',  
    },
    text:{
        fontSize:20,
        color:'#188209',
        marginBottom:40,
    },
    InputBox:{
        backgroundColor:'#E0DEDE',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        borderColor:'#188209',
        height:40,
        borderRadius:5,
        margin:10,        
        borderWidth:1,
        width:300,
        marginBottom:10,
    },
    inputs:{
        marginTop:15,
        flexDirection:'row',
        color:'#188209'
    },
    icons:{
        alignItems:'center', 
        justifyContent:'center',
        paddingTop:15
    },
    label:{
        marginRight:'55%',
    },
})