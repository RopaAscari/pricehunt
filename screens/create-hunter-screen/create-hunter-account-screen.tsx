import * as Yup from 'yup';
import { Dispatch } from 'redux'
import { connect } from 'react-redux';
import LockIcon from '@icons/lock-icon';
import EmailIcon from '@icons/email-icon';
import PersonIcon from '@icons/person-icon';
import GoogleIcon from '@icons/google-icon';
import Input from '@components/input/input';
import Button from '@components/button/button'; 
import Ellipse1 from '@svgcomponents/ellipse1';
import Ellipse2 from '@svgcomponents/ellipse2';
import ApiService from '@services/api-service';
import FacebookIcon from '@icons/facebook-icon';
import { Decoder } from '@services/jwt-decoder';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationScreenProp } from 'react-navigation';
import { RootState } from '@reducers/combined-reducers';
import { SetUserAction } from '@actions/set-user-action';
import {LIGHT, DARK, DEFAULT} from '@constants/theme-types';
import React, { useState, useEffect ,useReducer} from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { ValidateSessionAction } from '@actions/validate-session-action';
import { SetUserActionType, SessionAction } from '@constants/user-types';
import { DarkTheme } from '@theme/dark/create-hunter-account-dark-theme';
import { LightTheme } from '@theme/light/create-hunter-account-light-theme';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
    theme: string
    navigation: NavigationScreenProp<any,any>
    reduxHunterLoginAction(user: any): void
    reduxSessionAction(session: boolean): void
}

