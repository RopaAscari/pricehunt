import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Favouritecreen from '@screens/favourite-screen/favourite-items-screen';
import HunterItemScreen from '@screens/hunter-item-screen/hunter-item-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

  
type Props = {
 // test: string
}

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  headerShown: false 
};

const Stack = createStackNavigator();

export default function FavouriteRouter(props: Props){

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Favourite-Nested" component={Favouritecreen}/>
        <Stack.Screen name="Item-Screen" component={HunterItemScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}