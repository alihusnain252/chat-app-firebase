import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: MyTheme.lightBackground,
    alignItems: 'stretch',
    // width:'100%',
    justifyContent: 'center',
    // alignItems:'center'
  },
});
