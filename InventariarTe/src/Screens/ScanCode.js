import React, {useState} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Parse from 'parse/react-native';

function ScanCode({navigation}){

    //variables initialization
    const [camRef, setCamRef] = useState(null);

    const _onBarcodeScanned = async function (code){
      let query = new Parse.Query ('Products');
      console.log('Entro')
      try{
        console.log('Buscando')
          query.contains('Code',code.data)
          let queryResult = await query.find();
          console.log(queryResult);
          console.log(queryResult.length)
          if(queryResult.length === 0 || queryResult.length > 1){
            navigation.navigate('CreateProd')
            console.log('No encontrado')
          }
          else{
            console.log('encontrado')
            navigation.reset({
              index: 0,
              routes: [{ name: 'result', params:{'code': code} }],
            });
          }
      }catch(error){
        console.log(error.message)
      }
  }
    //on successfully scanning move to results screens
    {/*function _onBarcodeScanned(code){
        navigation.reset({
            index: 0,
            routes: [{ name: 'result', params:{'code': code} }],
        });
    }*/}

    return(
        <View style={Styles._mainContainer}>
            <RNCamera
                ref={ref => setCamRef(ref)}
                style={Styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                autoFocus='on'
                onBarCodeRead={_onBarcodeScanned}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
    },
    preview: {
        flex: 1,
    },
});

export default ScanCode