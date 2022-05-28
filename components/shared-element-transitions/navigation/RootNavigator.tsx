import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from 'react-native';

//import { createStackNavigator } from '@react-navigation/stack';


const screens = {
  Home :HomeScreen,
  Details:DetailScreen,
};

function isTabBarVisible(navigation: any): boolean {
  const currentRoute =
    navigation.state.routes[navigation.state.routes.length - 1];
  switch (currentRoute.routeName) {
    case 'Home':
    case 'Details':
    case 'Pager':
      return false;
    default:
      return true;
  }
}

const Stack =  createSharedElementStackNavigator(
  createStackNavigator,
  {
    ...screens,
  },
  {
    initialRouteName: 'Home',
    //transitionConfig: () => fadeIn(5000),
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'Home',
      tabBarVisible: isTabBarVisible(navigation),
    }),
    transitionConfig: Platform.OS === 'android' ? () => fromRight() : undefined,
  }
);

export const tabNavigator = createBottomTabNavigator({
  stack: Stack,
  })
const AppContainer = createAppContainer(tabNavigator);


export class ReactNavigationScreen extends React.Component {
  render() {
    return (
        <AppContainer />
     
    );
  }
}

function fromRight() {
  throw new Error('Function not implemented.');
}

