import { View, FlatList, Text, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { Header, ChatCard } from '@components';

const dataList = [{ "chatId": "ICk1Ba2lk1HItCVxBwDM", "createdAt": 1684442010897, "createdBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "lastMessage": { "dateTime": 1684442015311, "isRead": false, "sentBy": "pN3NV8EycDTK3NcVI1dCiB3tvhH2", "status": "active", "text": "Hi", "type": "text" }, "members": ["pN3NV8EycDTK3NcVI1dCiB3tvhH2", "MX9L14E8NcRufum6TNbLfpl9Jfo1"], "receiverId": ["MX9L14E8NcRufum6TNbLfpl9Jfo1"], "updatedAt": 1684442016021, "userDetails": { "aboutHome": "", "aboutYou": "about", "address": "Bethany, CT 06524, USA", "city": "Lahore", "fb": "", "geohash": "9muey7we3", "instagram": "", "latitude": 33.0227476, "longitude": -117.1382404, "name": "Ali Husnain", "neighborhood": "johar town", "status": "active", "twitter": "", "zipCode": "92127" } }]

export const Message = ({ navigation }) => {
  const [chatUser, setChatUser] = useState(dataList);
  const [updateList, setUpdateList] = useState(false);

  return (
    <View style={styles.homeContainer}>
      <Header heading={'Chats'} groupPress={()=>navigation.navigate('Groups')} />
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          style={{}}
          extraData={updateList}
          data={chatUser}
          renderItem={({ item }) => <ChatCard key={item.chatId} data={item} />}
          keyExtractor={item => item.chatId}
        />
      </View>
      <Pressable onPress={() => navigation.navigate('Players')}>
        <View style={{ position: 'absolute', backgroundColor: 'white', elevation: 10, bottom: 20, right: 20, width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text style={{ color: 'black' }}>Players</Text> */}
        <Image style={{width:30, height:30,marginLeft:7}} tintColor={'black'} source={require('../../assets/icons/messageSend.png')}/>
        </View>
      </Pressable>
    </View>
  );
};
