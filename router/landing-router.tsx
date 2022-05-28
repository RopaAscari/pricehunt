import React from 'react';
import 'react-native-gesture-handler';
import LandingScreen from '@screens/landing-screen/landing-screen';
import LandingNestedTab from '@router/landing-nested-tab';

import { NavigationContainer } from '@react-navigation/native';
import MessageScreen from '@screens/messaging-screen/messaging-screen';
import PriceHubScreen from '@screens/price-hub-screen/price-hub-screen';
import HunterItemScreen from '@screens/hunter-item-screen/hunter-item-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MerchantStoreScreen from '@screens/merchant-store-screen/merchant-store-screen'
import SubscriptionTimeline  from '@screens/subscription-timeline/subscription-timeline';
import { Image, Text, TouchableOpacity, View } from 'react-native';
  
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
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

 function Landing({navigation}){
  return(
    <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Item-Screen" component={HunterItemScreen}/>
        <Stack.Screen name="Price-Hub" component={PriceHubScreen}/>
        <Stack.Screen name="Merchant-Store" component={MerchantStoreScreen}/>
        <Stack.Screen name="Message" component={MessageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function LandingRouter(props: Props){
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <View><Text style={{padding:20, fontSize:20}}>PriceHunt</Text></View> }>
        <Drawer.Screen
          name="FirstPage"
          options={{ drawerLabel: 'First page Option' }}
          component={Landing}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}