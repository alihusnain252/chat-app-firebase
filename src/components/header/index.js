import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ heading, groupPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.arrowContainer}>
      {/* <Pressable style={styles.arrowPress} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/leftArrow.png')}
          style={styles.leftArrow}
        />
      </Pressable> */}
      <Text style={styles.heading}>{heading}</Text>
      {groupPress && 
      <Pressable onPress={()=>groupPress()}>
        <Image style={{width:20, height:20}} source={require('../../assets/icons/group.png')}/>
      </Pressable>
      }
      {/* <View></View> */}
    </View>
  );
};
