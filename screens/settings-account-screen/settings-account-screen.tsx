import React from 'react';
import {connect} from 'react-redux';
import HelpIcon from '@icons/help-icon';
import AboutIcon from '@icons/about-icon';
import ThemeIcon from '@icons/theme-icon';
import SecurityIcon from '@icons/security-icon';
import ApiService from '@services/api-service';
import ImagePicker from 'react-native-image-picker';
import FlashMessage from 'react-native-flash-message';
import Card from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationScreenProp} from 'react-navigation';
import {SetUserAction} from '@actions/set-user-action';
import {RootState} from '@reducers/combined-reducers';
import SettingsBackArrow from '@icons/settings-back-arrow';
import MenuSlider from '@components/menu-slider/menu-slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MoneyIcon} from '@components/svg/icons/money-icon';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import {DarkTheme} from '@theme/dark/profile-screen-dark-theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PinkMenuIcon} from '@components/svg/icons/pink-menu-icon';
import {LightTheme} from '@theme/light/profile-screen-light-theme';
import LogOutIcon from 'react-native-vector-icons/AntDesign';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  USER_PROFILE_NOT_UPDATED,
  USER_PROFILE_UPDATED,
} from '@constants/response-messages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ellipse1 from '@components/svg/components/ellipse1';
import { RemoveUserAction } from '@actions/remove-user-action';

interface User {
  _id?: string;
  email?: string;
  lastName?: string;
  username?: string;
  firstName?: string;
  profilePic?: string;
  password?: string;
  isloggenIn?: boolean;
  favouriteItems?: Array<number>;
}

interface SelectedImage {
  uri: string;
  type: string;
  base64: string;
  name: string | undefined;
}

type State = {
  reveal: boolean;
  favorite: number;
  changed: boolean;
  profilePicture: string;
};

type Props = {
  user: any;
  theme: any;
  navigation: NavigationScreenProp<any, any>;
  reduxRemoveUser(): void
  reduxUpdateProfilePhoto(updatedUser: any): void;
};

