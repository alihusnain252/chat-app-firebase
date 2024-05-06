import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { MyTheme } from '../../utils';
import auth from '@react-native-firebase/auth';
import { Loader } from '@components';

export const WelcomeBack = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)

  const loginHandler = () => {

    if (email === '') {
      Alert.alert('Error', 'Please enter your email')
      return
    }
    if (password === '') {
      Alert.alert('Error', 'Please enter password')
      return
    }
    setLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in successfully');
        setLoading(false)
        // navigation.navigate("HomeScreen")
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'User not found with this email address')
        }
        setLoading(false)

        console.log(error);
      });
  };

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
            <Text style={styles.welcomeHeading}>Welcome Back,</Text>
            <View style={styles.createAccount}>
              <Text style={styles.welcomeText}>
                Access your account below or
              </Text>
              <Pressable
                style={styles.createAccountPress}
                onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.createAccountText}>Create Account</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.welcomeInputsContainer}>
            <View style={styles.emailInputView}>
              <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={e => setEmail(e)}
                placeholder="Your email..."
                placeholderTextColor={MyTheme.white}
              />
            </View>
            <View style={styles.passwordInputView}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={e => setPassword(e)}
                placeholder="Password"
                secureTextEntry={showPassword}
                placeholderTextColor={MyTheme.white}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {!showPassword && <Image
                  source={require('../../assets/icons/eye.png')}
                  style={[styles.eyeIcon, { tintColor: 'white' }]}
                />}
                {showPassword && <Image
                  source={require('../../assets/icons/view.png')}
                  style={[styles.eyeIcon, { tintColor: 'white' }]}
                />}
              </Pressable>
            </View>
          </View>
          <View style={styles.welcomeBtnContainer}>
            <Pressable
              style={styles.forgotPassWordPress}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassWordText}>Forgot Password?</Text>
            </Pressable>
            <Pressable style={styles.LoginPress} onPress={() => loginHandler()}>
              <Text style={styles.LoginText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Loader loading={loading}/>
    </View>
  );
};
