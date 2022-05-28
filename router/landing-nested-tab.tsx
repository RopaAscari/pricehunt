import 'react-native-gesture-handler';
import * as React from 'react';
import {connect} from 'react-redux';
import LandingScreen from '@screens/landing-screen/landing-screen';
import SubscriptionTimeline from '@screens/subscription-timeline/subscription-timeline';
import {RootState} from '@reducers/combined-reducers';
import MapViewScreen from '@screens/map-view-screen/map-view-screen'
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

type Props = {
  user: any;
  theme: any;
  isRouterBarVisible: boolean
  navigation: MaterialTopTabNavigationProp<any, any>;
};

const Tab = createMaterialTopTabNavigator();

function LandingNestedTab(props: Props) {
  const tabOptions = {
    showLabel: false,
    swipeEnabled: true,
    style: {height: 0},
  };

  return (
    <>
      <Tab.Navigator initialRouteName="Landing" tabBarOptions={tabOptions}>
        <Tab.Screen name="Landing" component={LandingScreen} />

        <Tab.Screen name="Map" component={MapViewScreen} />
      </Tab.Navigator>
    </>
  );
}
const styles = (props: Props) => StyleSheet.create({});

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isRouterBarVisible: state.router.visibility,
    isNetworkConnected: state.network.isNetworkConnected,
  };
};
export default connect(mapStateToProps)(LandingNestedTab);
