import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {Checkbox} from 'react-native-paper';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '@reducers/combined-reducers';
import {DashboardAction} from '@constants/user-types';
import Icon from 'react-native-vector-icons/AntDesign';
import {SetThemeActionStore} from '@constants/theme-types';
import {Modal, Portal, Provider} from 'react-native-paper';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import {SetUIThemeAction} from '@actions/set-ui-theme-action';
import {DarkTheme} from '@theme/dark/initial-screen-dark-theme';
import {LightTheme} from '@theme/light/initial-screen-light-theme';
import {selectAccountAction} from '@actions/select-account-action';
import BlackPriceHuntLogo from '@svgcomponents/black-price-hunt-logo';
import WhitePriceHuntLogo from '@svgcomponents/white-price-hunt-logo';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
  navigation: NavigationScreenProp<any, any>;
  reduxSetUIThemeAction(theme: string): void;
  reduxSelectionAccountAction(accontType: string): void;
};

function DashboardHome(props: Props) {
  const lightPath = '../../assets/images/light.png';
  const darkPath = '../../assets/images/dark.png';

  const [visible, setVisible] = React.useState(false);
  const [checkedLightTheme, setLightThemeChecked] = React.useState(false);
  const [checkedDarkTheme, setDarkThemeChecked] = React.useState(false);

  useEffect(() => {
    showModal();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  /**
   * Description - Sets the light theme state of the application
   */
  const SetLightUITheme = () => {
    setLightThemeChecked(!checkedLightTheme);
    setDarkThemeChecked(false);
    props.reduxSetUIThemeAction(LIGHT);
  };

   /**
   * Description - Sets the light theme state of the application
   */
  const SetDarkUITheme = () => {
    setDarkThemeChecked(!checkedDarkTheme);
    setLightThemeChecked(false);
    props.reduxSetUIThemeAction(DARK);
  };

  const navigateToCreateAccount = () => {
    props.reduxSelectionAccountAction(CREATE_ACCOUNT_ACTION);
    props.navigation.navigate('D-AccountType');
  };

  const navigateToSignInAccount = () => {
    props.reduxSelectionAccountAction(SIGNIN_ACCOUNT_ACTION);
    props.navigation.navigate('D-AccountType');
  };

  const navigateToLandingScreen = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <View style={styles(props).body}>

      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles(props).modalContainer}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat-Bold',
                fontSize: 17,
              }}>
              Choose your Theme{'\n'}
            </Text>
            <View
              style={[
                styles(props).rowContainer,
                {justifyContent: 'space-between'},
              ]}>
              <Image
                source={require(lightPath)}
                style={{height: 290, width: 140}}
              />
              <Image
                source={require(darkPath)}
                style={{height: 290, width: 140}}
              />
            </View>
            <View
              style={[
                styles(props).rowContainer,
                {justifyContent: 'space-between'},
              ]}>
              <View style={[styles(props).rowContainer]}>
                <Text style={{top: 7, fontFamily: 'Montserrat-Bold'}}>
                  Light Mode
                </Text>
                <Checkbox
                  status={checkedLightTheme ? 'checked' : 'unchecked'}
                  onPress={() => {
                    SetLightUITheme();
                  }}
                />
              </View>

              <View style={[styles(props).rowContainer]}>
                <Text style={{top: 7, fontFamily: 'Montserrat-Bold'}}>
                  Dark Mode
                </Text>
                <Checkbox
                  status={checkedDarkTheme ? 'checked' : 'unchecked'}
                  onPress={() => {
                    SetDarkUITheme();
                  }}
                />
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={styles(props).row}>
          <View style={styles(props).logoTextContainer}>
            <Text style={styles(props).PriceText}>Price </Text>
            <Text style={styles(props).HuntText}>Hunt</Text>
          </View>
          <View style={styles(props).logoImageContainer}>
            {props.theme === DARK ? (
              <WhitePriceHuntLogo height={35} width={35} />
            ) : (
              <BlackPriceHuntLogo height={35} width={35} />
            )}
          </View>
        </View>
        <View style={styles(props).sloganContainer}>
          <Text style={styles(props).sloganText}>Let us help you save!</Text>
        </View>
        <View style={styles(props).buttonContainer}>
          <TouchableOpacity
            style={styles(props).createAccountButton}
            onPress={() => navigateToCreateAccount()}>
            <Text style={styles(props).createAccountText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(props).signInButton}
            onPress={() => navigateToSignInAccount()}>
            <Text style={styles(props).signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles(props).skipButton}
          onPress={() => navigateToLandingScreen()}>
          <View style={styles(props).rowContainer}>
            <Text style={styles(props).skipText}>SKIP </Text>
            <Icon name="caretright" color="#505050" />
          </View>
        </TouchableOpacity>
      </Provider>
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
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      height: hp(40),
      width: wp(80),
      alignSelf: 'center',
      borderRadius: 25,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    row: {
      marginTop: hp(15),
      justifyContent: 'center',
      flexDirection: 'row',
    },
    logoTextContainer: {
      flexDirection: 'row',
      transform: [{rotate: '270deg'}],
      left: 70,
      top: 11,
    },
    logoImageContainer: {
      // right: Dimensions.get('window').width / 2
    },
    PriceText: {
      fontSize: hp(3),
      color:
        props.theme === DARK
          ? DarkTheme.priceTextColor
          : props.theme === LIGHT
          ? LightTheme.priceTextColor
          : DEFAULT,
      textAlignVertical: 'center',
    },
    HuntText: {
      fontSize: hp(3),
      color:
        props.theme === DARK
          ? DarkTheme.huntTextColor
          : props.theme === LIGHT
          ? LightTheme.huntTextColor
          : DEFAULT,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      left: 10,
    },
    sloganContainer: {
      marginTop: hp(6),
      alignItems: 'center',
    },
    sloganText: {
      fontSize: hp(2.6),
      color:
        props.theme === DARK
          ? DarkTheme.sloganTextColor
          : props.theme === LIGHT
          ? LightTheme.sloganTextColor
          : DEFAULT,
    },
    createAccountButton: {
      width: wp(60),
      height: hp(5),
      borderRadius: 35,
      marginTop: hp(10),
      backgroundColor: '#F71735',
    },
    signInButton: {
      width: wp(60),
      height: hp(5),
      marginTop: hp(2),
      borderRadius: 35,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.signInButtonColor
          : props.theme === LIGHT
          ? LightTheme.signInButtonColor
          : DEFAULT,
    },
    createAccountText: {
      flex: 1,
      color: 'white',
      fontSize: hp(2.1),
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    signInText: {
      flex: 1,
      color:
        props.theme === DARK
          ? DarkTheme.signInTextColor
          : props.theme === LIGHT
          ? LightTheme.signInTextColor
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
      fontWeight: 'bold',
      fontSize: hp(1.5),
      color:
        props.theme === DARK
          ? DarkTheme.skipTextColor
          : props.theme === LIGHT
          ? LightTheme.skipTextColor
          : DEFAULT,
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch<DashboardAction | SetThemeActionStore>,
) => {
  return {
    reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
    reduxSelectionAccountAction: (accountType: string) =>
      dispatch(selectAccountAction(accountType)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardHome);
