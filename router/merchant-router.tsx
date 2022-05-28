import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import GetMerchantItems from '@components/get-merchant-items/get-merchant-items'
import ViewMerchantItems from '@components/view-merchant-item/view-merchant-item'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import EditMerchantItems from '@components/edit-merchant-items/edit-merchant-items'
import AddMerchantItems from '@components/add-merchant-items/add-merchant-items'
import MerchantDasboardScreen from '@screens/merchant-dashboard-screen/merchant-dashboard-screen';
import MerchantGetItemsRouter from '@components/get-merchant-items-router/get-merchant-items-router';
import MerchantChatScreen from '@screens/merchant-chat-screen/merchant-chat-screen';
import MerchantMessagingScreen from '@screens/merchant-messaging-screen/merchant-messaging-screen'
import MerchantAccountSettings from '@components/mechant-account-settings/merchant-account-settings'
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

export default function MerchantRouter(props: Props){

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Merchant-Hub" component={MerchantDasboardScreen}/>
        <Stack.Screen name="Product-List" component={GetMerchantItems}/>
        <Stack.Screen name="View-Product" component={ViewMerchantItems}/>
        <Stack.Screen name="Edit-Product" component={EditMerchantItems}/>
       {
       // <Stack.Screen name="Add-Merchant-Content" component={EditMerchantItems}/>
      }
        <Stack.Screen name="Add-Merchant-Item" component={AddMerchantItems}/>
        <Stack.Screen name="Merchant-Chat" component={MerchantChatScreen}/>
        <Stack.Screen name="Merchant-Messaging" component={MerchantMessagingScreen}/>
        <Stack.Screen name="Account" component={MerchantAccountSettings}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}