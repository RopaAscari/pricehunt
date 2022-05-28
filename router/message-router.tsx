import React from 'react';
import 'react-native-gesture-handler';
import ChatScreen from '@screens/chat-screen/chat-screen';
import { NavigationContainer } from '@react-navigation/native';
import MessageScreen from '@screens/messaging-screen/messaging-screen';
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

export default function MessageRouter(props: Props){

  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Message" component={MessageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}