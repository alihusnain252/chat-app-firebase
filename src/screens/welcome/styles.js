import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  welcomeBackContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: MyTheme.background,
  },
  topContainer: {
    flex: 4,
    paddingHorizontal: '2%',
    // backgroundColor:"yellow"
  },
  iconImage: {
    width: '85%',
    height: '85%',
    alignSelf: 'center',
    resizeMode:'contain'
  },
  welcomeContainer: {
    flex: 3,
    alignItems: 'center',
  },
  welcomeHeadingContainer: {
    width: '92%',
  },
  welcomeHeading: {
    color: MyTheme.textDark,
    fontSize: 28,
    fontWeight: 600,
    justifyContent: 'center',
  },
  createAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: MyTheme.textDark,
    fontSize: 12,
    fontWeight: 400,
  },
  createAccountPress: {
    marginLeft: '3%',
    paddingHorizontal: '2%',
    alignItems: 'center',
  },
  createAccountText: {
    color: MyTheme.textDark,
    fontSize: 14,
    fontWeight: 500,
  },
  welcomeInputsContainer: {
    // backgroundColor:"red",
    width: '92%',
    paddingVertical: '2%',
  },
  emailInputView: {
    backgroundColor: MyTheme.blue,
    width: '100%',
    borderRadius: 8,
    marginTop: '2%',
  },
  emailInput: {
    backgroundColor: MyTheme.blue,
    borderRadius: 8,
    paddingLeft: 15,
    color:MyTheme.white,
  },
  passwordInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MyTheme.blue,
    width: '100%',
    borderRadius: 8,
    marginTop: '2%',
  },
  passwordInput: {
    width: '90%',
    backgroundColor: MyTheme.blue,
    color:MyTheme.white,
    borderRadius: 8,
    paddingLeft: 15,
  },
  eyeIcon: {
    backgroundColor: MyTheme.blue,
    width: 20,
    height: 20,
  },
  welcomeBtnContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPassWordPress: {
    backgroundColor: MyTheme.yellow,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    borderRadius: 8,
  },
  forgotPassWordText: {
    color: MyTheme.textDark,
    fontSize: 12,
    fontWeight: 700,
  },
  LoginPress: {
    backgroundColor: MyTheme.yellow,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    borderRadius: 30,
  },
  LoginText: {
    color: MyTheme.textDark,
    fontSize: 12,
    fontWeight: 700,
  },
});
