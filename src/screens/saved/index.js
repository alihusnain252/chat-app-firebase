import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {ArrowHeader, Header, SavedUserCard, UserCard} from '../../components';
import {auth, firestore} from '../../firebase';
import {getUser} from '../../utils/helper';
import {useFocusEffect} from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const Saved = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [savedUser, setSavedUser] = useState([]);
  // console.log('state users : ', savedUser);

  const getSaved = () => {
    return new Promise((resolve, reject) => {
      const cUid = auth().currentUser.uid;

      firestore()
        .collection('saved')
        .doc(cUid)
        .get()
        .then(async documentSnapshot => {
          setLoading(false);
          if (documentSnapshot.exists) {
            // console.log('User data: ', documentSnapshot.data());
            let user = documentSnapshot.data();
            // setSavedData(user?.users);
            resolve(user.users || []);

            // console.log('userNotFound : ',user)
          } else {
            resolve([]);
            console.log('userNotFound');
          }
        })
        .catch(err => {
          setLoading(false);
          resolve([]);
          console.log('getUserError', JSON.stringify(err));
        });
    });
  };

  const getUserData = async users => {
    let savedUsers = await Promise.all(
      users?.map(async uid => {
        // console.log('ids : ', uid);
        const userData = await getUser(uid, setLoading);
        return {userId: uid, userDetails: userData};
      }),
    );

    setSavedUser(savedUsers);
  };
  const getData = async () => {
    const users = await getSaved();
    setSavedIds(users);

    getUserData(users);
  };
  const saveUsers = users => {
    const cuid = auth().currentUser.uid;
    firestore()
      .collection('saved')
      .doc(cuid)
      .set({users: users})
      .then(ref => {
        // console.log(ref);
      });
  };

  const onDeletePress = id => {
    const sIds = savedIds.filter(item => item !== id);
    saveUsers(sIds);
    getUserData(sIds);
  };
  const userPress = data => {
    navigation.navigate('UserProfile', {uid: data.userId});
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      const unsubscribe = navigation.addListener('focus', () => {
        getData();
      });
      return unsubscribe;
    }, []),
  );

  return (
    <View style={styles.homeContainer}>
      <Header heading={'Saved Homeschooler'} />
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          style={{padding: '3%'}}
          data={savedUser}
          renderItem={({item, index}) => (
            <SavedUserCard
              key={index}
              userPress={userPress}
              data={item}
              onDeletePress={onDeletePress}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
