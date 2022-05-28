import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootState} from '@reducers/combined-reducers';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import WhitePriceHuntLogo from '@svgcomponents/white-price-hunt-logo';
import BlackPriceHuntLogo from '@svgcomponents/black-price-hunt-logo';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DarkTheme} from '@theme/dark/account-type-screen-dark-theme';
import {LightTheme} from '@theme/light/account-type-screen-light-theme';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {
  CREATE_ACCOUNT_ACTION,
  SIGNIN_ACCOUNT_ACTION,
} from '@constants/type-definitions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  theme: any;
  accountAction: string;
  navigation: MaterialTopTabNavigationProp<any, any>;
};

function DashboardSelectAccountType(props: Props) {
  const navigateToHunter = () => {
    if (props.accountAction === CREATE_ACCOUNT_ACTION) {
      props.navigation.navigate('D-CreateHunterAccount');
    } else if (props.accountAction === SIGNIN_ACCOUNT_ACTION) {
      props.navigation.navigate('D-HunterSignIn');
    }
  };

  const navigateToMerchant = () => {
    if (props.accountAction === CREATE_ACCOUNT_ACTION) {
      props.navigation.navigate('D-CreateMerchantAccount');
    } else if (props.accountAction === SIGNIN_ACCOUNT_ACTION) {
      props.navigation.navigate('D-MerchantSignIn');
    }
  };

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToLandingScreen = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <View style={styles(props).body}>

      <View style={styles(props).row}>
        <View style={styles(props).logoContainer}>
          <Text style={styles(props).PriceText}>Price </Text>
          <Text style={styles(props).HuntText}>Hunt</Text>
        </View>
        {props.theme === DARK ? (
          <WhitePriceHuntLogo height={15} width={15} />
        ) : (
          <BlackPriceHuntLogo height={15} width={15} />
        )}
      </View>
      <View style={styles(props).accountTypeContainer}>
        <Text style={styles(props).accountTypeText}>Select Account Type</Text>
      </View>
      <View style={styles(props).buttonContainer}>
        <TouchableOpacity
          style={styles(props).HunterAccountButton}
          onPress={() => navigateToHunter()}>
          <Text style={styles(props).HunterAccountText}>Hunter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(props).MercantAccountButton}
          onPress={() => navigateToMerchant()}>
          <Text style={styles(props).MerchantAccountText}>Merchant</Text>
        </TouchableOpacity>
      </View>
      {/* 
      <TouchableOpacity style={styles(props).backButtton} onPress={() => navigateBack()}>
        <View style={styles(props).rowContainer}>
            <Icon name="caretleft" color="#505050"/>
            <Text style={styles(props).backText}>Back </Text>
        </View>
      </TouchableOpacity> 
     */}
      <TouchableOpacity
        style={styles(props).skipButton}
        onPress={() => navigateToLandingScreen()}>
        <View style={styles(props).rowContainer}>
          <Text style={styles(props).skipText}>SKIP </Text>
          <Icon name="caretright" color="#505050" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    row: {
      top: hp(10),
      right: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoContainer: {
      flexDirection: 'row',
      transform: [{rotate: '270deg'}],
      left: 35,
    },
    PriceText: {
      fontSize: hp(1.5),
      color:
        props.theme === DARK
          ? DarkTheme.priceTextColor
          : props.theme === LIGHT
          ? LightTheme.priceTextColor
          : DEFAULT,
      textAlignVertical: 'center',
    },
    HuntText: {
      fontSize: hp(1.5),
      color:
        props.theme === DARK
          ? DarkTheme.huntTextColor
          : props.theme === LIGHT
          ? LightTheme.huntTextColor
          : DEFAULT,
      fontWeight: 'bold',
      textAlignVertical: 'center',
    },
    accountTypeContainer: {
      marginTop: hp(6),
      alignItems: 'center',
    },
    accountTypeText: {
      marginTop: hp(20),
      fontSize: hp(2.6),
      color:
        props.theme === DARK
          ? DarkTheme.accountTypeTextColor
          : props.theme === LIGHT
          ? LightTheme.accountTypeTextColor
          : DEFAULT,
    },
    HunterAccountButton: {
      width: wp(60),
      height: hp(5),
      borderRadius: 35,
      marginTop: hp(10),
      backgroundColor: '#F71735',
    },
    MercantAccountButton: {
      width: wp(60),
      height: hp(5),
      marginTop: hp(3.5),
      borderRadius: 35,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.merchantAccountButtonColor
          : props.theme === LIGHT
          ? LightTheme.merchantAccountButtonColor
          : DEFAULT,
    },
    HunterAccountText: {
      flex: 1,
      color:
        props.theme === DARK
          ? DarkTheme.hunterAccountTextColor
          : props.theme === LIGHT
          ? LightTheme.hunterAccountTextColor
          : DEFAULT,
      fontSize: hp(2.1),
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    MerchantAccountText: {
      flex: 1,
      color:
        props.theme === DARK
          ? DarkTheme.merchantAccountTextColor
          : props.theme === LIGHT
          ? LightTheme.merchantAccountTextColor
          : DEFAULT,
      fontSize: hp(2.1),
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
    },
    skipButton: {
      alignSelf: 'flex-end',
      right: wp(2),
      bottom: 0,
      position: 'absolute',
    },
    skipText: {
      bottom: '10%',
      fontSize: hp(1.7),
      fontWeight: 'bold',
      color:
        props.theme === DARK
          ? DarkTheme.skipTextColor
          : props.theme === LIGHT
          ? LightTheme.skipTextColor
          : DEFAULT,
    },
    backText: {
      bottom: '10%',
      fontSize: hp(1.7),
      fontWeight: 'bold',
      color:
        props.theme === DARK
          ? DarkTheme.backTextColor
          : props.theme === LIGHT
          ? LightTheme.backTextColor
          : DEFAULT,
    },
    backButtton: {
      alignSelf: 'flex-start',
      left: wp(2),
      bottom: 0,
      position: 'absolute',
    },
  });

const mapStatetoProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
    accountAction: state.dashboardAction.action,
  };
};
export default connect(mapStatetoProps)(DashboardSelectAccountType);
