import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { styles } from './styles';
import { MyTheme } from '../../utils/myTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import { ArrowHeader, Loader, Message } from '../../components';
import { auth, firestore } from '../../firebase';
import { useFocusEffect } from '@react-navigation/native';

export const ChatScreen = ({ navigation, route }) => {
  const { chatData } = route.params;
  console.log('chT ID : ', chatData.chatId);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  const [message, setMessage] = useState([]);

  const [newDate, setNewDate] = useState('');
  const [updateList, setUpdateList] = useState(1);
  const [imageUri, setImageUri] = useState('');

  const sendMessage = (type, msgId) => {
    const getDate = new Date().valueOf();

    const cuid = auth().currentUser.uid;
    const sendData = {
      type: type === 'image' ? 'image' : 'text',
      text: currentUserMessage,
      dateTime: getDate,
      sentBy: cuid,
    };
    firestore()
      .collection('messages')
      .doc(chatData?.chatId)
      .collection('message')
      .doc(type === 'image' ? msgId : null)
      .set(sendData)
      .then(ref => {
        setCurrentUserMessage('');
        updateLastMessage(sendData);
        getMessages();
        console.log('message send successfully : ');
      });
  };
  const makeId = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  const updateLastMessage = data => {
    const lastMsg = { lastMessage: data, createdAt: new Date().valueOf() };
    firestore()
      .collection('chats')
      .doc(chatData?.chatId)
      .update(lastMsg)
      .then(ref => {
        console.log('message update successfully : ', ref);
      });
  };

  function smallestToBiggest(a, b) {
    return b.dateTime - a.dateTime;
  }

  const getMessages = async () => {

    firestore()
      .collection('messages')
      .doc(chatData?.chatId)
      .collection('message')
      .orderBy('dateTime', 'desc')
      .onSnapshot(querySnapshot => {
        const msgs = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          // console.log('messages : ', data.text);
          msgs.push({ ...data, msgId: id, chatId: chatData.chatId });
        });
        setMessage(msgs);
      });


  };
  const sendImage = async uri => {
    // console.log('msg iD : ', makeId(20));
    let currentUser = auth().currentUser;
    const msgId = makeId(20);
    const chatId = chatData.chatId;
    let name = msgId + 'image.png';
    const ref = storage()
      .ref()
      .child('chats/' + chatId + '/' + name);

    ref.putFile(uri)
      .then(res => {
        sendMessage('image', msgId);
        getPhotoReference(uid, setImage, setLoading);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const pickImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0];
        // console.log('selected Image :', source.uri);
        setImageUri(source.uri);
        const uri = source.uri;
        sendImage(uri);
        // setAdImageName(source.fileName);
      }
    });
  };
  const deletePress = () => {
    console.log('OK Pressed');
    const deleteChat = () => {
      let colRef = firestore()
        .collection('messages')
        .doc(chatData?.chatId)
        .collection('message');

      colRef.get().then(querySnapshot => {
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
        getMessages();
      });
    };
    Alert.alert('Alert', 'This will delete all messages permanently ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteChat() },
    ]);
  };
  useFocusEffect(
    React.useCallback(() => {
      getMessages();
    }, []),
  );

  const user = auth().currentUser.uid;
  return (
    <View style={styles.chatContainer}>
      <ArrowHeader
        heading={
          chatData?.userDetails?.name ? chatData.userDetails.name : 'User Name'
        }
        deleteChat={deletePress}
      />
      <View style={{ flex: 1, width: '100%', paddingBottom: "14%" }}>
        <FlatList
          style={{}}
          data={message}
          inverted={true}
          renderItem={({ item, index }) => (
            <Message
              key={item.msgId}
              item={item}
              isLeft={item.sentBy === user ? false : true}
              message={item.text}
              image={item?.imageUri ? item.imageUri : ''}
            />
          )}
          keyExtractor={item => item.msgId}
        />
      </View>
      <View style={styles.chatInputContainer}>
        <TextInput
          placeholder="Type message here"
          style={styles.chatInput}
          value={currentUserMessage}
          placeholderTextColor={MyTheme.textDark}
          onChangeText={e => setCurrentUserMessage(e)}
        />
        <Pressable style={styles.IconPress} onPress={() => pickImage()}>
          <Image
            source={require('../../assets/icons/camera.png')}
            style={styles.cameraIcon}
          />
        </Pressable>
        <Pressable
          style={styles.IconPress}
          onPress={() => (currentUserMessage === '' ? {} : sendMessage())}>
          <Image
            source={require('../../assets/icons/messageSend.png')}
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
      <Loader loading={loading} />
    </View>
  );
};
