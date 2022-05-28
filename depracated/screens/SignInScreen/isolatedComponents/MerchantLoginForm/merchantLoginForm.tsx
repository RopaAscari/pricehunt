import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import React,{useEffect,useState} from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {Decoder} from "../../../../services/JWT-decoder";
import Icon from 'react-native-vector-icons/MaterialIcons';

import {StyleSheet,TouchableOpacity,Text,View,TextInput,Alert} from 'react-native';
import EmailIcon from '../../../../old-implementations/components/SvgComponents/Icons/EmailIcon/emailIcon';
import LoginIcon from '../../../../old-implementations/components/SvgComponents/Icons/LoginIcon/loginIcon';
import UsernameIcon from '../../../../old-implementations/components/SvgComponents/Icons/UsernameIcon/usernameIcon';
import PasswordIcon from '../../../../old-implementations/components/SvgComponents/Icons/PasswordIcon/passwordIcon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    navigation: NavigationScreenProp<any,any>
}

export default function MerchantLoginForm(props: Props){
  
  const userType = "Merchant";
  const { register, setValue, handleSubmit, errors } = useForm();
  const [show, showPassword] = useState(true);

  const MerchantLogin = (data: any) => {      

}
 
useEffect(() => {
    register({ name: "username"},{ required: true });
    register({ name: "password"},{ required: true });
}, [register]);

return(
        <View style = {styles.SignUpContainer}>                                 
          <View style={styles.RowContainer}> 
              
            <View style={styles.EmailIcon}> 
              <EmailIcon/>   
            </View>                  
             <TextInput style={styles.TextInputRegister} placeholder="Business Email Address" 
              onChangeText={text => setValue("username", text, { shouldValidate: true})}/>             
               {errors.Email?.type === "required" && <Text style={styles.Errors}>Required.</Text>}
               {errors.Email?.type === "maxLength" && <Text style={styles.Errors}>Too Long.</Text>}             
          </View>
          <View style={styles.RowContainer}>
          <View style={styles.PasswordIcon}> 
              <PasswordIcon/>   
          </View>                               
              <TextInput style={styles.TextInputRegister} placeholder="Password" 
               onChangeText={text => setValue("password", text, { shouldValidate: true})} secureTextEntry={show}/>  
               {show?
               <Icon name="visibility-off" size={25} style={{top:12,right:10}} color="grey" onPress={()=>showPassword(false)}/> 
               :<Icon name="visibility" size={25} style={{top:12,right:10}} color="grey" onPress={()=>showPassword(true)}/>
               }
              {errors.Password?.type === "required" && <Text style={styles.Errors}>Required.</Text>}
              {errors.Password?.type === "maxLength" && <Text style={styles.Errors}>Too Long.</Text>}
          </View>        
          <View> 
              <TouchableOpacity style={styles.Login} onPress={handleSubmit(MerchantLogin)}>
                  <LoginIcon/>
              </TouchableOpacity>  
          </View> 
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
      EmailIcon:{
        top:15
      },
      TextInputRegister: {
        height: hp("5%") ,
        width: hp("30%"),
        borderBottomColor:'black',
        borderBottomWidth:1,
        backgroundColor:'#ffffff',
      },
      Login: {       
        height:hp("7%"),
        width:hp("7%"),
        bottom:hp('6.5%'),  
        left:wp('75%'),        
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
