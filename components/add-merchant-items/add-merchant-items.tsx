import 'react-native-gesture-handler';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Text, Alert, View} from 'react-native';
import { RootState } from '@reducers/combined-reducers';
import StepIndicator from 'react-native-step-indicator';
import { SetItemStepStore } from '@constants/item-types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SetItemStepAction } from '@actions/set-add-item-progress';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddItemName from '@components/add-merchant-item-name/add-merchant-item-name';
import AddItemPrice from '@components/add-merchant-item-price/add-merchant-item-price';
import AddItemImages from '@components/add-merchant-item-images/add-merchant-item-images';
import MerchantItemFinal from '@components/add-merchant-item-final/add-merchant-item-final';
import SelectItemType from '@components/select-merchant-item-type/select-merchant-item-type';
import AddMerchantItemStart from '@components/add-merchant-item-start/add-merchant-item-start';
import ConfirmAddMerchantItem from '@components/conifrm-add-merchant-item/conifrm-add-merchant-item'
import AddItemDescription from '@components/add-merchant-item-description/add-merchant-item-description';

const Tab = createMaterialTopTabNavigator();

type Props = {
  step: any
  reduxStepItemAction: (step: number) => void
}

function AddMerchantItems(props: Props) {

 // const [position, changePosition] = React.useState(0)

 //props.reduxStepItemAction(0)
  const labels = [
    'Start',
    'Add Name',
    'Add Price',
    'Select type',
    'Add Description',
    'Add Images',
    'Finish'
  ];

  const customStyles = {
    stepCount: 6,
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#F71735',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#F71735',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#F71735',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#F71735',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#F71735',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 15,
    labelFontFamily:'Roboto',
    currentStepLabelColor: '#F71735',
  };

  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <View style={{ marginTop: 40}}>
          <StepIndicator
            stepCount={7}
            customStyles={customStyles}
            currentPosition={props.step}
            labels={labels}
          />
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Add-Start"
        swipeEnabled={false}
        springVelocityScale={1}
        tabBarOptions={{
          showLabel: false,
          indicatorStyle: {backgroundColor: 'transparent'},
          style: {backgroundColor: 'white', elevation: 0},
        }}>
        <Tab.Screen
          name="Add-Start"
          component={AddMerchantItemStart}
          options={
            {
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="home" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Add-Name"
          component={AddItemName}
          options={
            {
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="home" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Add-Price"
          component={AddItemPrice}
          options={
            {
              // tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Select-Type"
          component={SelectItemType}
          options={
            {
              //tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Add-Description"
          component={AddItemDescription}
          options={
            {
              //tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Add-Images"
          component={AddItemImages}
          options={
            {
              //tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />

      <Tab.Screen
          name="Confirm-Add"
          component={ConfirmAddMerchantItem}
          options={
            {
              //tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />

        <Tab.Screen
          name="Final"
          component={MerchantItemFinal}
          options={
            {
              //tabBarLabel: 'Add Items',
              // tabBarIcon: ({ color, size }) => (
              //   <MaterialCommunityIcons name="settings" color={color} size={size} />
              // ),
            }
          }
        />
      </Tab.Navigator>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    step: state.step.step,
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isNetworkConnected: state.network.isNetworkConnected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetItemStepStore>) => {
  return {
    reduxStepItemAction: (step: number) => dispatch(SetItemStepAction(step)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMerchantItems);

