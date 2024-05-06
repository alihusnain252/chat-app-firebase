import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { MyTheme } from '../../utils';
import auth from '@react-native-firebase/auth';
import { Loader } from '@components';

export const Welcome = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)

  const registerUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {

        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }


  return (
    <View style={styles.welcomeBackContainer}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/icons/mainIcon.jpeg')}
          style={styles.iconImage}
        />
      </View>
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeHeadingContainer}>
            <Text style={styles.welcomeHeading}>Welcome,</Text>
            <View style={styles.createAccount}>
              <Text style={styles.welcomeText}>
                Create your account below or
              </Text>
              <Pressable
                style={styles.createAccountPress}
                onPress={() => navigation.navigate('WelcomeBack')}>
                <Text style={styles.createAccountText}>Login</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.welcomeInputsContainer}>
            <View style={styles.emailInputView}>
              <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="Your email..."
                placeholderTextColor={MyTheme.white}
              />
            </View>
            <View style={styles.passwordInputView}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(e) => setPassword(e)}
                placeholder="Password"
                secureTextEntry={showPassword}
                placeholderTextColor={MyTheme.white}
              />
              <Pressable onPress={()=>setShowPassword(!showPassword)}>
                {!showPassword&&<Image
                  source={require('../../assets/icons/eye.png')}
                  style={[styles.eyeIcon,{tintColor:'white'}]}
                />}
                {showPassword&&<Image
                  source={require('../../assets/icons/view.png')}
                  style={[styles.eyeIcon,{tintColor:'white'}]}
                />}
              </Pressable>
            </View>
          </View>
          <View style={styles.welcomeBtnContainer}>
            <Pressable></Pressable>
            <Pressable
              style={styles.LoginPress}
              onPress={() => registerUser()}>
              <Text style={styles.LoginText}>Create Account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Loader loading={loading}/>
    </View>
  );
};
