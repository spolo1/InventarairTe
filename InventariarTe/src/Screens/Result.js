import React, {useState}from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Button from '../Components/Button';
import RoundButton from '../Components/RoundButton'
import Parse from 'parse/react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';

function Result({navigation, route}){
    const {code} = route.params;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show,setShow]= useState(false);
    const [text,setText]=useState('Fecha de Vencimiento');
    const [cant, setCant] = useState('');
    const [comp,setComp]= useState()
    const act = new Date()
    const [product,setProduct] = useState()
    const searchProd = async function (){
        console.log('entre',code.data)
        let data = code.data
        try{
            const ProdQuery = new Parse.Query('Products');
            ProdQuery.contains('Code',data)
            let Prod = await ProdQuery.find();
            setComp(Prod)
            console.log('resultado',Prod)
        }
        catch(error){
            Alert.alert('Advertencia!',error.message)
        }
    }
    const CreateProd = async function (Prod){
        console.log('entramos')
        let Active = new Parse.Object('ActiveProducts');
        const currentUser = await Parse.User.currentAsync();
        const newName = Prod.get('ProductName')
        const newDate = new Date (date)
        const newCant=cant
        const newCode = Prod.get('Code')
        const newUser = currentUser.id
        Active.set('DueDate', newDate);
            Active.set('ProductName', newName);
            Active.set('Code', newCode);
            Active.set("Cantidad",newCant);
            Active.set('UserProduct', newUser);
            Active.set('Dias', Math.round((newDate-act)/(1000*60*60*24)))
            
            await Active.save();
            submitAndClear();
    }
    const submitAndClear = () => {
        let clear = '';
        setProduct(clear);
        setCant(clear);
        setDate(clear);
        console.log('se cargo el producto')
        navigation.navigate('ProdList')
    }
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
            <TouchableOpacity 
                    style={Styles.return}
                    onPress={()=>{
                        navigation.navigate('ProdList')
                }}>
                    <IconIonicons name='arrow-back' size={30}/>
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
                <Text>Confirmar Código</Text>
                <View style={{flexDirection: "row"}}>
                    <View>
                        <Text>Código: </Text>
                    </View>
                    <View>
                        <Text>{code.data}</Text>
                    </View>
                </View>
                <Button
                    text='Confirmar'
                    onPress={()=>searchProd()}
                />
            </View>
            {comp !== null &&
                    comp !== undefined &&
                    comp.map((Prod) => (
                <View>
                    <Text style={Styles.title}>Producto</Text>
                <View style={Styles.content}>
                    <Text style={Styles.text}>Nombre Producto:  </Text>
                    <Text>{Prod.get('ProductName')}</Text>
                </View>
                <View style={Styles.content}>
                    <Text style={Styles.text}>Código Producto: </Text>
                    <Text>{Prod.get('Code')}</Text>
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
            </View>
            ))}
            
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
    return:{
        borderRadius:50,
        borderWidth:1,
        borderColor:'#188209',
        marginLeft:-275,
        marginTop:30
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