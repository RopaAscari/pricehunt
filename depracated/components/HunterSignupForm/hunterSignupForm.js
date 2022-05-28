import React,{useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux'
import {LoginAction} from '../../actions/loginAction'
import {UserAction} from '../../actions/userAction'
import formApiService from '../../services/formApiService'
import AsyncStorage from '@react-native-community/async-storage';
import PasswordIcon from '../SvgComponents/Icons/PasswordIcon/passwordIcon';
import UsernameIcon from '../SvgComponents/Icons/UsernameIcon/usernameIcon';
import EmailIcon from '../SvgComponents/Icons/EmailIcon/emailIcon'
import LoginIcon from '../SvgComponents/Icons/LoginIcon/loginIcon'
import {StyleSheet,TouchableOpacity,Text,View,TextInput,Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function HunterSignUpForm(props){

  const { register, setValue, handleSubmit, errors } = useForm();

  const HunterSignUp = data => {
    Alert.alert(JSON.stringify(data))
    formApiService.SignUpHunter(data).then((res)=>res.data).then((auth)=>{
      if(auth!=null){
        props.reduxLoginAction(true)
        props.reduxHunterAction("Hunter")
        AsyncStorage.setItem("User",data.username)
        AsyncStorage.setItem("Token",auth.token)
        props.navigation.navigate("Hub")
      }
  })
}

    useEffect(() => {
      register({ name: "firstName"}, { required: true});
      register({ name: "lastName"},{ required: true,});
      register({ name: "username"}, { required: true });
      register({ name: "email"},{ required: true});
      register({ name: "password"}, { required: true });
      //register({ name: "confirmPassword"}, { required: true });
    }, [register]);
  
        return(
          <View style = {styles.SignUpContainer}>                                 
          <View style={styles.RowContainer}> 
          <View style={styles.UsernameIcon}> 
              <UsernameIcon/>   
          </View>                  
              <TextInput style={styles.TextInputRegister} placeholder="First Name" onChangeText={(text) => setValue("firstName",text)}/>  
              {errors.hunterFullname?.type === "required" && <Text style={styles.Errors}>Required</Text>}                     
          </View>

          <View style={styles.RowContainer}> 
          <View style={styles.UsernameIcon}> 
              <UsernameIcon/>   
          </View>                  
              <TextInput style={styles.TextInputRegister} placeholder="Last Name" onChangeText={(text) => setValue("lastName",text)}/> 
              {errors.hunterUsername?.type==="required" && <Text style={styles.Errors}>Required</Text>}
              {errors.hunterUsername?.type==="minLength" && <Text style={styles.Errors}>Minimum Length 8 characters</Text>}
              {errors.hunterUsername?.type==="maxLength" && <Text style={styles.Errors}>Maximum Length 15 characters</Text>}                             
          </View>

          <View style={styles.RowContainer}>
          <View style={styles.UsernameIcon}> 
              <UsernameIcon/>   
          </View>                               
              <TextInput style={styles.TextInputRegister} placeholder="User Name" onChangeText={(text) => setValue("username",text)}/> 
              {errors.hunterEmail?.type==="required" && <Text style={styles.Errors}>Required</Text>}                           
          </View> 
          <View style={styles.RowContainer}>
          <View style={styles.PasswordIcon}> 
              <EmailIcon/>   
              </View>  
                             
              <TextInput style={styles.TextInputRegister} placeholder="Email" onChangeText={(text) => setValue("email",text)}/>  
              {errors.hunterPassword?.type==="required" && <Text style={styles.Errors}>Required</Text>}                          
          </View> 
          <View style={styles.RowContainer}>
          <View style={styles.PasswordIcon}> 
              <PasswordIcon/>   
              </View>                       
              <TextInput style={styles.TextInputRegister} placeholder=" Password" onChangeText={(text) => setValue("password",text)}/> 
              {errors.hunterConfirmedPassword?.type==="required" && <Text style={styles.Errors}>Required</Text>}                           
          </View> 
          <TouchableOpacity style={styles.SignUp} onPress={handleSubmit(HunterSignUp)}>
                <LoginIcon/>
          </TouchableOpacity>   
      </View>
        );
}
const styles = StyleSheet.create({
    SignUpContainer:{
        position: 'absolute',
        top:hp('10%'),
        marginLeft:10
      },
      PasswordIcon:{
        top:13
      },
      RowContainer:{
        flexDirection:'row'
       },
       UsernameIcon:{
        top:13
      },
      TextInputRegister: {
        height: hp("5%") ,
        width: hp("30%"),
        borderBottomColor:'black',
        borderBottomWidth:1,
        backgroundColor:'#ffffff',
      },
      SignUp: {       
        height:hp("7%"),
        width:hp("7%"),
        bottom:hp('13%'),  
        left:wp('70'),        
        padding:22,
        borderRadius:60,   
        elevation: 30,
        backgroundColor:'#ffffff',
        borderColor: '#F150D8',   
      },
      Errors:{
        right:100,
        top:42,
        zIndex:5   
       }
})
const mapDispatchToProps = (dispatch) => 
{
    return {
     reduxLoginAction:(status) => dispatch(LoginAction(status)) ,
     reduxHunterAction:(merchant) => dispatch(HunterAction(merchant)) 
  }
}
export default connect(null,mapDispatchToProps)(HunterSignUpForm);