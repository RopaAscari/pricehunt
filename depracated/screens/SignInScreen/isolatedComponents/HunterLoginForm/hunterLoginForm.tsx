import {connect} from "react-redux";
import {useForm} from 'react-hook-form';
import {userInfo} from '../../../../data/appData'
import { NavigationScreenProp } from 'react-navigation';
import {Decoder} from "../../../../services/JWT-decoder";
import Icon from 'react-native-vector-icons/MaterialIcons';
import React,{ useEffect, useState, useContext } from 'react';
import {User} from '../../../../constants/types'
import {UserContext} from '../../../../providers/userContextProvider'
import LoginIcon from '../../../../old-implementations/components/SvgComponents/Icons/LoginIcon/loginIcon';
import PasswordIcon from '../../../../old-implementations/components/SvgComponents/Icons/PasswordIcon/passwordIcon';
import UsernameIcon from '../../../../old-implementations/components/SvgComponents/Icons/UsernameIcon/usernameIcon';
import {StyleSheet,TouchableOpacity,Text,View, Alert, ImagePropTypes,TextInput, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface UserInput{
  password:string,
  username:string
}

type Props = {
    navigation: NavigationScreenProp<any,any>
}

export default function HunterLoginForm(props: Props){
  
  let user: User | unknown
  const userType = "Hunter";
  const [show, showPassword] = useState(true);
  const [line, showInputError] = useState(true);
  const {dispatch:{ setUser }} = useContext(UserContext)
  const { register, setValue, handleSubmit, errors } = useForm()


  useEffect(() => {
    register({ name: "username"}, { required: true });
    register({ name: "password"}, { required: true });
  },[register])

  const HunterLogin = (data: UserInput) => { 

    let track = 0

    for(let user of userInfo){
      track++;
      if(user.username === data.username && user.password === data.password) {
        props.navigation.navigate('Landing') 
        setUser(user)
        break;
      }else if(user.username === data.username && 
               user.password !== data.password || 
               user.password === data.password && 
               user.username !== data.username ){
                 if(track > 5){
                     Alert.alert('Incorrect credentials')
                     break;
                 }
      }else{
  
        Alert.alert('Incorrect credentials')
        break;
      }
    }
  }
     
    return(
        <View style = {styles.SignUpContainer}>    
        <View style={styles.RowContainer}>

           <View>
            <View style={styles.RowContainer}> 
                <View style={styles.UsernameIcon}> 
                  <UsernameIcon/>   
                </View>  
               
              <TextInput  style={[line? styles.TextInputRegister: styles.TextInputRegisterError]} placeholder="Username" 
              onChangeText={ text =>  setValue('username', text, { shouldValidate: true} )}/>        
                          
                </View>

                    <View style={styles.RowContainer}>
                          <View style={styles.PasswordIcon}> 
                              <PasswordIcon/>   
                          </View>  
                                                      
                          <TextInput style={[line? styles.TextInputRegister: styles.TextInputRegisterError]} placeholder="Password"
                          onChangeText={ text =>  setValue('password', text)} secureTextEntry={show}/>    
                          { show?
                            <Icon name="visibility-off" size={25} style={styles.VisibilityIcon} color="grey" onPress={() => showPassword(false)}/> 
                            :<Icon name="visibility" size={25} style={styles.VisibilityIcon} color="grey" onPress={() => showPassword(true)}/>
                          }
                                      
                    </View>    
              </View>
              <View>
                  <TouchableOpacity style={styles.Login} onPress={handleSubmit(HunterLogin)}>
                      <LoginIcon/>
                  </TouchableOpacity>  
              </View> 
        </View>
       </View> 
)};

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
        flexDirection:'row',
       // justifyContent:'space-between'
      },
       UsernameIcon:{
        top:13
      },
      TextInputRegister: {
        height: hp("5%") ,
        width: hp("30%"),
        borderBottomColor:'grey',
        borderBottomWidth:1,
        backgroundColor:'#ffffff',
      },
      TextInputRegisterError: {
        height: hp("5%") ,
        width: hp("30%"),
        borderBottomColor:'red',
        borderBottomWidth:1,
        backgroundColor:'#ffffff',
      },
      Login: {     
        top:35, 
        left: 0,//Dimensions.get('window').width * 0.85,        
        padding:22,
        elevation: 30,    
        width:hp("7%"),  
        height:hp("7%"),
        borderRadius:60,     
        position:'absolute',
        alignItems:'center',
        borderColor: '#F150D8',    
        backgroundColor:'#ffffff',
        justifyContent:'space-around',
      },
      Required:{
        right:100,
        top:40,
        zIndex:5,
        fontWeight:"700",
        color:'red',  
      },
      VisibilityIcon:{
        top:'6%',
        right:15
      }
})
