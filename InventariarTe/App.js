import React from 'react';
import Routes from './src/Navigation/Routes'
import Parse from 'parse/react-native.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('dFBWJ5Vj0xrDGcx2PCaNRgoY37uhIYDQmjgXzDaP','z3AdlZpkbhRyZiuqXUdOtDsw9d1TUMcgzmWbFX2V');
Parse.serverURL="https://parseapi.back4app.com"
function App(){
  return (
      <Routes />
  );
}
export default App;