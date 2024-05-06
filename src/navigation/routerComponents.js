import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ChatScreen,
  CreateProfile,
  ForgotPassword,
  Groups,
  HomeScreen,
  Main,
  Players,
  Welcome,
  WelcomeBack,
} from '../screens';
import { MyTheme } from '../utils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { View, Text, TouchableOpacity, Image, Settings, DevSettings } from 'react-native';

const Stack = createNativeStackNavigator();

export const RouterComponents = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    // getUser(user?.uid)
    setUser(user);
    initializing ? setInitializing(false) : null;
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarColor: MyTheme.background,
              statusBarStyle: 'dark',
            }}>
            <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarColor: MyTheme.background,
              statusBarStyle: 'dark',
            }}>
            {/* <Stack.Screen name="MyTabs" component={MyTabs} /> */}
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Messages" component={Message} />
            <Stack.Screen name="Players" component={Players} />
            <Stack.Screen name="Groups" component={Groups} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            {/* <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="SearchPlace" component={SearchPlace} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
};



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NearMe } from '../screens/nearme';
import { Message } from '../screens/message';
import { Saved } from '../screens/saved';
import { Setting } from '../screens/settings';
import { UpdatePassword } from '../screens/updatePassword';
import { DeleteAccount } from '../screens/deleteAccount';
import { getUser } from '../utils/helper';
import { UserProfile } from '../screens/userProfile';
import { SearchPlace } from '../screens/searchPlace';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}  tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen headerShown={false} name="Profile" component={HomeScreen} />
      <Tab.Screen name="Near Me" component={NearMe} />
      <Tab.Screen name="Messages" component={Message} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
    // <Tab.Navigator>
    // <Tab.Screen name="Profile" component={HomeScreen} />
    // <Tab.Screen name="Near Me" component={HomeScreen} />
    // <Tab.Screen name="Messages" component={HomeScreen} />
    // <Tab.Screen name="Saved" component={HomeScreen} />
    // <Tab.Screen name="Settings" component={HomeScreen} />
    // </Tab.Navigator>
  );
}




function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{
      flexDirection: 'row', padding: '3%',
      justifyContent: 'space-evenly',
      backgroundColor: MyTheme.blue
    }}>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };



        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={{height:40, justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ marginBottom:isFocused? 5:0 }}>
                {label === 'Profile' &&
                  <BottomIcon icon={require('../assets/icons/user.png')} isFocused={isFocused} />}
                {label === 'Near Me' &&
                  <BottomIcon icon={require('../assets/icons/nearme.png')} isFocused={isFocused} />}
                {label === 'Messages' &&
                  <BottomIcon icon={require('../assets/icons/message.png')} isFocused={isFocused} />}
                {label === 'Saved' &&
                  <BottomIcon icon={require('../assets/icons/saved.png')} isFocused={isFocused} />}
                {label === 'Settings' &&
                  <BottomIcon icon={require('../assets/icons/settings.png')} isFocused={isFocused} />}
              </View>
              {isFocused && <Text style={{ fontWeight:isFocused ?'bold':'normal', fontSize:12, color: isFocused ? MyTheme.yellow : 'grey' }}>
                {label}
              </Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomIcon = ({ isFocused,icon }) => {
  return (
    <Image
      source={icon}
      style={{ width: 22, height: 22, tintColor: isFocused ? MyTheme.yellow : 'grey' }} />
  )
}


