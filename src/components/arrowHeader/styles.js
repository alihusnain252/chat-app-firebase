import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: MyTheme.background,
    borderBottomWidth: 1,
    borderBottomColor: MyTheme.border,
  },
  arrowPress: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  leftArrow: {
    width: 20,
    height: 20,
  },
  delete: {
    width: 25,
    height: 25,
  },
  heading: {
    color: MyTheme.black,
    fontSize: 14,
    fontWeight: 500,
  },
  textView: {
    backgroundColor: MyTheme.background,
    width: '80%',
    paddingHorizontal: '4%',
  },
});
