import * as Yup from 'yup';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LockIcon from '@icons/lock-icon';
import React, { useState } from 'react';
import EmailIcon from '@icons/email-icon';
import Input from '@components/input/input';
import Button from '@components/button/button'; 
import Ellipse1 from '@svgcomponents/ellipse1';
import Ellipse2 from '@svgcomponents/ellipse2';
import ApiService from '@services/api-service';
import { Decoder } from '@services/jwt-decoder';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationScreenProp } from 'react-navigation';
import { RootState } from '@reducers/combined-reducers';
import { SetUserAction } from '@actions/set-user-action';
import { SetUserToken } from '@actions/set-user-token';
import { SetThemeActionStore } from '@constants/theme-types';
import { LIGHT, DARK, DEFAULT } from '@constants/theme-types';
import { SetUIThemeAction } from '@actions/set-ui-theme-action';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { ValidateSessionAction } from '@actions/validate-session-action';
import { DarkTheme } from '@theme/dark/hunter-signIn-screen-dark-theme';
import { LightTheme }  from '../../theme/light/merchant-signIn-screen-light-theme';
import { SetUserActionType, SessionAction, SetUserTokenAction, DashboardUserAction } from '@constants/user-types';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SelectAccountUserAction } from '@actions/select-account-user-action';
import { CreateUserPresenceInstance } from 'firebase/functions/user-presence';

type Props = {
    theme: any
    reduxAccountTypeAction(accountType: string): void
    reduxTokenAction(token: any): void
    reduxSessionAction(session: any): void
    reduxMerchantLoginAction(user: any): void
    reduxSetUIThemeAction(theme: string): void
    navigation: NavigationScreenProp<any,any>
}

function MerchantHunterSignIn(props: Props) {

    const [signingIn, isSiginingIn] = useState(false);
    const IncorrectCredentials= 'Incorrect Crendentials';
    const [serverError, setServerError] = useState(false);

     const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .required('Password is required')
    });
  
    const [iconColor, SetIconColor] = useState('#5A5A5A');
    const { handleSubmit, control, errors } = useForm({ resolver: yupResolver(validationSchema)});
    
  
    const updateFieldIconColor = (state: boolean) => {
      state? SetIconColor('#6500C4'): SetIconColor('#5A5A5A')
    }

    const updateServerError = () => {
        setServerError(false);
    }

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const navigateToMerchantHub = () => {
        props.navigation.navigate('Merchant-Hub');
    }

    const SignIn = (data: any) => {

      Keyboard.dismiss();
      isSiginingIn(true);

      ApiService.LoginMerchant(data)
            .then(res => res.data)
                .then(auth => {
                    if(auth.auth === true){
                    isSiginingIn(false);
                    let user = Decoder(auth.token)
                  //  CreateUserPresenceInstance(user._id)
                    props.reduxTokenAction(auth.token)
                    props.reduxMerchantLoginAction(user)
                    props.reduxSessionAction(true)
                    props.reduxAccountTypeAction('merchant')
                    navigateToMerchantHub()
                }else{
                    setServerError(true)
                    isSiginingIn(false);
                }
        });
    }

    return(
        <View style={styles(props).body}>
            <Text style={styles(props).welcomeText}>{"\n"}Welcome {"\n"}Back, </Text>
            <Text style={styles(props).signInText}>Sign in to continue</Text>

            <View style={styles(props).centerContainer}>
                <View style={{flexDirection:'row', marginTop:hp(7)}}> 
                    <Controller                    
                        name="username"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                         <Input
                            value={value} 
                            sentry={false}  
                            label={'  Merchant Username'} 
                            updateServerError={updateServerError}
                            error={serverError? serverError : errors.username}       
                            style={styles(props).usernameField} 
                            errorText={serverError? IncorrectCredentials:  errors?.username?.message}      
                            updateFieldIconColor={updateFieldIconColor}                                                                     
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<EmailIcon style={{ top: hp(0.5) }}color={iconColor} height={5} width={5}/>}                                              
                            />          
                        )} />

                </View>

                <View style={{bottom: 15}}>
                    <Controller                 
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                            <Input
                            value={value}
                            sentry={true} 
                            label={'  Password'}  
                            updateServerError={updateServerError}
                            error={serverError? serverError : errors.password}   
                            style={styles(props).passwordField}                
                            errorText={serverError? IncorrectCredentials:  errors?.password?.message} 
                            updateFieldIconColor={updateFieldIconColor}   
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<LockIcon style={{ top: hp(0.5) }} color={iconColor} height={5} width={5}/>}
                            rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
                            />
                        )} />
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles(props).forgetPasswordContainer}>
                    <Text style={styles(props).forgetPassowrdText}>Forgot Password?</Text>
                </View>
            </TouchableOpacity>

             <View style={styles(props).centerContainer}>
                <Button 
                label="Continue"              
                onPress={handleSubmit(SignIn)} 
                style={styles(props).continueButton}  
                labelStyle={styles(props).continueButtonText}/>          
                  {
                       signingIn? <ActivityIndicator style={{top:20}} color={'red'} size={hp(5)}/> : null
                   }
            </View>

            <View style={styles(props).ellipseContainer}>
                <Ellipse1/>
            </View>
            <View style={styles(props).ellipseContainer}>
                <Ellipse2/>
            </View>

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
        color: props.theme === DARK ? DarkTheme.welcomeTextColor: props.theme === LIGHT? LightTheme.welcomeTextColor: DEFAULT,
        fontFamily:'Montserrat-Bold'
    },
    signInText:{
        color: props.theme === DARK ? DarkTheme.signInTextColor: props.theme === LIGHT? LightTheme.signInTextColor : DEFAULT,
        fontSize:hp(2),
        marginTop:hp(3),
        marginLeft:20,
        fontWeight:'bold'
    },
    ellipseContainer: {  
        bottom: 0, 
        position:'absolute',
        zIndex: -1
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
    usernameField:{
        fontSize:hp(1.55),
      //backgroundColor:'white',
        height:hp(6),
        width:wp(90),
        borderRadius:25,
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
    },
    passwordField:{
        fontSize:hp(1.55),
        marginTop:hp(2),
       // backgroundColor:'white',
        height:hp(6),
        width:wp(90),
        borderRadius:25,
        borderWidth:0
    },
     forgetPasswordContainer:{
       // marginTop:hp(2),
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
        borderBottomColor: '#D2D2D2',
        borderBottomWidth: 1, 
        width:150, 
        bottom:10 
    },
    facebookButton:{
        right:wp(5),
        width:wp(40),
        height:hp(5),
        borderRadius:35,
        marginTop:hp(4),      
        backgroundColor:'#345287',
        borderColor:'#F0F0F0',
        // /borderWidth:1
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
    }
})


const mapStateToProps = (state: RootState) => {
    return {
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch: Dispatch<SetUserActionType | SessionAction | SetThemeActionStore | SetUserTokenAction| DashboardUserAction>  ) => {
    return {
        reduxAccountTypeAction:(accountType: string)=> dispatch(SelectAccountUserAction(accountType)),
     reduxTokenAction:(token: any) => dispatch(SetUserToken(token)),
     reduxMerchantLoginAction:(user: any) => dispatch(SetUserAction(user)),
     reduxSetUIThemeAction:(theme: string) => dispatch(SetUIThemeAction(theme)),
     reduxSessionAction:(session: any) => dispatch(ValidateSessionAction(session)),   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MerchantHunterSignIn);
