import React,{useState}from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import TopBar from '../Components/TopBar'
import BottomBar from '../Components/BottomBar'
import Button from '../Components/Button';
import BorderButton from '../Components/RoundButton'
import { Alert } from 'react-native';
import Parse from 'parse/react-native';

const CreateProd = ({navigation}) => {  

  const [prodName, setprodName] = useState('');
  const [date, setDate] = useState('');
  const [cant, setCant] = useState('');
  const [code, setCode] = useState('');
  var numCode = parseInt(code);
  const Alerts = () =>{
    if(prodName==""||date==""||cant==""||code==""){
          Alert.alert("Advertencia",
              "Por favor rellene todos los campos antes de enviar",
              [{text:'OK'}]
          )
      }
      else{
          CreateProduct();
      }
  }
  const CreateProduct = async function (){
    const newName = prodName;
    const newCode = numCode;
    let Prod = new Parse.Object('Products');
    Prod.set('ProductName', newName);
    Prod.set('Code', newCode);

    try{
      await Prod.save();
      Alert.alert('Exito!','Producto agregado!');
      navigation.navigate('Profile');
      return true;
    }catch(error){
      Alert.alert('Advertencia!',error.message);
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TopBar/>
      </View>
      <View style={styles.content}>
      <Text style={styles.titl}>Ingresar Productos</Text>
          <View style={styles.form}>
            <View style={styles.InputBox}>
                      <TextInput
                          value={prodName}
                          placeholder={'Nombre Producto'}
                          onChangeText={(text) => setprodName(text)}
                          autoCapitalize={'none'}
                      />            
            </View>
            <View style={styles.InputBox}>
              <TextInput
                //crear metodo para la fecha
                value={date}
                placeholder={'Fecha de vencimiento'}
                onChangeText={(text) => setDate(text)}
                autoCapitalize={'none'}
              />  
            </View>
            <View style={styles.InputBox}>
                      <TextInput
                          value={cant}
                          placeholder={'Cantidad'}
                          keyboardType='numeric'
                          onChangeText={(text) => setCant(text)}
                          autoCapitalize={'none'}
                      />            
            </View>
            <View style={styles.InputBox}>
                      <TextInput
                          value={code}
                          placeholder={'Código de barras'}
                          keyboardType='numeric'
                          onChangeText={(text) => setCode(text)}
                          autoCapitalize={'none'}
                      />            
            </View>
          </View>
          <Button
            text="Crear Producto"
            onPress={() =>Alerts()}
          />
            <BorderButton
              text="Cancelar"
              onPress={()=>{navigation.navigate('Profile')}}
            />          
      </View>
      <View style={styles.bot}>
        <BottomBar
          pr1={()=>{navigation.navigate('ProdList')}}
          pr3={()=>{navigation.navigate('ScanCode')}}
          pr4={()=>{navigation.navigate('Profile')}}
          />
      </View>
    </View>
  );
}

export default CreateProd;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor: '#F3F5DC',
        flex:1,
      },
      bot:{
        justifyContent:'flex-end',
        flex:1,
        backgroundColor: '#188209'
      },
      top:{
        justifyContent:'flex-start',
        flex:1,
        backgroundColor: '#188209'
      },
      titl:{
        marginTop:'10%',
        fontSize:20,
        color:'#188209'
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
        marginTop:'10%'
      },
      content:{
        flex:10,
        alignItems:'center',
      },
})