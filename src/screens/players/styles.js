import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: MyTheme.lightBackground,
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  emailInputView: {
    backgroundColor: MyTheme.primary,
    // width: '100%',
    borderRadius: 8,
    margin: '3%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  emailInput: {
    backgroundColor: MyTheme.blue,
    borderRadius: 8,
    paddingLeft: 15,
    color: MyTheme.white,
  },
});
