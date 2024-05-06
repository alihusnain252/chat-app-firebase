import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {MyTheme} from '../../utils/myTheme';
import auth from '@react-native-firebase/auth';
import {deviceWidth} from '../../utils/dimensions';
import {UserCard} from '@components';
import {Loader, SearchPlace} from '../../components';
import {firestore} from '../../firebase';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import geohash from 'ngeohash';

export const NearMe = ({navigation}) => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const latitude = 41.425495;
    const longitude = -73.0051055;

    getUsers(latitude, longitude);
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers(latitude, longitude);
    });
    return unsubscribe;
  }, [navigation]);

  const getUsers = (lat, lng) => {
    const latitude = lat;
    const longitude = lng;

    const range = getGeohashRange(latitude, longitude, 10000);

    firestore()
      .collection('accounts')
      .where('geohash', '>=', range.lower)
      .where('geohash', '<=', range.upper)
      .get()
      .then(async querySnapshot => {
        setLoading(false);
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const user = {id: documentSnapshot.id, ...data};
          if (auth().currentUser.uid !== documentSnapshot.id) users.push(user);
        });
        // console.log('users', users)
        setUsersList(users);
      })
      .catch(err => {
        setLoading(false);
        console.log('getUserError', JSON.stringify(err));
      });
  };

  const userPress = user => {
    navigation.navigate('UserProfile', {uid: user.id});
  };

  const getGeohashRange = (latitude, longitude, distance) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
      lower,
      upper,
    };
  };

  const updateLocationResponse = selectedLocation => {
    setSelectedLocation(selectedLocation);
    getUsers(
      selectedLocation?.geometry.location.lat,
      selectedLocation?.geometry.location.lat,
    );
    console.log(
      selectedLocation?.geometry.location.lat,
      selectedLocation?.geometry.location.lat,
    );
  };
  // const onRegionChange = (evt)=>{
  //   // console.log("region Changes lat",evt.latitude,"region Changes long",evt.longitude);
  //   getUsers(evt.latitude, evt.longitude)
  // }

  return (
    <View style={styles.homeContainer}>
      {/* <Text>Near me</Text> */}
      <View
        style={{
          height: deviceWidth - deviceWidth / 4,
          width: deviceWidth,
          backgroundColor: MyTheme.lightBackground,
        }}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          // onRegionChange={(evt)=> onRegionChange(evt)}
          region={{
            latitude: selectedLocation
              ? selectedLocation?.geometry?.location?.lat
              : 37.78825,
            longitude: selectedLocation
              ? selectedLocation?.geometry?.location?.lng
              : -122.4324,
            latitudeDelta: 0.15,
            longitudeDelta: 0.121,
          }}>
          {usersList.map((marker, index) =>
            !marker?.latitude ? null : (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker?.latitude ? marker.latitude : 37.78825,
                  longitude: marker?.longitude ? marker.longitude : -122.4324,
                }}
                title={marker.name}
                description={marker.neighborhood}
              />
            ),
          )}
        </MapView>
      </View>
      <View style={{flex: 1, width: '100%'}}>
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
              placeholder="City or ZipCode..."
              editable={false}
              placeholderTextColor={MyTheme.white}
            />
          </View>
        </Pressable>
        {usersList.length > 0 && (
          <FlatList
            style={{padding: '3%'}}
            data={usersList}
            renderItem={({item}) => (
              <UserCard user={item} onPress={userPress} />
            )}
            keyExtractor={item => item.id}
          />
        )}
        {usersList.length == 0 && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: MyTheme.textDark, fontSize: 16}}>No User</Text>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, backgroundColor: MyTheme.background}}>
          <SearchPlace
            setLocation={updateLocationResponse}
            closeModal={() => setModalVisible(false)}
          />
        </View>
      </Modal>

      <Loader loading={loading} />
    </View>
  );
};
