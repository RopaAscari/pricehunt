import * as Yup from "yup";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import LockIcon from "@icons/lock-icon";
import EmailIcon from "@icons/email-icon";
import GoogleIcon from "@icons/google-icon";
import Input from "@components/input/input";
import Button from "@components/button/button";
import Ellipse1 from "@svgcomponents/ellipse1";
import Ellipse2 from "@svgcomponents/ellipse2";
import ApiService from "@services/api-service";
import { Decoder } from "@services/jwt-decoder";
import FingerPrint from "react-native-vector-icons/Ionicons";
import FacebookIcon from "@icons/facebook-icon";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@reducers/combined-reducers";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationScreenProp } from "react-navigation";
import { SetUserAction } from "@actions/set-user-action";
import Biometrics from 'react-native-biometric-identification';
import { SetThemeActionStore } from "@constants/theme-types";
import { LIGHT, DARK, DEFAULT } from "@constants/theme-types";
import { SetUIThemeAction } from "@actions/set-ui-theme-action";

//import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { DarkTheme } from "@theme/dark/hunter-signIn-screen-dark-theme";
import { ValidateSessionAction } from "@actions/validate-session-action";
import { LightTheme } from "@theme/light/hunter-signIn-screen-light-theme";
import { CreateUserPresenceInstance } from '../../firebase/functions/user-presence'
import { SetUserActionType, SessionAction, DashboardAction, DashboardUserAction } from "@constants/user-types";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SelectAccountUserAction } from "@actions/select-account-user-action";

type Props = {
  theme: any
  reduxAccountTypeAction(accountType: string): void
  reduxSessionAction(session: any): void
  reduxHunterLoginAction(user: any): void
  reduxSetUIThemeAction(theme: string): void
  navigation: NavigationScreenProp<any,any>
};

