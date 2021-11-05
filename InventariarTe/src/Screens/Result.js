import React, {useState }from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from '../Components/Button';
import RoundButton from '../Components/RoundButton'
import Parse from 'parse/react-native';

function Result({navigation, route}){

    const {Produ} = route.params;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show,setShow]= useState(false);
    const [text,setText]=useState('Fecha de Vencimiento');
    const [cant, setCant] = useState('');

    //function go to scan screen again
    function _onScanAgainClick(){
        navigation.reset({
            index: 0,
            routes: [{ name: 'ScanCode' }],
        });
    }
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
    return(
        <View style={Styles.container}>
            <Text style={Styles.title}>Producto</Text>
            <View>
                <View style={Styles.content}>
                    <Text style={Styles.text}>Nombre Producto:  </Text>
                    <Text>Nombre</Text>
                </View>
                <View style={Styles.content}>
                    <Text style={Styles.text}>Código Producto: </Text>
                    <Text> Producto</Text>
                </View>
            </View>
            <Text style={{paddingRight:'63%', marginTop:'5%'}}>Cantidad</Text>
                            <View style={Styles.InputBox}>
                                <TextInput
                                    placeholder='Cantidad' 
                                    textAlign='left'
                                    value={cant}
                                    autoCapitalize='none'
                                    onChangeText={(val)=>setCant(val)}
                                    clearButtonMode='always'
                                />            
                            </View>
                            <Text style={{paddingRight:'40%'}}>Fecha de Vencimiento</Text>
                            <View style={Styles.InputBox}>
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
                            <Button
                                text="Crear Producto"
                                onPress={() =>CreateProd(Prod)}
                            />
            <RoundButton
                text="Buscar otro producto"
                onPress={_onScanAgainClick}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor: '#F3F5DC',
        flex:1,
        justifyContent: 'center',
    },
    _heading:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 30
    },
    title:{
        fontSize:20,
        color:'#188209',
        fontWeight: 'bold',
    },
    content:{
        marginTop:15,
        flexDirection:'row',
    },
    text:{
        fontWeight: 'bold',
        fontSize:15
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
});

export default Result;