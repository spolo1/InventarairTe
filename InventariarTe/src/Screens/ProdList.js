import React,{useState}from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, } from 'react-native';
import TopBar from '../Components/TopBar'
import BottomBar from '../Components/BottomBar'
import Product from '../Components/UniqueProduct'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Overlay } from 'react-native-elements';
import Buton from '../Components/Button';
import Parse from 'parse/react-native';

const CreateProd = ({navigation}) => {  
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([])
    const [estate, setEstate] = useState();
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const buscar= async function (){
        const currentUser = await Parse.User.currentAsync();
        try{
            const ProdQuery = new Parse.Query('ActiveProducts')
            const Consumed = new Parse.Query ('Consume')
            Consumed.contains('CantUser', currentUser.id);
            let finQuery = await Consumed.find();
            setEstate(finQuery);
            ProdQuery.ascending('DueDate')
            ProdQuery.contains('UserProduct',currentUser.id)
            let Prod = await ProdQuery.find();
            setProducts(Prod)
        }catch(error){
            Alert.alert('Advertencia!',error.message);
        }
    }

    const del= async function(ProdId){
        console.log('Entre al borrado '+ ProdId)
        let Prod = new Parse.Object('ActiveProducts')
        Prod.set('objectId', ProdId);
        try{
            await Prod.destroy();
            delUpdate();
            Alert.alert('Notificación','Producto eliminado correctamente')
        }catch(error){
            Alert.alert('Advertencia!',error.message);
        }
    }

    const update= async function(ProdId, Cant){
        let Prod = new Parse.Object ('ActiveProducts');
        Prod.set('objectId', ProdId);
        if(Cant > 1 ){
            let temp = parseInt(Cant) - 1;
            Prod.set('Cantidad',  temp.toString());
            try{
                await Prod.save();
                Alert.alert('Atención', 'Producto actualizado correctamente')
                delUpdate(Cant);              
            }
            catch{
                Alert.alert('Error',error.message);
            }
        }
        else {
            del(ProdId)
        }
    }

    const delUpdate = async function(Cant){
        console.log('Entre a delUpdate', Cant)
        const consume = new Parse.Object ('Consume');
        const delQuery = new Parse.Query('Consume');
        const currentUser = await Parse.User.currentAsync();

        try{
            delQuery.contains('CantUser', currentUser.id);
            let queryResult = await delQuery.find();
            if (queryResult.length === 0 || queryResult.length > 1) {
                console.log('El susuario no existe');
                consume.set('CantUser', currentUser.id);
                consume.set('Cantidad',1);
                await consume.save();
                buscar();
            }
            else{
                console.log('El susuario existe');
                buscar();
                //Aqui va la acutalizacion
            }
        }
        catch{
            Alert.alert('Advertencia', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <TopBar/>
            </View>
            <View style={{flexDirection:'row' ,alignItems:'center', justifyContent:'space-between', marginTop:'7%'}}>  
                <View>
                    <Text style={styles.text}>Lista de productos</Text>
                </View>  
                <View style={{marginTop:'5%', marginLeft:'15%'}}>
                    <TouchableOpacity onPress={()=>buscar()}>
                        <IconIonicons
                            name='reload'
                            size={30}
                            color='#188209'
                            />
                        </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <ScrollView>
                {products !== null &&
                    products !== undefined &&
                    products.map((Prod) => (
                        <Product
                            key={Prod.id}
                            id={Prod.id}
                            text={Prod.get('ProductName')}
                            cantidad={Prod.get('Cantidad')}
                            dias={Prod.get('Dias')}
                            erase={()=>update(Prod.id,Prod.get('Cantidad'))}
                        />
                    ))}
                </ScrollView>
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Text>¿De que manera quieres crear el producto?</Text>
                    <Buton
                        text="¿Buscar en la aplicación?"
                        onPress={()=>{navigation.navigate('SearchProduct')}}
                    />
                    <Buton
                        text="¿Ingresar manualmente?"
                        onPress={()=>{navigation.navigate('CreateProd')}}
                    />
                </Overlay>
            <View style={styles.bot}>
            <BottomBar
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
    content:{
        flex:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%'
    },
    text:{
        marginTop:'10%',
        fontSize:20,
        color:'#188209'
    },
    itemBox:{
        borderRadius:5,
        height:60,
        backgroundColor: '#9ADB91',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:'76%',
        marginLeft:'5.5%',
        marginBottom:'5%',
    },
    item:{
        borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    },
    toggle:{
        backgroundColor:'#188209',
        marginBottom:10,
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:5,
    },
    toggleInput:{
        flex:1,
    },
})