function DashboardHunterSignIn(props: Props) {
    
  const [serverError, setServerError] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const [user, setUser] = useState({});
  const IncorrectCredentials = "Incorrect Username/Password";
  const [signingIn, isSiginingIn] = useState(false);
  const [iconColor, SetIconColor] = useState("#5A5A5A");
  const { handleSubmit, control, errors, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
   // SignIn('')
   navigateToLandingScreen();
  /*  GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "825864615222-c8rr893t5h7jv054u4hb2rop1r7jcv59.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId: "", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });*/
  },[]);

  const SignInWithGoogle = async () => {
    /*try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        setUser(userInfo);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled sign in");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Loading");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("PlayServices is unvailable");
      } else {
        console.log(error);
      }
    }*/
  };

  const biometricLogin = () => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    Biometrics.isSupported(optionalConfigObject)
    .then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
      } else {
         Biometrics.authenticate('Scan your fingerprint', optionalConfigObject)
        .then(successOptions => {
          const user = { username:'ropadxn', password: 'dantalia'}
          SignIn(user)
          console.log(successOptions)
          // Success code
        })
        .catch(error => {
          console.log(error)
          // Failure code
        });
      }
    })
    .catch(error => {
      // Failure code
      console.log(error);
    });
  }

  const updateFieldIconColor = (state: boolean) => {
    state ? SetIconColor("#6500C4") : SetIconColor("#5A5A5A");
  };

  const updateServerError = () => {
    setServerError(false);
  };

  const SignInWithFacebook = () => {};

  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToLandingScreen = () => {
    props.navigation.navigate("Landing");
  };

  const forgetPassword = () => {
    props.navigation.navigate("Forget-Password");
  }

  const SignIn = (data: any) => {
  //  navigateToLandingScreen();
    const user = { username:'Ropadon', password: '12345'}

    Keyboard.dismiss()
    isSiginingIn(true);
   
    ApiService.LoginHunter(user)
      .then((res) => res.data)
      .then((auth) => {
        if (auth.auth === true) {
          isSiginingIn(false);
          let user = Decoder(auth.token);
         // console.log('USER',user)
         // CreateUserPresenceInstance(user._id)
          props.reduxHunterLoginAction(user);
          props.reduxSessionAction(true);
          isSiginingIn(false);
          props.reduxAccountTypeAction('hunter')
          navigateToLandingScreen();
        } else {
          setServerError(true);
          isSiginingIn(false);
        }
      });
  };

  return (
    <View style={styles(props).body}>
      <Text style={styles(props).welcomeText}>
        {"\n"}Welcome {"\n"}Back,{" "}
      </Text>
      <Text style={styles(props).signInText}>Sign in to continue</Text>

      <View style={styles(props).centerContainer}>
        <View style={{ flexDirection: "row", marginTop: hp(5) }}>
          <Controller
            name="username"
            defaultValue=""
            control={control}
            render={({ onChange, value }) => (
              <Input
                value={value}
                sentry={false}
                label={"  Username"}
                error={serverError ? serverError : errors.username}
                style={styles(props).usernameField}
                errorText={
                  serverError ? IncorrectCredentials : errors?.username?.message
                }
                updateFieldIconColor={updateFieldIconColor}
                onChangeText={(text: string) => onChange(text)}
                leftIcon={
                  <EmailIcon
                    style={{ top: hp(0.5) }}
                    color={iconColor}
                    height={5}
                    width={5}
                  />
                }
              />
            )}
          />
        </View>

        <View style={{ bottom: 15 }}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ onChange, value }) => (
              <Input
                updateServerError={updateServerError}
                value={value}
                sentry={true}
                label={"  Password"}
                error={serverError ? serverError : errors.password}
                style={styles(props).passwordField}
                errorText={
                  serverError ? IncorrectCredentials : errors?.password?.message
                }
                updateFieldIconColor={updateFieldIconColor}
                onChangeText={(text: string) => onChange(text)}
                leftIcon={
                  <LockIcon
                    style={{ top: hp(0.5) }}
                    color={iconColor}
                    height={5}
                    width={5}
                  />
                }
                rightIcon={<Icon style={{ top: 4 }} size={25} name="eye" />}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity onPress={()=> forgetPassword()}>
        <View style={styles(props).forgetPasswordContainer}>
          <Text style={styles(props).forgetPassowrdText}>Forgot Password?</Text>
        </View>
      </TouchableOpacity>

      <View style={styles(props).centerContainer}>
        <Button
          onPress={() => //biometricLogin()
            handleSubmit(SignIn)
          }
          //label="Continue"
          style={[styles(props).continueButton,{backgroundColor:signingIn?'grey':'#F71735'}]}
          //labelStyle={styles(props).continueButtonText}
        >
          {
            <View style={{flexDirection:'row'}}>
                {signingIn ? (
          <ActivityIndicator style={{ top: 20 }} color={"red"} size={hp(5)} />
        ) :  <Text style={[styles(props).continueButtonText]}>Login</Text>}
               
              { 
              ///<FingerPrint name ="finger-print-outline" style={{top:2}} color="white" size={28}/> 
              }
           </View>
          }
          </Button>
      
        <View style={styles(props).rowContainer}>
          <View style={styles(props).orLine} />
          <Text style={styles(props).orText}> Or sign in with </Text>
          <View style={styles(props).orLine} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={styles(props).facebookButton}
            onPress={() => SignInWithFacebook()}
          >
            <View style={styles(props).facebookButtonContainer}>
              <FacebookIcon height={2} width={2} />
              <Text style={styles(props).facebookButtonText}> Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles(props).googleButton}
            onPress={() => SignInWithGoogle()}
          >
            <View style={styles(props).googleButtonContainer}>
              <GoogleIcon height={5} width={5} />
              <Text style={styles(props).googleButtonText}> Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles(props).ellipseContainer}>
        <Ellipse1 />
      </View>
      <View style={styles(props).ellipseContainer}>
        <Ellipse2 />
      </View>
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
      flexDirection: "row",
    },
    centerContainer: {
      alignItems: "center",
    },
    welcomeText: {
      fontSize: hp(5),
      marginLeft: 20,
      color:
        props.theme === DARK
          ? DarkTheme.welcomeTextColor
          : props.theme === LIGHT
          ? LightTheme.welcomeTextColor
          : DEFAULT,
      fontFamily: "Montserrat-Bold",
    },
    signInText: {
      color:
        props.theme === DARK
          ? DarkTheme.signInTextColor
          : props.theme === LIGHT
          ? LightTheme.signInTextColor
          : DEFAULT,
      fontSize: hp(2),
      marginTop: hp(4),
      marginLeft: 20,
      fontWeight: "bold",
    },
    skipButton: {
      alignSelf: "flex-end",
      right: wp(2),
      bottom: 0,
      position: "absolute",
    },
    skipText: {
      bottom: "10%",
      fontSize: hp(1.7),
      fontWeight: "bold",
      color: "#505050",
    },
    backText: {
      bottom: "10%",
      fontSize: hp(1.7),
      fontWeight: "bold",
      color: "#505050",
    },
    backButtton: {
      alignSelf: "flex-start",
      left: wp(2),
      bottom: 0,
      position: "absolute",
    },
    ellipseContainer: {
      bottom: 0,
      position: "absolute",
      zIndex: -1,
    },
    usernameField: {
      fontSize: hp(1.7),
      fontFamily: "Montserrat-Bold",
      height: hp(6),
      width: wp(90),
    },
    passwordField: {
      fontSize: hp(1.55),
      marginTop: hp(2),
      height: hp(6),
      width: wp(90),
      fontFamily: "Montserrat-Bold",
    },
    forgetPasswordContainer: {
      alignItems: "flex-end",
      marginRight: (Dimensions.get("window").width - wp(90)) / 2,
    },
    forgetPassowrdText: {
      fontSize: hp(1.7),
      fontWeight: "bold",
      color:
        props.theme === DARK
          ? DarkTheme.forgetPassowrdText
          : props.theme === LIGHT
          ? LightTheme.forgetPassowrdText
          : DEFAULT,
    },
    continueButton: {
      width: wp(60),
      height: hp(5.5),
      borderRadius: 35,
      marginTop: hp(5),
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: "#F71735",
    },
    continueButtonText: {
      //flex: 1,
      color: "white",
      fontSize: hp(2.3),
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
    },
    orText: {
      fontWeight: "bold",
      marginTop: hp(4),
      fontSize: hp(1.8),
      color:
        props.theme === DARK
          ? DarkTheme.orTextColor
          : props.theme === LIGHT
          ? LightTheme.orTextColor
          : DEFAULT,
    },
    orLine: {
      borderBottomColor: "#D2D2D2",
      borderBottomWidth: 1,
      width: 150,
      bottom: 10,
    },
    facebookButton: {
      right: wp(5),
      width: wp(40),
      height: hp(5),
      borderRadius: 35,
      marginTop: hp(4),
      backgroundColor: "#345287",
      borderColor: "#F0F0F0",
      zIndex: 1,
      // /borderWidth:1
    },
    facebookButtonContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    facebookButtonText: {
      //  flex:1,
      color: "white",
      fontSize: hp(1.5),
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
    },
    googleButton: {
      left: wp(5),
      width: wp(40),
      height: hp(5),
      borderRadius: 35,
      marginTop: hp(4),
      backgroundColor: "white",
      borderColor: "#F0F0F0",
      borderWidth: 1,
    },
    googleButtonContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    googleButtonText: {
      //  flex:1,
      color: "#0D0F25",
      fontSize: hp(1.5),
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
    },
    TextFieldContainer: {
      flexDirection: "row",
      // backgroundColor: '#fff',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SetUserActionType | SessionAction | SetThemeActionStore | DashboardUserAction>
) => {
  return {
    reduxAccountTypeAction:(accountType: string)=> dispatch(SelectAccountUserAction(accountType)),
    reduxHunterLoginAction: (user: any) => dispatch(SetUserAction(user)),
    reduxSetUIThemeAction: (theme: string) => dispatch(SetUIThemeAction(theme)),
    reduxSessionAction: (session: any) =>
      dispatch(ValidateSessionAction(session)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHunterSignIn);
