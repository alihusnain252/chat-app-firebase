import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ArrowHeader} from '../../components/arrowHeader';
import {MyTheme} from '../../utils';

export const UpdatePassword = () => {
  return (
    <View style={styles.forgotPasswordContainer}>
      <ArrowHeader heading="Update Password" />

      <View style={styles.forgotBody}>
        <View style={styles.forgotInputView}>
          <TextInput
            style={styles.forgotInput}
            placeholder="Enter password"
            placeholderTextColor={MyTheme.white}
          />
        </View>
       
        <View style={styles.forgotInputView}>
          <TextInput
            style={styles.forgotInput}
            placeholder="Confirm password"
            placeholderTextColor={MyTheme.white}
          />
        </View>
        {/* <Text style={styles.descriptionText}>
          We will send you an email with a link to reset your password, please
          enter the email associated with your account above.
        </Text> */}
        <Pressable style={styles.sendLinkPress}>
          <Text style={styles.sendLinkText}>Update Password</Text>
        </Pressable>
      </View>
    </View>
  );
};
