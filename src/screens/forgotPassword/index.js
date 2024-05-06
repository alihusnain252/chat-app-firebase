import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { ArrowHeader } from '../../components/arrowHeader';
import { MyTheme } from '../../utils';
import { auth } from '../../firebase';
import { Loader } from '../../components';

export const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)


  const sendLink = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email.')
      return
    }


    setLoading(true)
    auth().sendPasswordResetEmail(email)
      .then(function (user) {
        setLoading(false)
        console.log('forgetPasswordRes', user)
        Alert.alert('Please check your email...')
        setEmail('')
      }).catch(function (e) {
        console.log(e)
        setLoading(false)
      })



  }


  return (
    <View style={styles.forgotPasswordContainer}>
      <ArrowHeader heading="Forgot Password" />

      <View style={styles.forgotBody}>
        <View style={styles.forgotInputView}>
          <TextInput
            style={styles.forgotInput}
            placeholder="Enter your email"
            onChangeText={setEmail}
            placeholderTextColor={MyTheme.white}
          />
        </View>
        <Text style={styles.descriptionText}>
          We will send you an email with a link to reset your password, please
          enter the email associated with your account above.
        </Text>
        <Pressable style={styles.sendLinkPress} onPress={sendLink}>
          <Text style={styles.sendLinkText}>Send Reset Link</Text>
        </Pressable>
      </View>
      <Loader loading={loading}/>
    </View>
  );
};
