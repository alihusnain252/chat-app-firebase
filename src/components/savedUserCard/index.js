import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {MyTheme} from '../../utils';
import {auth, firestore} from '../../firebase';

export const SavedUserCard = ({data, onDeletePress, userPress}) => {
  console.log('user DAta : ', data.userId);

  return (
    <Pressable
      onPress={() => userPress(data)}
      style={{
        marginBottom: '2%',
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
          source={require('../../assets/icons/mainIcon.jpeg')}
          style={{width: 100, height: 100}}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'stretch',
          flexDirection: 'row',
        }}>
        <View style={{flex: 3, justifyContent: 'center', padding: '3%'}}>
          <Text
            style={{
              color: MyTheme.textPrimary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {data.userDetails.name ? data.userDetails.name : 'User Name'}
          </Text>
          <Text style={{color: MyTheme.textPrimary}}>City, State</Text>
          <Text style={{color: MyTheme.textPrimary}}>00123</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icons/userProfile.png')}
            style={{width: 30, height: 30, tintColor: MyTheme.accent}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',

            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: MyTheme.border,
          }}>
          <Pressable onPress={() => onDeletePress(data.userId)}>
            <Image
              source={require('../../assets/icons/delete.png')}
              style={{width: 18, height: 18, tintColor: 'red'}}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
