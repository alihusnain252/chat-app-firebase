import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { MyTheme } from '../../utils';


export const Loader = (props) => {
  if (props.loading) {
      return (
          <View style={{
              justifyContent: 'center', alignItems: 'center', position: 'absolute',
              left: 0,
              right: 0,
              opacity: 0.4,
              // backgroundColor: Colors.app_background_color,
              backgroundColor: 'black',
              top: 0,
              bottom: 0,
          }}>
              <ActivityIndicator size="large" color={MyTheme.primary_color}/>
          </View>
      );
  } else {
      return (
          <View/>
      );
  }
};