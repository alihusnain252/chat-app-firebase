import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { MyTheme } from '../../utils/myTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { Loader } from '../../components';
import { getAddress, getPhotoReference, getUID, getUser } from '../../utils/helper';
import geohash from "ngeohash";



export const CreateProfile = ({ navigation, route }) => {

  const [image, setImage] = useState(null)
  const [updateImage, setUpdateImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    city: '',
    zipCode: '',
    neighborhood: '',
    aboutHome: '',
    aboutYou: '',
    fb: '',
    instagram: '',
    twitter: '',
  })


  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const uid = auth().currentUser.uid
    getPhotoReference(uid, setImage, setLoading);
    const user = await getUser(uid, setLoading);
    if (user) {
      setUserData(user)
    }
  }



  const editImagePress = async () => {
    const result = await launchImageLibrary({ quality: 0.5 });
    // console.log('Result', result)
    if (result?.assets && result?.assets?.length) {
      setUpdateImage(result.assets[0].uri)
      uploadProfileImage(result.assets[0].uri)
    }
  }


  const uploadProfileImage = async (uri) => {
    setLoading(true)
    let currentUser = auth().currentUser;
    const uid = currentUser.uid
    let name = uid + '_profile.png';
    const ref = storage().ref().child('users/' + uid + '/' + name);
    ref.putFile(uri)
      .then(res => {
        // console.log('res', JSON.stringify(res))
        getPhotoReference(uid, setImage, setLoading);

      }).catch(err => {
        console.log(err);
        setLoading(false)
      });
  };


  const updateProfilePress = () => {

    if (userData.fb !== '' && !(userData.fb.startsWith('http:') || userData.fb.startsWith('https:'))) {
      Alert.alert('Validation Error', 'Invalid facebook link. It should start from https://')
      return
    }
    if (userData.instagram !== '' && !(userData.instagram.startsWith('http:') || userData.instagram.startsWith('https:'))) {
      Alert.alert('Validation Error', 'Invalid instagram link. It should start from https://')
      return
    }
    if (userData.twitter !== '' && !(userData.twitter.startsWith('http:') || userData.twitter.startsWith('https:'))) {
      Alert.alert('Validation Error', 'Invalid twitter link. It should start from https://')
      return
    }

    if (userData.name === '') {
      Alert.alert('Username is required')
      return
    }
    if (userData.city === '') {
      Alert.alert('City is required')
      return
    }
    if (userData.zipCode === '') {
      Alert.alert('Zip Code is required')
      return
    }
    if (userData.neighborhood === '') {
      Alert.alert('Neighborhood is required')
      return
    }




    setLoading(true)
    const uid = auth().currentUser.uid
    firestore()
      .collection('accounts')
      .doc(uid)
      .set(userData)
      .then((res) => {
        setLoading(false)
        if (!(route?.params?.edit)) {
          navigation.replace('MyTabs')
        }
      }).catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const updateUserData = (text, name) => {
    setUserData({ ...userData, [name]: text })
  }

  const getLocationCoordinates = async () => {
    if (userData.zipCode !== '') {
      const addressRes = await getAddress(userData.zipCode)
      console.log('address', JSON.stringify(addressRes))
      if (addressRes.status == 'OK') {
        let addressR = addressRes?.results.length ? addressRes.results[0] : null
        if (addressR) {
          let co = addressR?.geometry?.location
          // userData.coordinates = [co.lng, co.lat]
          // userData.address = addressR.formatted_address
          userData.latitude = co.lat
          userData.longitude = co.lng
          const hash = geohash.encode(co.lat, co.lng);
          console.log('hash', hash)
          userData.geohash = hash
        } else {
          Alert.alert('Error', 'Invalid zip code')
        }
      } else {
        Alert.alert('Error', 'Invalid zip code')
      }

    }
  }



  return (
    <View style={styles.createProfileContainer}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {!route?.params?.edit && <View>
          <View style={styles.createProfileHeading}>
            <Text style={styles.createProfileHeadingText}>Create Your Profile</Text>
          </View>
          <Text style={styles.titleDescriptionText}>
            Fill out your profile now in order to complete setup of your profile
          </Text>
        </View>}
        {route?.params?.edit && <View>

          <View style={styles.createProfileHeading}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icons/leftArrow.png')}
                style={[styles.linkIcon, { marginRight: '3%' }]}
              />
            </Pressable>
            <Text style={styles.createProfileHeadingText}>Edit Your Profile</Text>
          </View>
          <Text style={styles.titleDescriptionText}>
            Fill out your profile now in order to update your profile
          </Text>
        </View>}


        <View style={styles.imageContainer}>
          <Pressable onPress={editImagePress}>
            <View style={styles.imageView}>
              <Image
                source={
                  image ?
                    { uri: image } :
                    require('../../assets/icons/edit.png')}
                style={styles.ProfileImage}></Image>
            </View>
          </Pressable>
        </View>


        <View style={styles.inputsContainer}>
          <View style={styles.inputsView}>
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              value={userData.name}
              onChangeText={(text) => updateUserData(text, 'name')}
              placeholderTextColor={MyTheme.lightPlaceholder}
            />
          </View>
          <View style={styles.zipCityContainer}>
            <View style={styles.smallInputView}>
              <TextInput
                style={styles.inputs}
                placeholder="City"
                value={userData.city}
                onChangeText={(text) => updateUserData(text, 'city')}
                placeholderTextColor={MyTheme.lightPlaceholder}
              />
            </View>
            <View style={styles.smallInputView}>
              <TextInput
                style={styles.inputs}
                placeholder="Zip Code"
                value={userData.zipCode}
                onChangeText={(text) => updateUserData(text, 'zipCode')}
                onBlur={getLocationCoordinates}
                placeholderTextColor={MyTheme.lightPlaceholder}
              />
            </View>
          </View>
          <View style={styles.inputsView}>
            <TextInput
              style={styles.inputs}
              placeholder="Neighborhood"
              value={userData.neighborhood}
              onChangeText={(text) => updateUserData(text, 'neighborhood')}
              placeholderTextColor={MyTheme.lightPlaceholder}
            />
          </View>
          <View style={styles.inputsView}>
            <TextInput
              style={styles.inputs}
              placeholder="Tell us about your home"
              value={userData.aboutHome}
              onChangeText={(text) => updateUserData(text, 'aboutHome')}
              placeholderTextColor={MyTheme.lightPlaceholder}
            />
          </View>
        </View>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={3}
          placeholder="About You..."
          value={userData.aboutYou}
          onChangeText={(text) => updateUserData(text, 'aboutYou')}
          placeholderTextColor={MyTheme.black}
        />
        <View style={styles.socialLinksContainer}>
          <View style={styles.socialLinksView}>
            <Image
              source={require('../../assets/icons/fb.png')}
              style={styles.linkIcon}
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Add Social Link"
              value={userData.fb}
              onChangeText={(text) => updateUserData(text, 'fb')}
              placeholderTextColor={MyTheme.black}
            />
          </View>
          <View style={styles.socialLinksView}>
            <Image
              source={require('../../assets/icons/instagram.png')}
              style={styles.linkIcon}
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Add Social Link"
              value={userData.instagram}
              onChangeText={(text) => updateUserData(text, 'instagram')}
              placeholderTextColor={MyTheme.black}
            />
          </View>
          <View style={styles.socialLinksView}>
            <Image
              source={require('../../assets/icons/twitter.png')}
              style={styles.linkIcon}
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Add Social Link"
              value={userData.twitter}
              onChangeText={(text) => updateUserData(text, 'twitter')}
              placeholderTextColor={MyTheme.black}
            />
          </View>
        </View>
        <Pressable onPress={updateProfilePress}
          style={styles.completeView}>
          <Text style={styles.completeText}>
            {(route?.params?.edit) ? 'Update' : 'Complete Setup'}
          </Text>
        </Pressable>
      </ScrollView>
      <Loader loading={loading} />
    </View>
  );
};
