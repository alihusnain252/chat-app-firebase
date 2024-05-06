import { StyleSheet, Dimensions } from 'react-native';
import { MyTheme } from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  createProfileContainer: {
    flex: 1,
    backgroundColor: MyTheme.background,
    alignItems: 'center',
  },
  createProfileHeading: {
    width: '92%',
    padding: '5%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  createProfileHeadingText: {
    color: MyTheme.textDark,
    fontWeight: 500,
    fontSize: 24,
  },
  titleDescriptionText: {
    width: '92%',
    color: MyTheme.textDark,
    fontWeight: 500,
    fontSize: 14,
    padding: '5%',
    paddingVertical: 0,
  },
  imageContainer: {
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  imageView: {
    width: 120,
    height: 120,
    backgroundColor: MyTheme.grey200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  ProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputsView: {
    width: '92%',
    backgroundColor: MyTheme.blue,
    borderRadius: 8,
    marginVertical: '1%',
  },
  zipCityContainer: {
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    backgroundColor: MyTheme.background,
    borderRadius: 8,
    marginVertical: '1%',
  },
  smallInputView: {
    width: '48%',
    backgroundColor: MyTheme.background,
    borderRadius: 8,
    marginVertical: '1%',
  },
  inputs: {
    width: '100%',
    backgroundColor: MyTheme.primary,
    borderRadius: 8,
    color: MyTheme.textPrimary,
    paddingHorizontal: 10,
  },
  smallInputs: {
    width: '40%',
    backgroundColor: MyTheme.blue,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  textArea: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: MyTheme.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: MyTheme.black,
    marginVertical: '3%',
    padding: 10,
    color:MyTheme.textDark,
    textAlignVertical: 'top'
  },
  socialLinksContainer: {
    width: '92%',
    alignSelf: 'center',
  },
  socialLinksView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    width: 20,
    height: 20,
  },
  linkInput: {
    marginLeft: '3%',
    borderBottomWidth: 1,
    borderBottomColor: MyTheme.black,
    width: '90%',
    color:MyTheme.textDark
  },
  completeView: {
    alignSelf: 'center',
    backgroundColor: MyTheme.yellow,
    margin: '5%',
    padding: '3%',
    paddingHorizontal: '10%',
    borderRadius: 50,
  },
  completeText: {
    color: MyTheme.textDark,
    fontSize: 16,
    fontWeight: 700,
  },
});
