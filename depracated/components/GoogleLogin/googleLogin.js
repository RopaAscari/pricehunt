import React,{useEffect, useState} from 'react'
import {StyleSheet,TouchableOpacity, Alert} from 'react-native'
import GoogleIcon from '../SvgComponents/Icons/GoogleIcon/googleIcon'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default function GoogleLogin(){

  let USER = {}
  const [user, setUser] = useState({})

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: "825864615222-c8rr893t5h7jv054u4hb2rop1r7jcv59.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  })

    const signInGoogle = async() => {
      try{ 
        console.log("test")
        await GoogleSignin.hasPlayServices();
        console.log("test")
        const userInfo = await GoogleSignin.signIn()
        console.log("USER",userInfo)
        USER = userInfo
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

    const isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!!isSignedIn) {
        getCurrentUserInfo()
      } else {
        Alert.alert('Please Login')
      }
    };

    const getCurrentUserInfo = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setUser(userInfo);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          alert('User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
          alert("Something went wrong. Unable to get user's info");
          console.log("Something went wrong. Unable to get user's info");
        }
      }
    };

  const signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setUser({}); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };

    return(
         <TouchableOpacity style={styles.ButtonRegister} onPress={signInGoogle}>
           <GoogleIcon/>
         </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    ButtonRegister: {
    height:50,
    width:50,
    padding:11,
    marginTop:20,
    marginLeft:8,
    backgroundColor:'#ffffff',
    borderRadius:60,
    borderColor: '#F150D8',
    elevation: 50
  }
})