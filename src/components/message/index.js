import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { getFormattedDate, getMessagePhoto } from '../../utils/helper';

export const Message = ({ item, isLeft, message }) => {
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log('date',getFormattedDate(item.dateTime))

  useEffect(() => {
    if (item.type === 'image') {
      getMessagePhoto(item.chatId, item.msgId, setImage, setLoading)
    }
  }, [item])


  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#4d3af9',
        color: 'white',
        // borderTopLeftRadius:0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#fff',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: '#000',
      };
    } else {
      return {
        // borderTopRightRadius : 0
      };
    }
  };



  return (
    <View style={styles.container}>
      <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          
          <Image
            source={
              image !== ''
                ? { uri: image }
                : require('../../assets/icons/edit.png')
            }
            resizeMode='contain'
            style={image !== '' ? styles.msgImage : { display: 'none' }}
          />
          <Text style={[styles.message,{fontSize:9,marginTop:'2%'}, isOnLeft('message')]}>{getFormattedDate(item.dateTime)}</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
};
