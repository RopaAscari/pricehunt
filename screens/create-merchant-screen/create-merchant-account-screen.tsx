import { Dispatch } from 'redux'
import { connect } from 'react-redux';
import LockIcon from '@icons/lock-icon';
import EmailIcon from '@icons/email-icon';
import Input from '@components/input/input';
import PersonIcon from '@icons/person-icon';
import Button from '@components/button/button'; 
import Ellipse1 from '@svgcomponents/ellipse1';
import Ellipse2 from '@svgcomponents/ellipse2';
import ApiService from '@services/api-service';
import { Decoder } from '@services/jwt-decoder';
import {useForm, Controller} from 'react-hook-form';
import {RootState} from '@reducers/combined-reducers';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationScreenProp } from 'react-navigation';
import { SetUserAction } from '@actions/set-user-action';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import React, { useState, useEffect ,useReducer} from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { ValidateSessionAction } from '@actions/validate-session-action';
import { SetUserActionType, SessionAction } from '@constants/user-types';
import {DarkTheme} from '@theme/dark/create-merchant-account-dark-theme.ts';
import { LightTheme } from '@theme/light/create-hunter-account-light-theme';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
    theme: string
    navigation: NavigationScreenProp<any,any>
    reduxHunterLoginAction(user: any): void
    reduxSessionAction(session: boolean): void
}

function DashboardMerchantHunterAccount(props: Props){

    const PASSWORD_REGEX = /[0-9a-zA-Z]{5,}/;
    const CONFIRM_PASSWORD_REGEX = /^(apple)$/;
    const [signinUp, isSigninUp] = useState(false);
    const { handleSubmit, control, errors } = useForm();
    const [iconColor, SetIconColor] = useState('#5A5A5A');
    const [serverError, setServerError] = useState(false);    
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [confirmPassword, setConfirmPassword] = useState('');
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const updateFieldIconColor = (state: boolean) => {
      state? SetIconColor('#6500C4'): SetIconColor('#5A5A5A')
    }

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const navigateToMerchantHub = () => {
        props.navigation.navigate('Merchant-Hub');
    }

    const storeConfirmPassword = (confirmPassword: string) => {
        if(confirmPassword !== '') setConfirmPassword(confirmPassword)
    }

    const CreateAccount = (data: any) => {

      Keyboard.dismiss()
      isSigninUp(true)
        
      ApiService.SignUpMerchant(data)
            .then(res => res.data)
                .then(auth => {
                    if(auth.auth === true){
                    isSigninUp(false)
                    let user = Decoder(auth.token)
                    props.reduxHunterLoginAction(user)
                    props.reduxSessionAction(true)
                    navigateToMerchantHub()
                }else{
                    setServerError(true)
                    forceUpdate()
                }
        });
    }

    return(
        <View style={styles(props).body}>
            <Text style={styles(props).welcomeText}>{"\n"}Welcome! </Text>
            <Text style={styles(props).signInText}>Create an account with us today!</Text>

            <View style={styles(props).centerContainer}>

                <View style={{marginTop:hp(6)}}> 
                    <Controller 
                        rules={{  required: {value:true, message:'Business Name is required'} }}
                        name="businessName"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                         <Input
                            value={value} 
                            sentry={false}  
                            label={'  Business Name'} 
                            error={errors.businessName}      
                            style={styles(props).textField} 
                            errorText={errors?.businessName?.message}     
                            updateFieldIconColor={updateFieldIconColor}                                                                     
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<PersonIcon style={{ top: hp(1) }}color={iconColor} height={4} width={4}/>}                                              
                            />          
                        )} />

                </View>

                <View >
                    <Controller
                        rules={{  required: { value: true, message: "Business Email is required"},  
                          pattern: {
                            value: EMAIL_REGEX,
                            message: 'Invalid email address'
                          }
                        }}
                        name="businessEmail"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                            <Input
                            value={value}
                            label={'  Business Email'}  
                            error={errors.businessEmail}   
                            style={styles(props).textField}                
                            errorText={errors?.businessEmail?.message} 
                            updateFieldIconColor={updateFieldIconColor}   
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<EmailIcon style={{ top: hp(0.5) }}color={iconColor} height={5} width={5}/>}   
                          
                            />
                        )} />
                </View>

                
                <View>
                    <Controller
                        rules={{  required: { value: true, message: "Password is required"},  
                          pattern: {
                            value: PASSWORD_REGEX,
                            message: 'Minimum 5 characters'
                          }
                         }}
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                           
                            <Input
                            value={value}
                            sentry={true} 
                            label={'  Password'} 
                            storeConfirmPassword={storeConfirmPassword} 
                            error={errors.password}   
                            style={styles(props).textField}                
                            errorText={errors?.password?.message} 
                            updateFieldIconColor={updateFieldIconColor}   
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<LockIcon style={{ top: hp(0.5) }} color={iconColor} height={5} width={5}/>}
                            rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
                            />
                        )} />
                </View>

                
                <View>
                    <Controller
                        rules={{  required: { value: true, message: "Confirmed password is required"},  
                          pattern: {
                            value: CONFIRM_PASSWORD_REGEX,
                            message: 'Passwords do not match'
                          }
                        }}
                        name="confirmPassword"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                            <Input
                            value={value}
                            sentry={true} 
                            label={'  Confirm Password'}  
                            error={errors.confirmPassword}   
                            style={styles(props).textField}                
                            errorText={errors?.confirmPassword?.message} 
                            updateFieldIconColor={updateFieldIconColor}   
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<LockIcon style={{ top: hp(0.5) }} color={iconColor} height={5} width={5}/>}
                            rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
                            />
                        )} />
                </View>
            </View>

              <View style={styles(props).centerContainer}>
                    <Button onPress={handleSubmit(CreateAccount)} label="Continue" style={styles(props).continueButton}  labelStyle={styles(props).continueButtonText}/>
              </View>
                   {
                       signinUp? <ActivityIndicator style={{top:20}} color={'red'} size={hp(5)}/> : null
                   }
                <View style={styles(props).ellipseContainer}>
                    <Ellipse1/>
                </View>
                <View style={styles(props).ellipseContainer}>
                    <Ellipse2/>
                </View>
            <Text>{"\n\n\n"}</Text>
        </View>
    )
}


