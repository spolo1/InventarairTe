import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, ScrollView, } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import Button from '../Components/Button';
import RoundButton from '../Components/RoundButton';
import Parse from 'parse/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SearchProduct = ({navigation}) => {

    const [product,setProduct] = useState()
    const [comp, setComp] = useState()
    const [resProd, setProd] = useState()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show,setShow]= useState(false);
    const [text,setText]=useState('Fecha de Vencimiento');
    const [cant, setCant] = useState('');
    const act = new Date()
    const SearchProd = async function (product){
        console.log(product)
        try{
            const ProdQuery = new Parse.Query('Products');
            ProdQuery.contains('Code',product)
            let Prod = await ProdQuery.find();
            setComp(Prod)
            console.log(Prod);
        }catch(error){
            Alert.alert('Advertencia!',error.message);
        }
        
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


    const CreateProd = async function (Prod) {
        let Active = new Parse.Object('ActiveProducts');
        const currentUser = await Parse.User.currentAsync();
        const newName = Prod.get('ProductName')
            const newDate = new Date(date);
            const newCant = cant;
            const newCode = Prod.get('Code');
            const newUser = currentUser.id;
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
        navigation.navigate('ProdList')
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
                <Text style={styles.text}>Buscar Producto</Text>
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
                {comp !== null &&
                    comp !== undefined &&
                    comp.map((Prod) => (
                        <View style={styles.productBox}>
                            <Text style={styles.textresult}>Producto</Text>
                            <View style={styles.titleRes}>
                                <Text style={styles.header}>Nombre Producto:</Text>
                                <Text> {Prod.get('ProductName')}</Text>
                            </View>
                            <View style={styles.titleRes}>
                                <Text style={styles.header}>Código Producto:</Text>
                                <Text> {Prod.get('Code')}</Text>
                            </View>
                            <Text style={{paddingRight:'74%'}}>Cantidad</Text>
                            <View style={styles.InputBox}>
                                <TextInput
                                    placeholder='Cantidad' 
                                    textAlign='left'
                                    value={cant}
                                    autoCapitalize='none'
                                    onChangeText={(val)=>setCant(val)}
                                    clearButtonMode='always'
                                />            
                            </View>
                            <Text style={{paddingRight:'48%'}}>Fecha de Vencimiento</Text>
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
                            <Button
                                text="Crear Producto"
                                onPress={() =>CreateProd(Prod)}
                            />
                        </View>
                ))}
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
        marginTop:'5%',
        justifyContent:'center',
        alignItems:'center',  
    },
    text:{
        fontSize:20,
        color:'#188209',
        marginBottom:20,
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
    productBox:{
        marginTop:'5%',
        alignItems:'center',
        width:'80%',
        flexDirection:'column',
    },
    textresult:{
        fontSize:20,
        color:'#188209',
        marginBottom:15,
    },
    titleRes:{
        marginTop:15,
        flexDirection:'row',
    },
    header:{
        fontWeight: 'bold',
        fontSize:15
    },
})