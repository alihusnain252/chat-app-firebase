import { View, Text, TextInput, Pressable, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { ArrowHeader } from '../../components/arrowHeader';
import { MyTheme } from '../../utils';
import { apiKey } from '../../utils/helper';

export const SearchPlace = () => {

  const [text, setText] = useState('')
  const [predictions, setPredictions] = useState([])

  const resultPress = (prediction) => {
    console.log('prediction', prediction)
    const place_id = prediction.place_id

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=formatted_address,name,geometry&key=${apiKey}`
    fetch(url)
      .then(res => {
        return res.json()
      }).then(res => {
        console.log('response', JSON.stringify(res))
        if (res?.status === 'OK') {
          // setPredictions(res.predictions)
        }
      }).catch(error => {
        console.log('error', JSON.stringify(error))
      })


  }
  const searchLocation = (value) => {
    setText(value)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&components=country:us|country:pr|country:vi|country:gu|country:mp&types=address&radius=500&key=${apiKey}`

    fetch(url)
      .then(res => {
        return res.json()
      }).then(res => {
        console.log('response', JSON.stringify(res))
        if (res?.status === 'OK') {
          setPredictions(res.predictions)
        }
      }).catch(error => {
        console.log('error', JSON.stringify(error))
      })

  }

  return (
    <View style={{ flex: 1, }}>
      <ArrowHeader heading={'Search Location'} />
      <View style={styles.searchInputView}>
        <Image
          source={require('../../assets/icons/search.png')}
          style={{ width: 20, height: 20, marginLeft: '4%', tintColor: 'white' }}
        />
        <TextInput
          style={styles.emailInput}
          value={text}
          onChangeText={(e) => searchLocation(e)}
          placeholder="City or ZipCode..."
          placeholderTextColor={MyTheme.white}
        />
      </View>

      <FlatList
        style={{ padding: '3%' }}
        data={predictions}
        renderItem={({ item }) => <SearchResultCard prediction={item} onPress={resultPress} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};


const SearchResultCard = ({ prediction, onPress }) => {
  return (
    <Pressable onPress={() => onPress(prediction)}>
      <View>
        <Text numberOfLines={1} style={{
          flex: 1, color: MyTheme.textDark, padding: '3%',
          borderBottomColor: MyTheme.border, borderBottomWidth: 1
        }}>
          {prediction.description}
        </Text>
      </View>
    </Pressable>
  )
}