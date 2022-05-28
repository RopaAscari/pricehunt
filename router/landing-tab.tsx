import 'react-native-gesture-handler';
import * as React from 'react';
import {connect} from 'react-redux';
import MapRouter from '@router/map-router';
import Dot from 'react-native-vector-icons/Entypo';
import MessageRouter from '@router/message-router';
import FavouriteRouter from '@router/favourite-router';
import {RootState} from '@reducers/combined-reducers';
import SettingsAccountTab from '@router/settings-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import Basket from 'react-native-vector-icons/FontAwesome';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import MapViewScreen from '@screens/map-view-screen/map-view-screen';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import Location from 'react-native-vector-icons/MaterialIcons';
import Messenger from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  BackHandler,
  View,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LandingRouter from './landing-router';
import MessagingIcon from '@components/svg/icons/messaging-icon';
import LandingHomeIcon from '@components/svg/icons/landing-home-icon';
import {LocationIcon} from '@components/svg/icons/location-icon';
import LandingBasketIcon from '@components/svg/icons/landing-basket-icon';

type Props = {
  user: any;
  theme: any;
  isRouterBarVisible: boolean;
  navigation: MaterialTopTabNavigationProp<any, any>;
};

const Tab = createBottomTabNavigator();

function LandingStack(props: Props) {
  const tabOptions: BottomTabBarOptions = {
    activeTintColor: '#EB3A31',
    inactiveTintColor:
      props.theme === DARK
        ? DarkTheme.inActiveTintColor
        : props.theme === LIGHT
        ? LightTheme.inActiveTintColor
        : DEFAULT,
    style: {
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.tabStackColor
          : props.theme === LIGHT
          ? LightTheme.tabStackColor
          : DEFAULT,
      justifyContent: 'center',
      width: Dimensions.get('window').width,
      borderWidth: 2,
      borderColor: 'black',
      height: 55,
      zIndex: 10,
      elevation: 10,
    },
    showLabel: false,
    labelStyle: {fontSize: 12},
    keyboardHidesTabBar: true,
  };

  const closePricehunt = () => {
    BackHandler.exitApp();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', closePricehunt);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', closePricehunt);
    };
  }, []);

  return (
    <>
      <Tab.Navigator initialRouteName="Landing" tabBarOptions={tabOptions}>
        <Tab.Screen
          name="Basket"
          component={FavouriteRouter}
          options={{
            tabBarVisible: props.isRouterBarVisible,
            tabBarIcon: ({color, focused}) => (
              <React.Fragment>
                <LandingBasketIcon
                  style={{position: 'absolute'}}
                  color={color}
                  height={hp(2.5)}
                  width={hp(2.5)}
                />
                {focused ? (
                  <Dot
                    name="dot-single"
                    style={{top: '35%'}}
                    color="#FF4C52"
                    size={27}
                  />
                ) : null}
              </React.Fragment>
            ),
            tabBarBadge: 0, //props.user.favouriteItems.length ,
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapRouter}
          options={{
            tabBarVisible: props.isRouterBarVisible,
            tabBarIcon: ({color, focused}) => (
              <React.Fragment>
                <LocationIcon
                  style={{position: 'absolute'}}
                  height={hp(2.5)}
                  width={hp(2.5)}
                  color={color}
                />
                {focused ? (
                  <Dot
                    name="dot-single"
                    style={{top: '38%'}}
                    color="#FF4C52"
                    size={27}
                  />
                ) : null}
              </React.Fragment>
            ),
            // tabBarBadge: 1,
          }}
        />

        <Tab.Screen
          name="Landing"
          options={{
            tabBarVisible: true,//props.isRouterBarVisible,
            tabBarIcon: ({color, focused}) => (
              <React.Fragment>
                <LandingHomeIcon
                  style={{position: 'absolute'}}
                  height={hp(2.5)}
                  width={hp(2.5)}
                  color={color}
                />
                {focused ? (
                  <Dot
                    name="dot-single"
                    style={{top: '37%'}}
                    color="#FF4C52"
                    size={27}
                  />
                ) : null}
              </React.Fragment>
            ),
          }}
          component={LandingRouter}
        />

        <Tab.Screen
          name="Messenger"
          component={MessageRouter}
          options={{
            tabBarVisible: props.isRouterBarVisible,
            tabBarIcon: ({color, focused}) => (
              <React.Fragment>
                <MessagingIcon
                  style={{position: 'absolute'}}
                  height={hp(2.5)}
                  width={hp(2.5)}
                  color={color}
                />

                {focused ? (
                  <Dot
                    name="dot-single"
                    style={{top: '37%'}}
                    color="#FF4C52"
                    size={27}
                  />
                ) : null}
              </React.Fragment>
            ),
            tabBarBadge: 1,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={SettingsAccountTab}
          
          options={{
            tabBarVisible: props.isRouterBarVisible,
            tabBarIcon: ({color, focused}) => (
              <React.Fragment>
                {props.user.profilePic !== undefined ? (
                  <Image
                    source={{uri: props.user.profilePic}}
                    style={{
                      resizeMode: 'contain',
                      height: hp(2.5),
                      width: hp(2.5),
                      borderRadius: 200,
                      position: 'absolute',
                    }}
                  />
                ) : (
                  <Icon
                    name="person-pin"
                    style={{position: 'absolute'}}
                    color={color}
                    size={hp(2.7)}
                  />
                )}
                {focused ? (
                  <Dot
                    name="dot-single"
                    style={{top: '37%'}}
                    color="#FF4C52"
                    size={27}
                  />
                ) : null}
              </React.Fragment>
            ),
            tabBarBadge: 1,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
const styles = (props: Props) => StyleSheet.create({});

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    network: state.network,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isRouterBarVisible: state.router.visibility,
  };
};
export default connect(mapStateToProps)(LandingStack);