function DashboardCreateHunterAccount(props: Props){

    let holder: string | undefined | Yup.Ref

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid')
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), holder ], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const [user, setUser] = useState({}); 
    const [signinUp, isSigninUp] = useState(false);
    const { handleSubmit, control, errors } = useForm({ resolver: yupResolver(validationSchema)});
    const [iconColor, SetIconColor] = useState('#5A5A5A')
    const [serverError, setServerError] = useState(false);    
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: "825864615222-c8rr893t5h7jv054u4hb2rop1r7jcv59.apps.googleusercontent.com",
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
       // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
    })
  
    const SignInWithGoogle = async() => {
        try{ 
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn()
          if(userInfo) { setUser(userInfo) }
        }catch(error){
              if(error.code === statusCodes.SIGN_IN_CANCELLED){
                console.log("User cancelled sign in");
              } else if (error.code === statusCodes.IN_PROGRESS){
                 console.log("Loading");
              } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                console.log("PlayServices is unvailable");
              } else {
                console.log(error);
            }
         }
    }

    const updateFieldIconColor = (state: boolean) => {
      state? SetIconColor('#6500C4'): SetIconColor('#5A5A5A')
    }

    const SignInWithFacebook = () => {

    }

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const navigateToLandingScreen = () => {
        props.navigation.navigate('Landing');
    }

    const CreateAccount = (data: any) => {

     Keyboard.dismiss();
     isSigninUp(true);

      ApiService.SignUpHunter(data)
            .then(res => res.data)
                .then(auth => {
                    if(auth.auth === true){
                    isSigninUp(false);
                    let user = Decoder(auth.token)
                    props.reduxHunterLoginAction(user)
                    props.reduxSessionAction(true)
                    navigateToLandingScreen()
                }else{
                    setServerError(true)
                    forceUpdate()
                }
        });
    }

    return(

   <ScrollView>
        <View style={styles(props).body}>
            <Text style={styles(props).welcomeText}>{"\n"}Welcome! </Text>
            <Text style={styles(props).signInText}>Create an account with us today!</Text>

            <View style={styles(props).centerContainer}>

            <View style={{marginTop:hp(3)}}> 
                    <Controller 
                        name="firstName"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                         <Input
                            value={value} 
                            sentry={false}  
                            label={'  First Name'} 
                            error={errors.firstName}      
                            style={styles(props).textField} 
                            errorText={errors?.firstName?.message}     
                            updateFieldIconColor={updateFieldIconColor}                                                                     
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<PersonIcon style={{ top: hp(1) }}color={iconColor} height={4} width={4}/>}                                              
                            />          
                        )} />

                </View>

                <View > 
                    <Controller 
                        name="lastName"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                         <Input
                            value={value} 
                            sentry={false}  
                            label={'  Last Name'} 
                            error={errors.lastName}      
                            style={styles(props).textField} 
                            errorText={errors?.lastName?.message}     
                            updateFieldIconColor={updateFieldIconColor}                                                                     
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<PersonIcon style={{ top: hp(1) }}color={iconColor} height={4} width={4}/>}                                              
                            />          
                        )} />

                </View>

                <View> 
                    <Controller 
                        name="username"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                         <Input
                            value={value} 
                            sentry={false}  
                            label={'  Username'} 
                            error={errors.username}      
                            style={styles(props).textField} 
                            errorText={errors?.username?.message}     
                            updateFieldIconColor={updateFieldIconColor}                                                                     
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<PersonIcon style={{ top: hp(1) }}color={iconColor} height={4} width={4}/>}                                              
                            />          
                        )} />

                </View>

                <View >
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                            <Input
                            value={value}
                            label={'  Email'}  
                            error={errors.email}   
                            style={styles(props).textField}                
                            errorText={errors?.email?.message} 
                            updateFieldIconColor={updateFieldIconColor}   
                            onChangeText={(text: string) => onChange(text)}
                            leftIcon={<EmailIcon style={{ top: hp(0.5) }}color={iconColor} height={5} width={5}/>}   
                            //rightIcon={<Icon style={{top:4}} size={25} name="eye" />}                           
                            />
                        )} />
                </View>

                
                <View>
                    <Controller
                       // rules={{  required: { value: true, message: "Password is required"},  
                      //    pattern: {
                      //      value: PASSWORD_REGEX,
                       //     message: 'Minimum 5 characters'
                       //   }
                        // }}
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                           
                            <Input
                            value={value}
                            sentry={true} 
                            label={'  Password'}                   
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
                       // rules={{  required: { value: true, message: "Confirmed password is required"},  
                       //   pattern: {
                       //     value: CONFIRM_PASSWORD_REGEX,
                       //     message: 'Passwords do not match'
                        //  }
                     //   }}
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
                    
                    <View style={styles(props).rowContainer}>
                        <View style={styles(props).orLine}/>
                            <Text style={styles(props).orText}>  Or sign in with  </Text>
                        <View style={styles(props).orLine}/>
                    </View>

                
            <View style={{flexDirection: 'row', justifyContent:'space-between', flex:1}}>
                <TouchableOpacity style={styles(props).facebookButton} onPress={() => SignInWithFacebook()}>                                                            
                    <View style={styles(props).facebookButtonContainer}>
                        <FacebookIcon height={2} width={2}/>
                        <Text style={styles(props).facebookButtonText}>  Facebook</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles(props).googleButton} onPress={() => SignInWithGoogle()}>                                                            
                    <View style={styles(props).googleButtonContainer}>
                        <GoogleIcon height={5} width={5}/>
                        <Text style={styles(props).googleButtonText}> Google</Text>
                    </View>
                </TouchableOpacity>
            </View>

            </View>

            <View style={styles(props).ellipseContainer}>
                <Ellipse1/>
            </View>
            <View style={styles(props).ellipseContainer}>
                <Ellipse2/>
            </View>

           { /*
           <TouchableOpacity style={styles.backButtton} onPress={() => navigateBack()}>
                <View style={styles.rowContainer}>
                    <Icon name="caretleft" color="#505050"/>
                    <Text style={styles.backText}>Back </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={() => navigateToLandingScreen()}>
                <View style={styles.rowContainer}>
                    <Text style={styles.skipText}>SKIP </Text>
                    <Icon name="caretright" color="#505050"/>
                </View>
            </TouchableOpacity>*/
        
            }
            <Text>{"\n\n\n"}</Text>
        </View>
    </ScrollView>
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
     forgetPasswordText:{
         color: props.theme === DARK ? DarkTheme.forgetPassowrdText: props.theme === LIGHT ? LightTheme.forgetPassowrdText : DEFAULT,
         fontSize:hp(1.7), 
         fontWeight:'bold',
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
export default connect(mapStateToProps,mapDispatchToProps)(DashboardCreateHunterAccount);


