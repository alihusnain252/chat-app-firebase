import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {MyTheme} from '../../utils';
import {deviceWidth} from '../../utils/dimensions';
import {auth, firestore} from '../../firebase';
import {useNavigation} from '@react-navigation/native';

export const Profile = ({uid, userData, image, backPress, cUser}) => {
  const [loading, setLoading] = useState(false);
  const [userIDs, setUserIDs] = useState([]);
  const [chatSaved, setChatSaved] = useState(false);
  const navigation = useNavigation();

  const linkPress = link => {
    if (!link) {
      Alert.alert('Error', 'Invalid link');
      return;
    }
    console.log('openUrl', link);
    Linking.canOpenURL(link)
      .then(res => {
        console.log('can open url ', res);

        Linking.openURL(link)
          .then(res => {})
          .catch(err => {
            console.log('cannot open url', err);
          });
      })
      .catch(err => {
        console.log('cannot open url', err);
      });
  };
  const getSaved = () => {
    const cUid = auth().currentUser.uid;

    firestore()
      .collection('saved')
      .doc(cUid)
      .get()
      .then(async documentSnapshot => {
        setLoading(false);
        let ids = [];
        ids.push(uid);
        if (documentSnapshot.exists) {
          let user = documentSnapshot.data();
          user.users.map(userID => {
            userID !== uid ? ids.push(userID) : null;
          });
          setUserIDs(ids);
        } else {
          console.log('userNotFound');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('getUserError', JSON.stringify(err));
      });
  };
  const savePress = () => {
    const cuid = auth().currentUser.uid;
    firestore()
      .collection('saved')
      .doc(cuid)
      .set({users: userIDs})
      .then(ref => {
        // console.log(ref);
        Alert.alert('Successfully saved');
      });
  };
  const fetchUserID = () => {
    return new Promise((resolve, reject) => {
      const cUid = auth().currentUser.uid;
      const groupRef = firestore().collection('chats');
      groupRef
        .where('members', 'array-contains', cUid)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const userChatID = data.members.filter(item => item !== cUid);
            if (userChatID[0] === uid) {
              resolve(setChatSaved(true));
            }
          });
        });
    });
  };
  const CreateChat = () => {
    const cuid = auth().currentUser.uid;
    const createdAt = new Date().valueOf();
    const chatData = {
      createdAt: createdAt,
      createdBy: cuid,
      lastMessage: {
        createAt: createdAt,
        image: 'image-name',
        text: 'this is text',
        type: 'text',
      },
      members: [`${cuid}`, `${uid}`],
    };
    chatSaved
      ? navigation.navigate('Messages')
      : firestore()
          .collection('chats')
          .doc()
          .set(chatData)
          .then(ref => {
            navigation.navigate('Messages');
          });
  };

  useEffect(() => {
    getSaved();
    fetchUserID();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{padding: '3%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {backPress && (
            <Pressable
              style={{position: 'absolute', left: 0}}
              onPress={() => backPress()}>
              <Image
                source={require('../../assets/icons/leftArrow.png')}
                style={[{width: 20, height: 20}]}
              />
            </Pressable>
          )}
          <Image
            source={require('../../assets/icons/homeLogo.png')}
            style={{
              width: '70%',
              height: 50,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: '2%',
            }}
          />
        </View>
        <Image
          source={
            image ? {uri: image} : require('../../assets/icons/userdummy.jpg')
          }
          style={{
            width: '100%',
            height: deviceWidth - deviceWidth / 3,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            paddingVertical: '2%',
            marginTop: '2%',
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: MyTheme.textDark,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {userData?.name || '--'}
            </Text>
            <Text style={{color: MyTheme.textDark, fontSize: 12}}>
              {(userData?.city || '--') + '  ' + (userData?.zipCode || '--')}
            </Text>
            <Text style={{color: MyTheme.textDark, fontSize: 12}}>
              {userData?.neighborhood || '--'}
            </Text>
          </View>

          <Pressable
            style={
              cUser
                ? {display: 'none'}
                : {flex: 1, justifyContent: 'center', alignItems: 'center'}
            }
            onPress={() => savePress()}>
            <Image
              source={require('../../assets/icons/plus.png')}
              style={{width: 30, height: 30}}
            />
          </Pressable>

          <View
            style={
              cUser
                ? {display: 'none'}
                : {flex: 1, alignItems: 'flex-end', justifyContent: 'center'}
            }>
            <Pressable
              onPress={() => CreateChat()}
              style={{
                backgroundColor: MyTheme.yellow,
                paddingHorizontal: '5%',
                paddingVertical: '2%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: MyTheme.black,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Message
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 15,
            borderColor: MyTheme.blue,
            padding: '4%',
            marginTop: '5%',
          }}>
          <Text
            style={{color: MyTheme.textDark, fontSize: 15, marginBottom: '3%'}}>
            About Me...
          </Text>
          <Text style={{color: MyTheme.textDark, fontSize: 13}}>
            {userData?.aboutYou || ''}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 15,
            borderColor: MyTheme.blue,
            padding: '4%',
            marginTop: '5%',
          }}>
          <Text
            style={{color: MyTheme.textDark, fontSize: 15, marginBottom: '3%'}}>
            Homeschoolers...
          </Text>
          <Text style={{color: MyTheme.textDark, fontSize: 13}}>
            {userData?.aboutHome || ''}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <SocialIcon
            show={userData?.fb}
            onPress={() => linkPress(userData?.fb)}
            icon={require('../../assets/icons/fb.png')}
          />
          <SocialIcon
            show={userData?.instagram}
            onPress={() => linkPress(userData?.instagram)}
            icon={require('../../assets/icons/instagram.png')}
          />
          <SocialIcon
            show={userData?.twitter}
            onPress={() => linkPress(userData?.twitter)}
            icon={require('../../assets/icons/twitter.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const SocialIcon = ({show, onPress, icon}) => {
  if (!show) return null;
  else
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: MyTheme.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginHorizontal: '2%',
          }}>
          <Image
            source={icon}
            style={{width: 25, height: 25, tintColor: MyTheme.accent}}
          />
        </View>
      </Pressable>
    );
};
