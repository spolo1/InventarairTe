import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text,StyleSheet, TouchableOpacity, Image,View,Alert} from 'react-native'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import Button from '../Components/Button';
import Parse from 'parse/react-native';
import BlankButton from '../Components/BlankButton';
import { Avatar } from 'react-native-elements';

const Profile= ({navigation}) => {
    const [username, setUsername] = useState('');
    useEffect(()=>{
        async function getCurrentUser(){
            if(username===''){
                const currentUser = await Parse.User.currentAsync();
                if(currentUser !== null){
                    setUsername(currentUser.getUsername());
                }
            }
        }
        getCurrentUser();
    },[username]);
    const doUserLogOut = async function () {
        return await Parse.User.logOut()
        .then(async ()=>{
            const currentUser = await Parse.User.currentAsync();
            if(currentUser === null) {
                navigation.navigate('Login')
            }
            return true;
        })
        .catch((error)=>{
            Alert.alert('Error!',error.message);
            return false;
        })
    }
    return(
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity 
                    style={styles.return}
                    onPress={()=>{
                        navigation.navigate('ProdList')
                }}>
                    <IconIonicons name='arrow-back' size={30}/>
            </TouchableOpacity>
            {username !== '' && <Text style={styles.nombre}>{`${username}`}</Text>}
            <Avatar
                style={styles.image}
                rounded
                source={require('../Images/3.png')}
            />
            <View style={styles.lay1}>
                <BlankButton
                    text="Historial de productos"
                    onPress={()=>{
                        navigation.navigate('History')
                    }}
                />
                <View style={styles.line}/>
                <BlankButton
                    text="Agregar productos"
                    onPress={()=>{
                        navigation.navigate('CreateProd')
                    }}
                />
                <View style={styles.line}/>
                <BlankButton
                    text="Estadisticas de consumo"
                    onPress={()=>{
                        navigation.navigate('Stats')
                    }}
                />
            </View>
            <View style={styles.lay2}>
                <Button 
                text="Cerrar Sesión"
                onPress={() => doUserLogOut()}
                />  
            </View>
        </SafeAreaView>
    )
}
export default Profile
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
    nombre:{
        fontSize:30,
        color:'#188209'
    },
    line:{
        borderWidth:1,
        borderColor:'#E0DEDE',
        width:320
    },
    lay1:{
        marginTop:'15%',
        flex:2
    },
    lay2:{
        flex:1
    },
    image:{
        margin:25,
        width: 120, 
        height: 120, 
    },
    })