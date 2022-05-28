import React,{useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationScreenProp} from 'react-navigation';
import {TextInput} from 'react-native-paper';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

function ForgetPasswordCode(props: Props) {
  
  const [code, getCode] = useState('');
  const error = {roundness: 40, colors: {error: 'red', primary: 'transparent'}};

  const nextStep = () => {
      props.navigation.navigate('Forget-Password-Confirm')
  };

  return (
    <View style={styles(props).body}>
      <View style={styles(props).margin}>
        <Text style={styles(props).forgetHeadingText}>Forget Password</Text>
        <Text style={styles(props).selectMethodText}>
          Reset your forgotten password to continue to your account.
        </Text>
      </View>
      <TextInput
        label={'Enter Code'}
        mode={'outlined'}
        onChangeText={(val) => getCode(val)}
        style={styles(props).codeField}
        theme={error}
      />
      <TouchableOpacity
        style={styles(props).continueButton}
        onPress={() => nextStep()}>
        <Text style={styles(props).continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: 'white',
    },
    margin: {
      marginLeft: 20,
    },
    codeField: {
      borderRadius: 45,
      marginLeft: 20,
      fontSize: hp(1.55),
      marginTop: hp(2),
      height: hp(6),
      width: wp(90),
      fontFamily: 'Montserrat-Bold',
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
  });

export default ForgetPasswordCode;
