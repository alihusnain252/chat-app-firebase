import { StyleSheet, Dimensions } from 'react-native';
import { MyTheme } from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    // backgroundColor: MyTheme.background,
  },
  chatInputContainer: {
    position: 'absolute',
    bottom: 5,
    width: width - 20,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    backgroundColor: MyTheme.background,
  },
  chatInput: {
    width: '80%',
    color: MyTheme.textDark,
    paddingHorizontal: '2%',
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  IconPress: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // paddingVertical:10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: MyTheme.white,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '82%',
  },
  message: {
    color: MyTheme.black,
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  msgImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
