import React,{useState, useEffect}from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button as But, ScrollView} from 'react-native';
import TopBar from '../Components/TopBar'
import BottomBar from '../Components/BottomBar'
import Button from '../Components/Button';
import BorderButton from '../Components/RoundButton'
import { Alert } from 'react-native';
import Parse from 'parse/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';

const CreateProd = ({navigation}) => {  

  const [prodName, setprodName] = useState('');
  const [cant, setCant] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show,setShow]= useState(false);
  const [text,setText]=useState('Fecha de Vencimiento');
  const [visible, setVisible] = useState(false);
    
  const toggleOverlay = () => {
      setVisible(!visible);
  };


  const onChange = (event,selectedDate)=>{
    const currentDate =  selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
    let temp = new Date(currentDate);
    let format = temp.getDate()+'/'+(temp.getMonth()+1)+'/'+temp.getFullYear();
    setText (format)
    console.log(format)
  }

  const showMode = (currentMode) =>{
    setShow(true)
    setMode(currentMode)
  } 

  const CreateProduct = async function (){
    const newName = prodName;
    const newCode = code;
    {/*const newDate = date;*/}
    let Prod = new Parse.Object('Products');
    Prod.set('ProductName', newName);
    Prod.set('Code', newCode);
    {/*Prod.set('Vencimiento',newDate);*/}

    try{
      await Prod.save();
      Alert.alert('Exito!','Producto agregado!');
      submitAndClear();
      
      return true;
    }catch(error){
      Alert.alert('Advertencia!',error.message);
      return false;
    }
  }
  const submitAndClear = () => {
    let clear = '';
    setprodName (clear);
    setCant(clear);
    setCode(clear);
    setDate(clear);
    navigation.navigate('ProdList');
}

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TopBar/>
      </View>
      <View style={styles.content}>
      <Text style={styles.titl}>Ingresar Productos</Text>
      <ScrollView>
          <View style={styles.form}>
            
              <Text style={styles.text}>Nombre del Producto</Text>
              <View style={styles.InputBox}>
                        <TextInput
                            value={prodName}
                            placeholder={'Nombre Producto'}
                            onChangeText={(text) => setprodName(text)}
                            autoCapitalize={'none'}
                            clearButtonMode='always'
                        />            
              </View>
              <Text style={styles.text}>Fecha de Vencimiento</Text>
              <View style={styles.InputBox}>
                  <Text onPress={()=> showMode('date')}>
                      {text}
                  </Text>
                  {show && (
                    <DateTimePicker
                      testID='datetimepicker'
                      value={date}
                      mode={date}
                      display='spinner'
                      onChange = {onChange}
                    />)} 
              </View>
              <Text style={styles.text}>Cantidad</Text>
              <View style={styles.InputBox}>
                        <TextInput
                            value={cant}
                            placeholder={'Cantidad'}
                            keyboardType='numeric'
                            onChangeText={(text) => setCant(text)}
                            autoCapitalize={'none'}
                            clearButtonMode='always'
                        />            
              </View>
              <Text style={styles.text}>Código de barras</Text>
                <View style={styles.InputBox}>
                  <TextInput
                    value={code}
                    placeholder={'Código de barras'}
                    keyboardType='numeric'
                    onChangeText={(text) => setCode(text)}
                    autoCapitalize={'none'}
                    clearButtonMode='always'
                  />    
                </View>   
            </View>
            <Button
              text="Crear Producto"
              onPress={() =>CreateProduct()}
            />
              <BorderButton
                text="Cancelar"
                onPress={()=>{navigation.navigate('ProdList')}}
              />
          </ScrollView>            
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Text>¿De que manera quieres crear el producto?</Text>
                    <Button
                        text="¿Buscar en la aplicación?"
                        onPress={()=>{navigation.navigate('SearchProduct')}}
                    />
                    <Button
                        text="¿Ingresar manualmente?"
                        onPress={()=>{navigation.navigate('CreateProd')}}
                    />
                </Overlay>
      <View style={styles.bot}>
        <BottomBar
          pr1={()=>{navigation.navigate('ProdList')}}
          pr2={toggleOverlay}
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
      JoinBox:{
        flexDirection:'row',
        alignItems:'center',
        height:40,
        margin:10,    
        width:'68%',
        marginLeft:'0%',
        marginBottom:10,
      },
      CodeBox:{
        backgroundColor:'#E0DEDE',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5,
        borderColor:'#188209',
        height:40,
        borderRadius:5,
        margin:10,        
        borderWidth:1,
        width:'54%',
        marginBottom:10,
      },
      form:{
        marginTop:'10%'
      },
      content:{
        flex:10,
        alignItems:'center',
      },
      text:{
        marginLeft:'3%'
      },
})