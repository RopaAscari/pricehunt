import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {ReactNavigationScreen} from './navigation/RootNavigator';


export  function RootNavigator() {
  return (
    <ReactNavigationScreen />
  );
}
