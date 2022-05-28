import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import GetMerchantItems from '@components/get-merchant-items/get-merchant-items'
import EditMerchantItems from '@components/edit-merchant-items/edit-merchant-items'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

  
type Props = {
 // test: string
}

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  headerShown: false 
};

const Stack = createStackNavigator();

export default function MerchantGetItemsRouter(props: Props){

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Get" component={GetMerchantItems}/>
        <Stack.Screen name="Edit" component={EditMerchantItems}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}