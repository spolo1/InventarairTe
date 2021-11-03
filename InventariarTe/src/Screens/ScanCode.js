import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import {View, Text} from 'react-native'
const ScanCode = (navigation) => {
    const [visible, setVisible] = useState(false);
    
    const toggleOverlay = () => {
        setVisible(!visible);
    };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
        <Button> salir</Button>
      </Overlay>
    </View>
  );
};

export default ScanCode;