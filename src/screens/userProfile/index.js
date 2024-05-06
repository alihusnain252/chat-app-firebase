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
export const UserProfile = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const id = route?.params.uid;
    if (id) {
      setUid(id);
      getUserData(id);
    }
  }, [route]);

  const getUserData = async id => {
    console.log('uidd', id);
    getPhotoReference(id, setImage, setLoading);
    const user = await getUser(id, setLoading);
    if (user) {
      setUserData(user);
    }
  };

  return (
    <View style={styles.homeContainer}>
      {userData && uid && (
        <Profile
          uid={uid}
          userData={userData}
          image={image}
          backPress={() => navigation.goBack()}
        />
      )}
      <Loader loading={loading} />
    </View>
  );
};
