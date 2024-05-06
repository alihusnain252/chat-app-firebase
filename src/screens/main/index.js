import { View, FlatList, Text, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { Header, ChatCard } from '@components';




const dataList = [{ "chatId": "ICk1Ba2lk1HItCVxBwDM", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "Hi", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Ali Husnain", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } }]

export const Main = ({ navigation }) => {
  const [chatUser, setChatUser] = useState(dataList);
  const [updateList, setUpdateList] = useState(false);

  return (
    <View style={styles.homeContainer}>
      <Header heading={'Main'} />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '15%' }}>
        <Pressable style={{ marginRight: '5%' }} onPress={() => navigation.navigate('Messages')}>
          <View style={{ backgroundColor: 'white', elevation: 10, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 25 }}>Host</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ChatScreen', { chatData: dataList[0] })}>
          <View style={{ backgroundColor: 'white', elevation: 10, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 25 }}>Player</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
