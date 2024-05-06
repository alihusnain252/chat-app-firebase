import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  forgotPasswordContainer: {
    flex: 1,
    backgroundColor: MyTheme.background,
  },
  searchInputView: {
    backgroundColor: MyTheme.primary,
    // width: '100%',
    borderRadius: 8,
    margin: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    backgroundColor: MyTheme.primary,
    color: 'white',
  },
});
