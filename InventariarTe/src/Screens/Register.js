import React, {useState } from "react";
import {SafeAreaView,StyleSheet, TouchableOpacity,Text,View, TextInput,ScrollView, Alert} from 'react-native';
import Button from '../Components/Button'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Parse from "parse/react-native";

const Register = ({navigation}) => {
    const [usernme, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [correo,setCorreo]=useState('');

    const doUserRegistration = async function () {
    const user = new Parse.User();
    user.set("username",usernme)
    user.set("password",password);
    user.set("email",correo);
    try{
        await user.signUp();
        navigation.navigate("Login")
    }
    catch(error){
        Alert.alert("Error!", error.message);
    }
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
        <Text style={styles.text}>Registrarse</Text>
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.header1}>Nombre de Usuario</Text>
                <View style={styles.inputs}>
                    <IconAntDesign 
                        name='user' 
                        size={30}
                        style={styles.icons}
                    />
                <View style={styles.InputBox}>
                    <TextInput
                        value={usernme}
                        placeholder={"Nombre de Usuario"}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize={"none"}
                    />
                </View>
            </View>
            <Text style={styles.header3}>Correo</Text>
            <View style={styles.inputs}>
            <IconFontisto 
                name='email' 
                size={30}
                style={styles.icons}/>
                <View style={styles.InputBox}>
                    <TextInput
                        placeholder='correo' 
                        textAlign='left'
                        value={correo}
                        autoCapitalize='none'
                        onChangeText={(val)=>setCorreo(val)}
                />            
                </View>
            </View>
            <Text style={styles.header2}>Contraseña</Text>
            <View style={styles.inputs}>
                <IconAntDesign 
                    name='lock' 
                    size={30}
                    secureTextEntry={true}
                    style={styles.icons}
                />
                <View style={styles.InputBox}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder={"Contraseña"}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
            </View>
            <Button text="Registrarse"onPress={() => doUserRegistration()} />
            <View style={styles.registro}>
                        <Text>¿Tienes cuenta?</Text>
                        <TouchableOpacity 
                            onPress={()=>{
                            navigation.navigate('Login')
                        }}>
                            <Text style={styles.text2}> Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </ScrollView>    
    </SafeAreaView>
);
};

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
    text:{
        fontSize:20,
        color:'#188209',
        marginTop:40,
    },
    inputs:{
        marginTop:10,
        flexDirection:'row',
        color:'#188209'
    },
    icons:{
        alignItems:'center', 
        justifyContent:'center',
        paddingTop:15
    },
    registro:{
        marginTop:15,
        flexDirection:'row',
    },
    text2:{
        color:'#188209',
    },
    usernp:{
        backgroundColor:'#E0DEDE',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        marginLeft:20,
        borderColor:'#188209',
        height:40,
        borderRadius:5,
        margin:10,        
        borderWidth:1,
        width:135,
        marginBottom:10,
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
        marginTop:'15%',
        justifyContent:'center',
        alignItems:'center',  
    },
    header1:{
        marginRight:'35%'
    },
    header2:{
        marginRight:'45%'
    },
    header3:{
        marginRight:'55%'
    },
})

export default Register
