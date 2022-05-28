import * as Yup from 'yup';
import React, { Dispatch } from 'react';
import { TextInput } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationScreenProp } from 'react-navigation';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Input from '@components/input/input';
import LockIcon from '@components/svg/icons/lock-icon';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '@components/button/button';
import { ValidateSessionAction } from '@actions/validate-session-action';
import { connect } from 'react-redux';
import { SessionAction, SetUserActionType } from '@constants/user-types';
import { SetThemeActionStore } from '@constants/theme-types';
import { RootState } from '@reducers/combined-reducers';
import { SetUIThemeAction } from '@actions/set-ui-theme-action';
import { SIGNIN_ACCOUNT_ACTION } from '@constants/type-definitions';

type Props = {
    accountAction: any
    navigation: NavigationScreenProp<any, any>;
}

function ForgetPasswordConfirmPassword(props: Props){
    
    let holder: string | undefined | Yup.Ref

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
         confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), holder ], 'Passwords must match')
        .required('Confirm Password is required'),
      });

      const { handleSubmit, control, errors } = useForm({ resolver: yupResolver(validationSchema)});

      const changePassword = (data: any) => {
        console.log(data)
        props.navigation.navigate('D-HunterSignIn')
       // props.navigation.navigate('D-MerchantSignIn')
      }

    return (
        <View style={styles(props).body}>
      <View style={styles(props).margin}>
        <Text style={styles(props).forgetHeadingText}>Forget Password</Text>
        <Text style={styles(props).selectMethodText}>
          Reset your forgotten password to continue to your account.
        </Text>
      </View>

      <Controller
        name="newPassword"
        defaultValue=""
        control={control}
        render={({ onChange, value }) => (
            
            <Input
           // theme={error}
            value={value}
            sentry={true} 
            label={' New Password'}                   
            error={errors.newPassword}   
            style={styles(props).passwordField}                
            errorText={errors?.newPassword?.message} 
            // updateFieldIconColor={updateFieldIconColor}   
            onChangeText={(text: string) => onChange(text)}
            leftIcon={<LockIcon style={{ top: hp(0.5) }} color={'#5A5A5A'} height={5} width={5}/>}
            rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
            />
        )} />

        <Controller
            name="confirmNewPassword"
            defaultValue=""
            control={control}
            render={({ onChange, value }) => (
                
                <Input
                value={value}
                sentry={true} 
                label={'  Confirm New Password'}                   
                error={errors.confirmNewPassword}   
                style={styles(props).passwordField}                
                errorText={errors?.confirmNewPassword?.message} 
                // updateFieldIconColor={updateFieldIconColor}   
                onChangeText={(text: string) => onChange(text)}
                leftIcon={<LockIcon style={{ top: hp(0.5) }} color={'#5A5A5A'} height={5} width={5}/>}
                rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
                />
        )} />

     <Button 
     onPress={handleSubmit(changePassword)} 
     label="Continue" style={styles(props).continueButton} 
     labelStyle={styles(props).continueButtonText}/>

    </View>
    )   
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
      passwordField: {
        borderRadius: 45,
        marginLeft: 20,
        fontSize: hp(1.55),
    //   /  marginTop: hp(2),
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
        marginBottom:'10%',
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
})

const mapStateToProps = (state: RootState) => {
    return {
      theme: state.theme.theme,
      accountAction: state.dashboardAction.action
    };
  };
  
  const mapDispatchToProps = (
    dispatch: Dispatch<SetUserActionType | SessionAction | SetThemeActionStore>
  ) => {
    return {
     // reduxHunterLoginAction: (user: any) => dispatch(SetUserAction(user)),
      reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
      reduxSessionAction: (session: any) =>
        dispatch(ValidateSessionAction(session)),
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgetPasswordConfirmPassword);
  