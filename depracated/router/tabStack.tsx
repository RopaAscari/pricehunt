import 'react-native-gesture-handler';

import * as React from 'react';
import {Text, Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GetMerchantItems from '../components/GetMerchantItems/getMerchantItems';
import EditMerchantItems from '../components/EditMerchantItems/editMerchantItems'
import AddMerchantItems from '../components/AddMerchantItems/addMerchantItems';
import ManagePromotions from '../components/ManagePromotions/managePromotions';
import ViewStatistics from '../components/ViewStatistics/viewStatistics'

const Tab = createMaterialTopTabNavigator();

export default function TabStack() {
    return (
      <>
        <Tab.Navigator 
        initialRouteName="View"
        swipeEnabled={false}
        springVelocityScale={1}
        tabBarOptions={{
          showLabel:false,
          indicatorStyle:{ backgroundColor: 'transparent' },
          style: { backgroundColor: 'transparet', elevation: 0 } 
        }}>
        <Tab.Screen
          name="View"
          component={GetMerchantItems}
          options={{
     
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            // ),
          }}  />
        <Tab.Screen
          name="Add"
          component={AddMerchantItems}
          options={{
            

            tabBarLabel: 'Add Items',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }} />
          <Tab.Screen
          name="Statistics"
          component={ViewStatistics}
          options={{
            tabBarLabel: 'Stats',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }} />
          <Tab.Screen
          name="Edit"
          component={EditMerchantItems}
          options={{
            tabBarLabel: 'Edit Items',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }} />
          <Tab.Screen
          name="Promotions"
          component={ManagePromotions}
          options={{
            tabBarLabel: 'Promo',
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="settings" color={color} size={size} />
            // ),
          }} />
      </Tab.Navigator>
    </>
    );
  }