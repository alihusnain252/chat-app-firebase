import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

export const ArrowHeader = ({heading,deleteChat}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.arrowContainer}>
      <Pressable style={styles.arrowPress} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/leftArrow.png')}
          style={styles.leftArrow}
        />
      </Pressable>
      <View style={styles.textView}>
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <Pressable style={styles.free} onPress={()=>deleteChat()}>
        <Image
          source={require('../../assets/icons/block-user.png')}
          style={styles.delete}
        />
      </Pressable>
    </View>
  );
};
