import { View, Text, Image, Pressable, Systrace } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { MyTheme } from '../../utils';
import { getPhotoReference } from '../../utils/helper';
import { auth } from '../../firebase';

export const ChatCard = ({ data }) => {

  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   if (data) {
  //     const id = (data.members || []).filter(ite => ite !== auth().currentUser.uid)
  //     console.log('data', id)
  //     const uid = id.length ? id[0] : ''
  //     getPhotoReference(uid, setImage, null);
  //   }
  // }, [data]);
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: MyTheme.background,
        borderTopWidth: 1,
        borderColor: MyTheme.border,
        paddingHorizontal: '2%',
      }}
      onPress={() => navigation.navigate('ChatScreen', { chatData: data })}>
      <View
        style={{
          padding: '1%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <View
          style={{
            backgroundColor: MyTheme.primary,
            width: 10,
            height: 10,
            borderRadius: 5,
          }}
        /> */}
        <Image
          source={image ? { uri: image } : require('../../assets/icons/userdummy.jpg')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: 'hidden',
            marginLeft: '2%',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'stretch',
          flexDirection: 'row',
        }}>
        <View style={{ flex: 4, justifyContent: 'center', padding: '3%' }}>
          <Text
            style={{ color: MyTheme.textDark, fontSize: 15, fontWeight: 'bold' }}>
            {data.userDetails ? data.userDetails.name : 'User Name'}
          </Text>
          {
            data?.lastMessage?.type === "image" ?
              <Image source={require("../../assets/icons/file.png")} style={styles.folderImage} />
              :
              <Text style={{ color: MyTheme.textDark, fontSize: 12 }}>
                {data.lastMessage ? data.lastMessage.text : 'no last message'}
              </Text>
          }

        </View>

        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/rightArrow.png')}
            style={{ width: 18, height: 18 }}
          />
        </View>
      </View>
    </Pressable>
  );
};
