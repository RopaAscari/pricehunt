import React from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ThemeScreen from '@screens/select-theme-screen/select-theme-screen'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ManagePaymentsScreen from '@screens/manage-payment-screen/manage-payment-screen';
import SettingsAccountScreen from '@screens/settings-account-screen/settings-account-screen';
import DashboardHunterSignIn from '@screens/hunter-signin-screen/hunter-signin-screen';
type Props = {
 // test: string
}

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  headerShown: false 
};

const Stack = createStackNavigator();

export default function SecurityRouter(props: Props){

  const heading = () => {
    return (
      <Text style={{top: 49}}>Settings</Text>
    )
  }

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Settings" component={SettingsAccountScreen} options={{ headerTitle: props => heading() }} />
        <Stack.Screen name="Theme" component={ThemeScreen}/>
        <Stack.Screen name="Card" component={ManagePaymentsScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}