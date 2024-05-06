import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {MyTheme} from '../../utils';
import {getPhotoReference} from '../../utils/helper';

export const UserCard = ({user, onPress}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPhotoReference(user.id, setImage, null);
  }, [user]);

  return (
    <Pressable onPress={() => onPress(user)}>
      <View
        style={{
          marginBottom: '3%',
          flexDirection: 'row',
          backgroundColor: MyTheme.primary,
          borderRadius: 10,
          borderWidth: 1,
          elevation: 1,
          overflow: 'hidden',
          borderColor: MyTheme.border,
        }}>
        <View style={{width: 100, height: 100}}>
          <Image
            source={
              image ? {uri: image} : require('../../assets/icons/userdummy.jpg')
            }
            style={{width: 100, height: 100}}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: '3%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: MyTheme.textPrimary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {user?.name}
            </Text>
            <Text style={{color: MyTheme.textPrimary}}>
              {user?.city}, {user?.zipCode}
            </Text>
            <Text style={{color: MyTheme.textPrimary}}>
              {user?.neighborhood}
            </Text>
          </View>
          <Image
            source={require('../../assets/icons/userProfile.png')}
            style={{width: 30, height: 30, tintColor: MyTheme.accent}}
          />
        </View>
      </View>
    </Pressable>
  );
};
