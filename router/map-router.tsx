import React from 'react';
import 'react-native-gesture-handler';
import MapScreen from '@screens/map-view-screen/map-view-screen';
import { NavigationContainer } from '@react-navigation/native';
import MerchantStoreScreen from '@screens/merchant-store-screen/merchant-store-screen'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
  
type Props = {
 // test: string
}

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  headerShown: false ,
  gestureEnabled: true,
  //gestureDirection: "horizontal"
};

const Stack = createStackNavigator();

export default function MapRouter(props: Props){

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="Merchant-Store" component={MerchantStoreScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}