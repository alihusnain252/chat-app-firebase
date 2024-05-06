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
  heading: {
    color: MyTheme.textPrimary,
    fontSize: 18,
    fontWeight: 600,
  },
});
