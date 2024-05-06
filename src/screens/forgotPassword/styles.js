import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  forgotPasswordContainer: {
    flex: 1,
    backgroundColor: MyTheme.background,
  },
  forgotBody: {
    backgroundColor: MyTheme.background,
    alignItems: 'center',
  },
  forgotInputView: {
    backgroundColor: MyTheme.blue,
    width: '92%',
    borderRadius: 8,
    marginTop: '5%',
  },
  forgotInput: {
    backgroundColor: MyTheme.blue,
    color: MyTheme.white,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  descriptionText: {
    color: MyTheme.grey100,
    width: '92%',
    fontSize: 14,
    marginVertical: '3%',
  },
  sendLinkPress: {
    backgroundColor: MyTheme.yellow,
    padding: '4%',
    paddingHorizontal: '10%',
    borderRadius: 30,
    marginTop: '3%',
  },
  sendLinkText: {
    color: MyTheme.textDark,
    fontSize: 14,
    fontWeight: 700,
  },
});
