import React, { useState } from 'react';
import { t } from 'react-native-tailwindcss';
import { TextInput } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Input(props: any) {

  const [sentry, sentryState] = useState(props.sentry)
  const error= { roundness: 40 , colors: { error: 'red', primary: 'transparent'} } //6500C4

  const passwordState = () => {
    sentryState(!sentry)
  }

  const focusActions = () => {
    props.updateFieldIconColor !== undefined? props.updateFieldIconColor(true) : null
    if (props.updateServerError !== undefined)props.updateServerError();
  }

  const unfocusActions = () => {
    props.updateFieldIconColor !== undefined? props.updateFieldIconColor(false) : null
  }

  return (
    <View style={styles.wrapper}>
       <TextInput 
       theme={error}
       mode={'outlined'} 
       label={props.label} 
       secureTextEntry={sentry}
       underlineColor={'transparent'} 
       onFocus={()=> focusActions()}
       onBlur={() => unfocusActions()}
       left={<TextInput.Icon name={() =>  props.leftIcon} />} 
       right={<TextInput.Icon onPress={() => passwordState()} name={() => sentry? props.rightIcon? 
       <Icon style={{top:4}} size={25} name='eye-off' /> : null :
       props.rightIcon? <Icon style={{top:4}} size={25} name='eye' />: null} />} 
       style={[styles.input, props.error && t.borderRed500, props.style]}
        {...props}
      />
      {props.errorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
}

const styles = {
  wrapper: [t.selfStretch, t.mB5],
  input: [
    t.h11,
    t.border,
    t.selfStretch,
    t.p2,
    t.borderGray500,
    t.rounded,
    t.textBase,
    t.textGray700
  ],
  errorText: [t.mT1, t.textRed500, t.textSm]
};