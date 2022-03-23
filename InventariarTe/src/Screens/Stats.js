import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Parse from 'parse/react-native';

const Stats = ({navigation}) => {

    const [consumed, setConsumed] = useState();
    const [dueProduct, setDueProduct] = useState();
    const [activeProd, setActive] = useState();//

    const products = async function (){

        const parseQuery = new Parse.Query ('Consume');
        const dueQuery = new Parse.Query ('Due');
        const activeQuery = new Parse.Query ('Activos');//
        const currentUser = await Parse.User.currentAsync();
        
        try{
            parseQuery.contains('CantUser',currentUser.id);
            dueQuery.contains('CantUser', currentUser.id);
            activeQuery.contains('CantUser',currentUser.id);//
            
            let result = await parseQuery.find();
            let rest = await dueQuery.find();
            let chck = await activeQuery.find();//

            setConsumed(result);
            setDueProduct(rest);
            setActive(chck);//
        }
        catch{
            Alert.alert('Error', error.message);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                    style={styles.return}
                    onPress={()=>navigation.navigate('Profile')
                }>
                    <IconIonicons name='arrow-back' size={30} color='green'/>
            </TouchableOpacity>
            <View style={{flexDirection:'row' ,alignItems:'center', justifyContent:'space-between', marginTop:'7%'}}>  
                <View>
                    <Text style={styles.tittle}>Lista de productos</Text>
                </View>  
                <View style={{marginTop:'5%', marginLeft:'15%'}}>
                    <TouchableOpacity onPress={()=>products()}>
                        <IconIonicons
                            name='reload'
                            size={30}
                            color='#188209'
                            />
                        </TouchableOpacity>
                </View>
            </View>
            <View style={styles.table}>
                <View style={styles.header}>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Estado del producto
                        </Text>
                    </View>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Cantidad
                        </Text>
                    </View>
                </View>
                <View style={styles.active}>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Productos activos
                        </Text>
                    </View>
                    <View style={styles.border}>
                    {activeProd !== null &&
                            activeProd !== undefined && 
                            activeProd.map((Cast)=>(
                                    <Text>{Cast.get('Cantidad')}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.due}>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Productos vencidos
                        </Text>
                    </View>
                    <View style={styles.border}>
                        {dueProduct !== null &&
                            dueProduct !== undefined && 
                                dueProduct.map((Cast)=>(
                                    <Text>{Cast.get('Cantidad')}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.eat}>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Productos consumidos
                        </Text>
                    </View>
                    <View style={styles.border}>
                        {consumed !== null && 
                            consumed !== undefined && 
                                consumed.map((Prod)=>(
                                    <Text>
                                        {Prod.get('Cantidad')}
                                    </Text>
                                ))}
                    </View>
                </View>
                <View style={styles.foot}>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                            Total productos
                        </Text>
                    </View>
                    <View style={styles.border}>
                        <Text style={styles.content}>
                        {consumed !== null && dueProduct !== null && activeProd !==null &&
                            consumed !== undefined && dueProduct !== undefined && activeProd !== undefined &&
                                consumed.map((Prod)=>(
                                    <Text>
                                        {Prod.get('Cantidad')}
                                    </Text>
                                ))}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F3F5DC',
        alignItems: 'center',
        
    },
    titleBox:{
        flexDirection:'row',
        alignItems: 'center',
    },
    tittle:{
        marginTop:'10%',
        fontSize:20,
        color:'#188209'
    },
    table: {
        marginTop:'10%',
        borderWidth:1,
        width:'80%',
        height:'60%',
    },
    header:{
        flexDirection:'row',
        justifyContent: 'space-around',
        borderWidth:1,
        height:'20%',
        alignItems: 'center',

    },
    active:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height:'20%',
        alignItems: 'center',
        borderWidth:1,
    },
    due:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height:'20%',
        alignItems: 'center',
        borderWidth:1,
    },
    eat:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height:'20%',
        alignItems: 'center',
        borderWidth:1,
    },
    foot:{
        flexDirection:'row',
        justifyContent: 'space-around',
        height:'20%',
        alignItems: 'center',
        borderWidth:1,
    },
    border:{
        borderWidth:1,
        height:'100%',
        width:'50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    return:{
        borderRadius:50,
        borderWidth:1,
        borderColor:'#188209',
        marginLeft:-275,
        marginTop:30
    },
    content: {
        color: '#188209',
        fontWeight: "bold",
        fontSize:15,
    },
})
export default Stats;
