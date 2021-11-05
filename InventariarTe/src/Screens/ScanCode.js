import React, {useState} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Parse from 'parse/react-native';

function ScanCode({navigation}){

    const [camRef, setCamRef] = useState(null);
    const [prod, constProd] = useState();
    const _onBarcodeScanned = async function (code){
      let query = new Parse.Query ('Products');
      console.log('Entro')
      try{
        console.log('Buscando')
        console.log('code'+code)
          query.contains('Code',code.data)
          let queryResult = await query.find();
          constProd(queryResult);
          console.log(queryResult)
          console.log(queryResult[0].get('ProductName'))
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