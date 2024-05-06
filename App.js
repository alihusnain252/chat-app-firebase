
import React from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  View,
} from 'react-native';
import { RouterComponents } from './src/navigation';
import { WelcomeBack } from '@screens';

function App() {

  return (
   <View style={{ flex: 1 }}>
    {/* <WelcomeBack /> */}
    <RouterComponents />
    </View>
  );
}

export default App;
