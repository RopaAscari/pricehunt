import 'react-native-gesture-handler';

import * as React from 'react';
import {Text, Alert, View} from 'react-native';
import { Swing } from 'react-native-animated-spinkit'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MerchantMessageScreen from '@screens/merchant-messaging-screen/merchant-messaging-screen'
import ViewStatistics from '@components/view-statistics/view-statistics';
import ManagePromotions from '@components/manage-promotions/manage-promotions';
import AddMerchantItems from '@components/add-merchant-items/add-merchant-items';
//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MerchantAccount from '@components/mechant-account-settings/merchant-account-settings';
import { createBottomTabNavigator, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import MerchantGetItemsRouter from '@components/get-merchant-items-router/get-merchant-items-router';
import { RootState } from '@reducers/combined-reducers';
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

type Props = {
  isRouterBarVisible: boolean
}

 export function MerchantStack(props: Props) {
  return (
    <>
      <View style={{backgroundColor: 'white', alignItems: 'center'}}>
        <View style={{marginTop: 20, alignItems: 'center', flexDirection:'row'}}>
          <Swing size={48} color="#0D0F25"/>
          <Text style={{marginBottom: 30, fontSize: 20, top: 10, color:"#0D0F25"}}>  Courts</Text>
        </View>
      </View>
      <Tab.Navigator
        tabBarPosition={'top'}
        initialRouteName="View"
        //swipeEnabled={false}
        //springVelocityScale={1}
        tabBarOptions={
          {
            //  showLabel:false,
            //  indicatorStyle:{ backgroundColor: 'transparent' },
            // style: { bottom: 0 }
          }
        }>
        <Tab.Screen
          name="View"
          component={MerchantGetItemsRouter}
          options={
            {
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="home" color={color} size={size} />
              // ),
            }
          }
        />
        <Tab.Screen
          name="Add"
          component={AddMerchantItems}
          options={{
            tabBarLabel: 'Add Items',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={ViewStatistics}
          options={{
            tabBarLabel: 'Stats',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="Promotions"
          component={MerchantMessageScreen}
          options={{
            tabBarLabel: 'Chats',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={MerchantAccount}
          options={{
            tabBarLabel: 'Account',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
const mapStateToProps = (state: RootState) => {
  return {
    isRouterBarVisible: state.router.visibility,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (
  //dispatch: Dispatch<SetUserActionType | SessionAction | SetThemeActionStore>
) => {
  return {
   // reduxHunterLoginAction: (user: any) => dispatch(SetUserAction(user)),
   // reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
   //// reduxSessionAction: (session: any) =>
    //  dispatch(ValidateSessionAction(session)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantStack);
