import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import Button from '../Components/Button';
import RoundButton from '../Components/RoundButton';
import Parse from 'parse/react-native';

const SearchProduct = ({navigation}) => {

    const [product,setProduct] = useState()
    
    const SearchProd = async function (product){
        let query = new Parse.Query ('Products');
        console.log(product)
        try{
            query.contains('Code',product)
            let queryResult = await query.find();
            console.log(queryResult);
            console.log(queryResult.length)
            if(queryResult.length === 0 || queryResult.length > 1){
                Alert.alert("Advertencia!", 'Producto no encontrado');
                submitAndClear();
            }
            else{
                submitAndClear();
                navigation.navigate('CreateProdCode')
            }
        }catch(error){
            Alert.alert('Advertencia!',error.message);
        }
        
    }
    const submitAndClear = () => {
        let clear = '';
        setProduct(clear);
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                    style={styles.return}
                    onPress={()=>{
                        navigation.navigate('ProdList')
                }}>
                    <IconIonicons name='arrow-back' size={30}/>
            </TouchableOpacity>
            <View style={styles.form}>
                <Text style={styles.text}>Reiniciar Contraseña</Text>
                <Text style={styles.label}> Código de barras</Text>
                <View style={styles.inputs}>
                    <IconIonicons 
                        name='md-barcode-outline' 
                        size={30}
                        style={styles.icons}
                    />
                    <View style={styles.InputBox}>
                        <TextInput
                            placeholder='Código de Barras del producto' 
                            textAlign='left'
                            value={product}
                            autoCapitalize='none'
                            onChangeText={(val)=>setProduct(val)}
                            clearButtonMode='always'
                        />            
                    </View>
                </View>
            </View>
            <Button 
                text="Buscar Producto"
                onPress={() => SearchProd(product)}
            />
            <RoundButton
                text="Cancelar"
                onPress={()=>{navigation.navigate('ProdList')}}
            />
        </SafeAreaView>
    );
}

export default SearchProduct;
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
        marginRight:'40%',
    },
})