class ProfileScreen extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      favorite: 0,
      reveal: false,
      changed: false,
      profilePicture: '',
    };
  }

  componentDidMount() {}

  addProfilePhoto = () => {
    const options = {};
    const id = this.props.user._id;

    let user = {
      _id: this.props.user._id,
      email: this.props.user.email,
      lastName: this.props.user.lastName,
      username: this.props.user.username,
      firstName: this.props.user.firstName,
      profilePic: this.props.user.profilePic,
      favouriteItems: this.props.user.favouriteItems,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response) {
        const image: SelectedImage = {
          name: response.fileName,
          uri: response.uri,
          base64: response.data,
          type: 'image/jpeg',
        };
        const profile = {image, id};

        ApiService.AddProfilePhoto(profile, id)
          .then(res => res.data)
          .then(profilePic => {
            if (profilePic) {
              user.profilePic = profilePic;
              this.props.reduxUpdateProfilePhoto(user);
            } else {
              console.log('Something went wrong');
            }
          });
      }
    });
  };

  removeProfilePhoto = () => {
    let user = {
      _id: this.props.user._id,
      email: this.props.user.email,
      lastName: this.props.user.lastName,
      username: this.props.user.username,
      firstName: this.props.user.firstName,
      profilePic: this.props.user.profilePic,
      favouriteItems: this.props.user.favouriteItems,
    };

    ApiService.RemoveProfilePhoto(user._id)
      .then(res => res.data)
      .then(serverRes => {
        console.log(serverRes);
        if (serverRes.message === USER_PROFILE_UPDATED) {
          user.profilePic = undefined;
          this.props.reduxUpdateProfilePhoto(user);
        } else if (serverRes.message === USER_PROFILE_NOT_UPDATED) {
          console.log(USER_PROFILE_NOT_UPDATED);
        } else {
          console.log('Error occured');
        }
      });
  };

  navigateToThemeScreen = () => {
    this.props.navigation.navigate('Theme');
  };

  navigateToCardScreen = () => {
    this.props.navigation.navigate('Card');
  };

  logOutUser = () => {
    //this.props.reduxRemoveUser()
    this.props.navigation.navigate('D-HunterSignIn');
  }

  render() {
    const maxWidth = Dimensions.get('window').width;
    const maxHeight = Dimensions.get('window').height;
    const logoPath: string = '../../assets/images/person.png';

    return (
      <View style={styles(this.props).body}>
        <View style={styles(this.props).settingsContainer}>
          <SettingsBackArrow height={23} width={23} />
          <Text style={styles(this.props).profileText}> Settings</Text>
        </View>
        <View style={[styles(this.props).imageTopContainer, {}]}>
          <TouchableOpacity
            style={styles(this.props).ProfilePhoto}
            onPress={this.addProfilePhoto}>
            {this.props.user.profilePic != undefined ? (
              <Image
                source={{uri: this.props.user.profilePic}}
                style={styles(this.props).activePhoto}
              />
            ) : (
              <Image
                source={require(logoPath)}
                style={styles(this.props).noPhoto}
              />
            )}
          </TouchableOpacity>

          <View style={styles(this.props).row}>
            <Text style={styles(this.props).usernameText}>
              {this.props.user.username}
            </Text>
            <EditIcon
              name="square-edit-outline"
              color="#404040"
              style={styles(this.props).iconPosition}
              size={15}
            />
          </View>
        </View>
        <View style={styles(this.props).margin}>
          <TouchableNativeFeedback>
            <React.Fragment>
              <View style={styles(this.props).row}>
                <Icon
                  name="hearto"
                  size={25}
                  style={styles(this.props).secondIconPosition}
                />
                <View style={{left: 5}}>
                  <Text style={styles(this.props).menuContentHeading}>
                    {' '}
                    Favourite Items
                  </Text>
                  <Text style={styles(this.props).menuContentDescription}>
                    {' '}
                    You have currently have{' '}
                    {this.props.user.favouriteItems.length} favourite items.
                  </Text>
                </View>
              </View>
              <View style={styles(this.props).chatLine} />
            </React.Fragment>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.navigateToThemeScreen()}>
            <View style={[styles(this.props).row, {marginTop: '5%'}]}>
              <ThemeIcon height={25} width={25} />
              <View style={{left: 5}}>
                <Text style={styles(this.props).menuContentHeading}>
                  {' '}
                  Theme
                </Text>
                <Text style={styles(this.props).menuContentDescription}>
                  {' '}
                  Select between dark & light mode
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => this.navigateToCardScreen()}>
            <View style={[styles(this.props).row, {marginTop: '5%'}]}>
              <Card name="credit-card" size={20} color="grey" />
              <View style={{left: 5}}>
                <Text style={styles(this.props).menuContentHeading}>
                  {' '}
                  Manage Payments
                </Text>
                <Text style={styles(this.props).menuContentDescription}>
                  {' '}
                  Control all the payment method in your account
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={[styles(this.props).row, {marginTop: '5%'}]}>
              <SecurityIcon height={25} width={25} />
              <View style={{left: 5}}>
                <Text style={styles(this.props).menuContentHeading}>
                  {' '}
                  Security
                </Text>
                <Text style={styles(this.props).menuContentDescription}>
                  {' '}
                  Make changes to you account
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={[styles(this.props).row, {marginTop: '5%'}]}>
              <HelpIcon height={25} width={25} />
              <View style={{left: 5}}>
                <Text style={styles(this.props).menuContentHeading}> Help</Text>
                <Text style={styles(this.props).menuContentDescription}>
                  {' '}
                  Report a problem, FAQ, Contact Us, Privacy Policy
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={[styles(this.props).row, {marginTop: '5%'}]}>
              <AboutIcon height={25} width={25} />
              <View style={{left: 5}}>
                <Text style={styles(this.props).menuContentHeading}>
                  {' '}
                  About
                </Text>
                <Text style={styles(this.props).menuContentDescription}>
                  {' '}
                  Learn More about Price Hunt and what we have to offer.
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.logOutUser}>
              <View style={{alignSelf:'center', marginTop: 60, flexDirection: 'row'}}>
                    <LogOutIcon name="logout" size={30}/>
                    <Text style={styles(this.props).menuContentHeading}>
                      {' '}
                      Logout
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
        <View style={styles(this.props).ellipseContainer}>
          <Ellipse1 />
        </View>
        <View style={styles(this.props).ellipseContainer}>
          <Ellipse1 />
        </View>
      </View>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
      flex: 1,
    },
    activePhoto: {
      width: 100,
      height: 100,
      borderRadius: 200,
      resizeMode: 'contain',
    },
    margin: {
      marginTop: '5%',
      marginLeft: 20,
    },
    newFavouriteItemsText: {
      //  fontfamily:'Roboto-Bold',
      fontSize: 20,
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 2,
      width: '95%',
      marginTop: '5%',
      alignSelf: 'center',
    },
    menuContentDescription: {
      color: '#A3A3A3',
    },
    ellipseContainer: {
      bottom: 0,
      position: 'absolute',
      zIndex: -1,
    },
    settingsContainer: {
      top: 0,
      height: 80,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent:'center',
      flexDirection: 'row',
      backgroundColor: '#EB3A31',
      width: Dimensions.get('window').width,
    },
    noPhoto: {
      width: 230,
      height: 230,
      resizeMode: 'center',
    },
    imageTopContainer: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    iconPosition: {
      marginTop: '5%',
    },
    secondIconPosition: {
      marginTop: '2%',
    },
    profileText: {
      fontSize: 26,
      fontFamily: 'Roboto-Medium',
      color: 'white',
    },
    LinearGradient: {
      flex: 1,
    },
    usernameText: {
      fontSize: 25,
      marginTop: '5%',
      fontFamily: 'Roboto-Medium',
      color: '#404040',
      fontWeight: 'bold',
    },
    favoriteCountText: {
      fontSize: 20,
      color: '#F85252',
      top: '5%',
    },
    menuContentHeading: {
      fontSize: 20,
      color:
        props.theme === DARK
          ? DarkTheme.favouriteItemsText
          : props.theme === LIGHT
          ? LightTheme.favouriteItemsText
          : DEFAULT,
    //  / top: '5%',
      fontWeight: 'bold',
    },
    viewItemsText: {
      color: '#F04F4F',
      fontSize: 16,
      fontWeight: 'bold',
    },
    scrollView: {
      backgroundColor: '#F85252',
    },
    ProfilePhoto: {
      width: 100,
      height: 100,
      zIndex: -1,
      marginTop: '8%',
      // elevation:2,
      borderWidth: 1,
      borderRadius: 150,
      borderColor: '#FF5761',
      backgroundColor: 'white',
    },
    favouriteItemsButton: {
      width: 180,
      height: 60,
      elevation: 2,
      borderWidth: 1,
      borderRadius: 37,
      borderColor: '#FF5761',
      backgroundColor: 'white',
    },
    DonateButton: {
      top: 20,
      height: hp('5'),
      width: wp('26'),
      borderRadius: 25,
      backgroundColor: '#427FBC',
    },
  });

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxUpdateProfilePhoto: (updatedUser: any) =>
      dispatch(SetUserAction(updatedUser)),

      reduxRemoveUser: () =>
      dispatch(RemoveUserAction()),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
