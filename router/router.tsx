import React from 'react';
import 'react-native-gesture-handler';
import LandingTab from './landing-tab';
import MerchantTab from './merchant-tab';
import { NavigationContainer } from '@react-navigation/native';
import DashboardHome from '@screens/Initial-screen/initial-screen';
import HunterItemScreen from '@screens/hunter-item-screen/hunter-item-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import DashboardSelectAccountType from '@screens/account-screen/account-type-screen';
import DashboardHunterSignIn from '@screens/hunter-signin-screen/hunter-signin-screen';
import ForgetPasswordScreen from '@screens/forget-password-screen/forget-password-screen';
import DashboardMerchantSignIn from '@screens/merchant-signin-screen/merchant-signin-screen';
import ForgetPasswordCode from '@screens/forget-password-verify-code/forget-password-verify-code';
import MerchantDashboardScreen from '@screens/merchant-dashboard-screen/merchant-dashboard-screen';
import DashboardCreateHunterAccount from '@screens/create-hunter-screen/create-hunter-account-screen';
import DashboardCreateMerchantAccount from '@screens/create-merchant-screen/create-merchant-account-screen';
import ForgetPasswordConfirmPassword from '@screens/forget-password-confirm-change/forget-password-confirm-change';
import MerchantRouter from './merchant-router';

type Props = {
 // test: string
}

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  headerShown: false ,
 // gestureEnabled: true,
  //gestureDirection: "horizontal-inverted"
};

const Stack = createStackNavigator();

export default function Router(props: Props){

  return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="D-Home" component={DashboardHome}/>
        <Stack.Screen name="D-AccountType" component={DashboardSelectAccountType}/>
        <Stack.Screen name="D-CreateHunterAccount" component={DashboardCreateHunterAccount}/>
        <Stack.Screen name="D-CreateMerchantAccount" component={DashboardCreateMerchantAccount}/>
        <Stack.Screen name="D-HunterSignIn" component={DashboardHunterSignIn}/>
        <Stack.Screen name="D-MerchantSignIn" component={DashboardMerchantSignIn}/>
        <Stack.Screen name="Forget-Password" component={ForgetPasswordScreen}/>
        <Stack.Screen name="Forget-Password-Code" component={ForgetPasswordCode}/>
        <Stack.Screen name="Forget-Password-Confirm" component={ForgetPasswordConfirmPassword}/>
        <Stack.Screen name="Landing" component={LandingTab}  />
        <Stack.Screen name="Merchant-Hub" component={MerchantRouter}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}