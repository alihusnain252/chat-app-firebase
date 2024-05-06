import { View, FlatList, Text, Pressable, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { Header, ChatCard } from '@components';
import { MyTheme } from '../../utils';

const dataList = [
  { "chatId": "ICk1Ba2lk1HItCVxBwDM", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00005", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Ali Husnain", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDM2", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00056", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Player 342", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDM3", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00234", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Patient Wolf", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDM4", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00008", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Shah Rukh Khan", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDM5", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00015", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Pathan", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDM6", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-00098", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Ibrahim", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } },
  { "chatId": "ICk1Ba2lk1HItCVxBwDn7", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "WS-01233", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Jhon Wick", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } }
]

export const Players = ({ navigation }) => {
  const [chatUser, setChatUser] = useState(dataList);
  const [updateList, setUpdateList] = useState(false);




  return (
    <View style={styles.homeContainer}>
      <Header heading={'Players'} />
      <View style={{ width: '100%'}}>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.emailInputView}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: '4%',
                tintColor: 'white',
              }}
            />
            <TextInput
              style={styles.emailInput}
              value={''}
              onChangeText={e => console.log(e)}
              placeholder="Player Name, Account Number..."
              editable={false}
              placeholderTextColor={MyTheme.white}
            />
          </View>
        </Pressable>
        </View>
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          style={{}}
          extraData={updateList}
          data={chatUser}
          renderItem={({ item }) => <ChatCard key={item.chatId} data={item} />}
          keyExtractor={item => item.chatId}
        />
      </View>
    </View>
  );
};
