import React, {FC, ReactElement, useState} from 'react';
import {StatusBar,Text, SafeAreaView, Image,ScrollView, StyleSheet,View, TouchableOpacity,TextInput,Alert} from 'react-native';
import Button from '../Components/Button'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Parse from 'parse/react-native';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text,setText] = useState('');
    const doUserLogIn = async function () {
        const usernameValue = username;
        const passwordValue = password;
        return await Parse.User.logIn(usernameValue, passwordValue)
        .then(async (loggedInUser) => {
            const currentUser = await Parse.User.currentAsync();
            console.log(loggedInUser === currentUser);
            submitAndClear();
        })
        .catch((error) => {
            Alert.alert('Error!', error.message);
        });
    };

    const submitAndClear = () => {
        let clear = '';
        setUsername (clear);
        setPassword(clear);
        navigation.navigate('ProdList');
    }
return (
    <SafeAreaView style = {styles.container}>
        <StatusBar
            backgroundColor= '#323F3A'
        />
        <Image 
            style={{ 
                marginTop:100,
                width: 157, 
                height: 162, 
                marginBottom: 30,
                alignItems:'center',
            }}
                source={require('../Images/logo.png')}
        />
        
        <ScrollView>
            <View style={styles.form}>
                <Text style = {styles.title}>
                    Iniciar Sesión
                </Text>   
                <Text style = {styles.header2}>Nombre de Usuario</Text>
                <View style={styles.inputs}>
                    <IconAntDesign 
                        name='user' 
                        size={30}
                        style={styles.icons}
                        />
                        <View style={styles.InputBox}>
                            <TextInput
                                value={username}
                                placeholder={'Username'}
                                onChangeText={(text) => setUsername(text)}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                clearButtonMode='always'
                            />            
                        </View>
                </View>
                <Text style = {styles.header1}>Contraseña</Text>
                <View style={styles.inputs}>
                    <IconAntDesign 
                        name='lock' 
                        size={30}
                        style={styles.icons}
                        />
                    <View style={styles.InputBox}>
                        <TextInput
                            value={password}
                            placeholder={'Password'}
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                            clearButtonMode='always'
                        />            
                    </View>
                </View>
                <Button 
                    text="Iniciar Sesión"
                    onPress={() => doUserLogIn()}
                />
                <View style={styles.registro}>
                            <Text>¿No tienes cuenta?</Text>
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate('Register')}}>
                                <Text style={styles.text}> Registrarse</Text>
                            </TouchableOpacity>
                </View>
                <View style={styles.registro}>
                            <Text>¿Olvidastes Tu contraseña?</Text>
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate('RestorePassword')}}>
                                <Text style={styles.text}> Recuperar</Text>
                            </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    
);
};
export default Login;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor: '#F3F5DC',
        flex:1,
    },
    title:{
        fontSize:20,
        marginBottom:30,
    },
    registro:{
        marginTop:15,
        flexDirection:'row',
    },
    text:{
        color:'#188209'
    },
    inputs:{
        flexDirection:'row',
    },
    icons:{
        alignItems:'center', 
        justifyContent:'center',
        paddingTop:15
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
    form:{
        justifyContent:'center',
        alignItems:'center',  
    },
    header1:{
        marginRight:'45%'
    },
    header2:{
        marginRight:'35%'
    },
})