const styles = (props: Props) => StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: props.theme === DARK ? DarkTheme.backgroundColor:props.theme === LIGHT? LightTheme.backgroundColor: DEFAULT,
    },
    rowContainer:{
        flexDirection:'row'
    },
    centerContainer:{
        alignItems:'center'
    },
    welcomeText:{
        fontSize:hp(5),
        marginLeft: 20,
        color:props.theme === DARK ? DarkTheme.welcomeTextColor: props.theme === LIGHT? LightTheme.welcomeTextColor: DEFAULT,
        fontFamily:'Montserrat-Bold'
    },
    ellipseContainer: {  
        bottom: 0, 
        position:'absolute',
        zIndex: -1
    },
    signInText:{
        color:props.theme === DARK ? DarkTheme.signInTextColor: props.theme === LIGHT? LightTheme.signInTextColor : DEFAULT,
        fontSize:hp(2),
        marginTop:hp(3),
        marginLeft:20,
        fontWeight:'bold'
    },
    skipButton:{
        alignSelf:'flex-end', 
        right:wp(2), 
        bottom: 0, 
        position:'absolute'
    },
    skipText:{
        bottom:'10%', 
        fontSize:hp(1.7), 
        fontWeight:'bold',
        color:'#505050'
    },
    backText:{
        bottom:'10%', 
        fontSize:hp(1.7), 
        fontWeight:'bold',
        color:'#505050'
    },
    backButtton:{
        alignSelf:'flex-start', 
        left: wp(2), 
        bottom: 0, 
        position:'absolute'
    },
    textField:{
        fontSize:hp(1.55),
        height:hp(6),
        width:wp(90),
        borderRadius:25,
    },
     forgetPasswordContainer:{
        marginTop:hp(2),
        alignItems:'flex-end', 
        marginRight: (Dimensions.get('window').width - wp(90))/2
     },
     forgetPassowrdText:{
         fontSize:hp(1.7), 
         fontWeight:'bold',
         color: props.theme === DARK ? DarkTheme.forgetPassowrdText: props.theme === LIGHT ? LightTheme.forgetPassowrdText : DEFAULT,
    },
    continueButton:{
        width:wp(60),
        height:hp(5.5),
        borderRadius:35,
        marginTop:hp(5),      
        backgroundColor:'#F71735'
    },
    continueButtonText:{
        flex:1,
        color:'white',
        fontSize:hp(2.3),
        fontWeight:'bold',
        textAlign:'center', 
        textAlignVertical:'center', 
    },
    orText:{
        marginTop:hp(4),
        fontSize: hp(1.8),
        color: props.theme === DARK ? DarkTheme.orTextColor:props.theme === LIGHT? LightTheme.orTextColor: DEFAULT,
    },
    orLine:{ 
        width:150, 
        bottom:10,
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 1.5, 
    },
    facebookButton:{
        right:wp(5),
        width:wp(40),
        height:hp(5),
        borderRadius:35,
        marginTop:hp(4),      
        backgroundColor:'#345287',
        borderColor:'#F0F0F0',
        borderWidth:1
    },
    facebookButtonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    facebookButtonText:{
        //  flex:1,
          color:'white',
          fontSize:hp(1.5),
          fontWeight:'bold',
          textAlign:'center', 
          textAlignVertical:'center', 
      },
    googleButton:{
        left:wp(5),
        width:wp(40),
        height:hp(5),
        //bottom: hp(3),
        borderRadius:35,
        marginTop:hp(4),      
        backgroundColor:'white',
        borderColor:'#F0F0F0',
        borderWidth:1
    },
    googleButtonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    googleButtonText:{
      //  flex:1,
        color:'#0D0F25',
        fontSize:hp(1.5),
        fontWeight:'bold',
        textAlign:'center', 
        textAlignVertical:'center', 
    },
    TextFieldContainer: {
        flexDirection:'row'
       // backgroundColor: '#fff',
    },
})

const mapStateToProps = (state: RootState) => {
    return {
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch: Dispatch<SetUserActionType | SessionAction>) => {
    return {
     reduxHunterLoginAction:(user: any) => dispatch(SetUserAction(user)),
     reduxSessionAction:(session: any) => dispatch(ValidateSessionAction(session))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashboardMerchantHunterAccount);


