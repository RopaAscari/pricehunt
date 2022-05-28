import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationScreenProp} from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

function ForgetPasswordScreen(props: Props) {
  const [text, selectText] = useState(false);
  const [email, selectEmail] = useState(false);

  const verifyByText = () => {
    selectText(!text);
    selectEmail(false);
  };

  const verifyByEmail = () => {
    selectEmail(!email);
    selectText(false);
  };

  const nextStep = () => {
    email
      ? props.navigation.navigate('Forget-Password-Code')
      : props.navigation.navigate('Forget-Password-Code');
  };

  return (
    <View style={styles(props).body}>
      <View style={styles(props).margin}>
        <Text style={styles(props).forgetHeadingText}>Forget Password</Text>
        <Text style={styles(props).selectMethodText}>
          Please select a method for resetting your password from the list
          below.
        </Text>
        <View style={styles(props).optionContianer}>
          <View style={styles(props).row}>
            <Text style={styles(props).optionStaticText}>Email: </Text>
            <Text style={styles(props).optionDynamicText}>
              Examp*****yahoo.com{' '}
            </Text>
            {email ? (
              <Icon
                name="checkbox-blank"
                color={'#F71735'}
                style={styles(props).checkBoxContainer}
                size={25}
                onPress={() => verifyByEmail()}
              />
            ) : (
              <Icon
                name="checkbox-blank-outline"
                color={'black'}
                style={styles(props).checkBoxContainer}
                size={25}
                onPress={() => verifyByEmail()}
              />
            )}
          </View>
          <View style={styles(props).row}>
            <Text style={styles(props).optionStaticText}>Text: </Text>
            <Text style={styles(props).optionDynamicText}>876-27*****7 </Text>
            {text ? (
              <Icon
                name="checkbox-blank"
                color={'#F71735'}
                style={styles(props).checkBoxContainer}
                size={25}
                onPress={() => verifyByText()}
              />
            ) : (
              <Icon
                name="checkbox-blank-outline"
                color={'black'}
                style={styles(props).checkBoxContainer}
                size={25}
                onPress={() => verifyByText()}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles(props).continueButton}
            onPress={() => nextStep()}>
            <Text style={styles(props).continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
    },
    margin: {
      marginLeft: 20,
    },
    row: {
      flexDirection: 'row',
      marginTop: '5%',
      //justifyContent:'space-between'
    },
    forgetHeadingText: {
      fontSize: hp(3.5),
      marginTop: '10%',
      color: 'black',
      fontFamily: 'Montserrat-Bold',
    },
    selectMethodText: {
      fontSize: hp(2),
      fontWeight: 'bold',
      color: '#747474',
      marginTop: '3%',
      //    / fontFamily:'Montserrat-Bold'
    },
    continueButton: {
      width: wp(60),
      height: hp(5.5),
      alignSelf: 'center',
      borderRadius: 35,
      marginTop: hp(5),
      backgroundColor: '#F71735',
    },
    continueButtonText: {
      flex: 1,
      color: 'white',
      fontSize: hp(2.3),
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    optionStaticText: {
      color: 'black',
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: hp(2),
    },
    optionDynamicText: {
      position: 'absolute',
      marginLeft: Dimensions.get('window').width / 4,
      color: '#747474',
      fontWeight: 'bold',
      fontSize: hp(2),
    },
    optionContianer: {
      marginTop: '5%',
    },
    checkBoxContainer: {
      marginLeft: Dimensions.get('window').width / 1.2,
    },
  });

export default ForgetPasswordScreen;
