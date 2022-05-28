import React,{useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux'
import {LoginAction} from '../../actions/loginAction'
import {UserAction} from '../../actions/userAction'
import formApiService from '../../services/formApiService'
import AsyncStorage from '@react-native-community/async-storage';
import LoginIcon from '../SvgComponents/Icons/LoginIcon/loginIcon'
import EmailIcon from '../SvgComponents/Icons/EmailIcon/emailIcon'
import PasswordIcon from '../SvgComponents/Icons/PasswordIcon/passwordIcon';
import UsernameIcon from '../SvgComponents/Icons/UsernameIcon/usernameIcon';
import BusinessIcon from '../SvgComponents/Icons/BusinessIcon/businessIcon'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet,TouchableOpacity,Text,View,TextInput,Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MerchantSignUpForm(props){

  const { register, setValue, handleSubmit, errors } = useForm();

  const [form,ChangeForm] = useState(true)

  const MerchantSignUp = data => {
    Alert.alert(JSON.stringify(data))
    formApiService.SignUpMerchant(data).then((res)=>res.data).then((auth)=>{
      if(auth!=null){
        props.reduxLoginAction(true)
        props.reduxMerchantAction("Merchant")
        AsyncStorage.setItem("User",data.username)
        AsyncStorage.setItem("Token",auth.token)
        props.navigation.navigate("Hub")
      }
    }).catch((errors)=>{
      console.log(errors)
    })
  }
    
    useEffect(() => {
      register({ name: "firstName"}, { required: true});
      register({ name: "lastName"},{ required: true});
      register({ name: "username"}, { required: true});
      register({ name: "password"}, { required: true});
      register({ name: "companyName"},{ required: true});
      register({ name: "location"}, { required: true});
      register({ name: "email"}, { required: true});
      register({ name: "category"},{ required: true});
    }, [register]);
  

    const BackButton = ()=>{
      return(
      <>
      <Icon name="keyboard-arrow-left" size={30} style={{bottom:4}}></Icon>
      <TouchableOpacity onPress={()=>ChangeForm(true)}>
          <Text style={{right:4}}>Back</Text>
      </TouchableOpacity>
      </>
      )
    }

    const NextButton = () =>{
      return(
      <>
        <TouchableOpacity onPress={()=>ChangeForm(false)} style={{left:271,position:'absolute',top:5}}>
            <Text>Next</Text>
        </TouchableOpacity>
        <Icon name="keyboard-arrow-right" size={30} style={{left:293}}></Icon>
      </>
      )
    }
const SecondFormHalf = () => {
return (
<View>
<View style={styles.RowContainer}>
  <View style={styles.BusinessIcon}> 
  <BusinessIcon/>   
  </View>                               
  <TextInput style={styles.TextInputRegister} placeholder="CompanyName" onChangeText={(text)=>setValue("companyName",text)}/>                       
</View>  
<View style={styles.RowContainer}> 
<View style={styles.BusinessIcon}> 
  <BusinessIcon/>   
</View>                  
  <TextInput style={styles.TextInputRegister} placeholder="Location" onChangeText={(text)=>setValue("location",text)}/>                       
</View>
<View style={styles.RowContainer}> 
<View style={styles.BusinessIcon}> 
  <BusinessIcon/>   
</View>                  
  <TextInput style={styles.TextInputRegister} placeholder="Email" onChangeText={(text)=>setValue("email",text)}/>                       
</View>
<View style={styles.RowContainer}> 
<View style={styles.BusinessIcon}> 
  <BusinessIcon/>   
</View>                  
  <TextInput style={styles.TextInputRegister} placeholder="Category" onChangeText={(text)=>setValue("category",text)}/>                       
</View>
</View>
)}

const FirstFormHalf = () => {
  return (
    <>
    <View style={styles.RowContainer}> 
        <View style={styles.UsernameIcon}> 
            <UsernameIcon/>   
        </View>                  
            <TextInput style={styles.TextInputRegister} placeholder="First Name" onChangeText={(text)=>setValue("firstName",text)}/>                       
        </View>

        <View style={styles.RowContainer}> 
        <View style={styles.UsernameIcon}> 
            <UsernameIcon/>   
        </View>                  
            <TextInput style={styles.TextInputRegister} placeholder="Last Name" onChangeText={(text)=>setValue("lastName",text)}/>                       
        </View>

        <View style={styles.RowContainer}>
        <View style={styles.UsernameIcon}> 
            <UsernameIcon/>   
        </View>                               
            <TextInput style={styles.TextInputRegister} placeholder="Username" onChangeText={(text)=>setValue("username",text)}/>                       
        </View> 
        <View style={styles.RowContainer}>
            <View style={styles.PasswordIcon}> 
            <PasswordIcon/>   
            </View>                               
            <TextInput style={styles.TextInputRegister} placeholder="Password" onChangeText={(text)=>setValue("password",text)}/>                       
        </View>
     </>
  )
}

return(
  <View style = {styles.SignUpContainer}>  
        <View style={{flexDirection:"row"}}>
        {
          form?
          NextButton():BackButton()
        }    
        </View>
        {
          form?
          FirstFormHalf(): SecondFormHalf()
        }
        <TouchableOpacity style={styles.SignUp} onPress={handleSubmit(MerchantSignUp)}>
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
      BusinessIcon:{
        top:20
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
        bottom:hp('11%'),  
        left:wp('70%'),        
        padding:22,
        borderRadius:60,   
        elevation: 30,
        backgroundColor:'#ffffff',
        borderColor: '#F150D8',   
      },
})
const mapDispatchToProps = (dispatch) => 
{
    return {
     reduxLoginAction:(status) => dispatch(LoginAction(status)) ,
     reduxUserAction:(merchant) => dispatch(UserAction(merchant)) 
  }
}
export default connect(null,mapDispatchToProps)(MerchantSignUpForm);