import React,{useState}from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import TopBar from '../Components/TopBar'
import BottomBar from '../Components/BottomBar'
import Product from '../Components/UniqueProduct';
import { Searchbar, Button } from 'react-native-paper';
import IconIonicons from 'react-native-vector-icons/Ionicons'
const CreateProd = ({navigation}) => {  
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const buscar=()=>{

    }
    const recargar = () => {

    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <TopBar/>
            </View>
            <Text style={styles.text}>Lista de productos</Text>
            <View style={styles.Searchbar}>
                <View style={styles.search}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        mode="contained"
                        color='#188209'
                        onPress={()=>buscar()}
                    >
                        Buscar
                    </Button>
                </View>
                <View style={styles.reload}>
                    <TouchableOpacity onPress={()=>recargar()}>
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
                    <Product
                        text="Papas"
                        date="28/10/2021"
                    />
                </ScrollView>
            </View>
            <View style={styles.bot}>
            <BottomBar
                pr2={()=>{navigation.navigate('CreateProd')}}
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
    Searchbar:{
        marginTop:'5%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        marginLeft:'5.5%',
        marginRight: '5.5%'
    },
    search:{
        flex:4,
        width:'40%',
        marginRight:'5%'
    },
    btn:{
        flex:2,
        marginRight: '5%'
    },
    reload:{
        flex:1
    },
})