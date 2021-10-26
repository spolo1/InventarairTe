import React, { useState }  from 'react';
import { Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconEntypo from 'react-native-vector-icons/Entypo'
const TopBar = (props) => {
    const [isSelected, setSelection] = useState(false);
    const {pr1,pr2,pr3,pr4}=props
  return (
    <View style={styles.box}>
            <TouchableOpacity>
                <IconEntypo
                    name='list'
                    size={30}
                    onPress={pr1}
                    color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconMaterialIcons
                    name='add-box'
                    size={30}
                    onPress={pr2}
                    color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconMaterialCommunityIcons
                    name ='barcode-scan'
                    size={30}
                    onPress={pr3}
                    color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconFontAwesome
                    name='user'
                    size={30}
                    onPress={pr4}
                    color='white'/>
            </TouchableOpacity>
        </View>
    );
}

export default TopBar;

const styles = StyleSheet.create({
    box:{
        backgroundColor:'#188209',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        height:60,
        margin:10,
        width:'100%',
        marginTop:'100%',
        justifyContent:'space-around'
    },
    text:{
        color:'#FFFFFF',
        fontSize:20
    },
})