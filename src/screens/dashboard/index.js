import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {MyTheme} from '../../utils/myTheme';
import auth from '@react-native-firebase/auth';
import {deviceWidth} from '../../utils/dimensions';
import {Loader, Profile} from '../../components';
import {getPhotoReference, getUID, getUser} from '../../utils/helper';

// const uid = getUID()
export const HomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const getUserData = async () => {
    const uid = auth().currentUser?.uid;
    console.log('uidd', uid);
    getPhotoReference(uid, setImage, setLoading);
    const user = await getUser(uid, setLoading);
    if (user) {
      setUserData(user);
    } else {
      navigation.replace('CreateProfile');
    }
  };

  return (
    <View style={styles.homeContainer}>
      {userData && (
        <Profile
          cUser={true}
          uid={auth().currentUser?.uid}
          userData={userData}
          image={image}
        />
      )}
      <Loader loading={loading} />
    </View>
  );
};
