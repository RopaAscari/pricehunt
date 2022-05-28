import SettingsBackArrow from '@components/svg/icons/settings-back-arrow';
import * as React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';
import Card from 'react-native-vector-icons/Fontisto';

type Props = {};

export default function ManagePayment(props: Props) {
  const creditCardRef = React.useRef() as any;

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const {error, data} = creditCardRef.current.submit();
      Alert.alert('ERROR: ', JSON.stringify(error));
      Alert.alert('CARD DATA: ', JSON.stringify(data));
    }
  }, []);
  const test = () => {
    return (
      <ImageBackground
        source={require('../../assets/images/card-front.png')}
        style={{width: 400, height: 250, borderRadius: 200}}
      />
    );
  };

  return (
    <View style={styles(props).container}>
      <View style={styles(props).settingsContainer}>
        <SettingsBackArrow height={25} width={25} />
        <Text style={styles(props).settingsText}> Settings</Text>
      </View>
      <View style={[styles(props).row, {marginTop: '10%', marginLeft:'5%',}]}>
        <Card name="credit-card" size={20} color="grey" />
        <View style={{left: 5}}>
          <Text style={styles(props).menuContentHeading}> Manage Payemnts</Text>
          <Text style={styles(props).menuContentDescription}>
            {' '}
            Control all the payment method in your account
          </Text>
        </View>
      </View>
      <View style={styles(props).chatLine}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        style={styles(props).keyboardView}>
        <CreditCard
          ref={creditCardRef}
          onValidStateChange={state => console.log(state)}
          background={test()}
          labels={{holder: 'NAME', expiration: 'EXPIRATION DATE', cvv: 'CVV'}}
          placeholders={{
            number: '0000 0000 0000 0000',
            holder: 'ENTER NAME',
            expiration: 'MM/YYYY',
            cvv: '000',
          }}
        />
        <View style={{marginTop: '10%'}}>
          <Button title="Add Card" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
     // alignItems: 'center',
    //  marginRight: 10,
     // justifyContent: 'center',
    },
    keyboardView:{
      flex: 1,
      backgroundColor:'white',
      alignItems: 'center',
      right: 20,
      marginBottom:'35%',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    settingsContainer: {
      alignItems: 'center',
      marginTop: '10%',
     
      alignSelf: 'center',
      flexDirection: 'row',
    },
    settingsText: {
      fontSize: 30,
      fontFamily: 'Roboto-Medium',
      color: '#404040',
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 2,
      width: '95%',
      marginTop: '5%',
      alignSelf: 'center',
    },
    menuContentDescription: {
      color: '#A3A3A3',
    },
    menuContentHeading: {
      fontSize: 20,
      color: '#404040',
      top: '5%',
      fontWeight: 'bold',
    },
  });
