import React,{useEffect} from 'react';
import {useForm} from "react-hook-form";
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,StyleSheet,ScrollView,
  View,Text,
  StatusBar,TouchableOpacity, TextInput,
  TextInputComponent, Button, 
  TouchableWithoutFeedback, TouchableOpacityComponent, Alert
} from 'react-native';

                    //EXTERNAL COMPONENTS//
import MainSVG from '../../components/SvgComponents/MainSvg/Main/mainSVG';
import SignUpSvg from '../../components/SvgComponents/MainSvg/SignUp/signupSVG'
import GoogleLogin from '../../components/GoogleLogin/googleLogin';
import FacebookLogin from '../../components/FacebookLogin/facebookLogin';
import TwitterLogin from '../../components/TwitterLogin/twitterLogin';
import WhiteSVG from '../../components/SvgComponents/MainSvg/WhiteSVG/whiteSVG'
import PinkSVG from '../../components/SvgComponents/MainSvg/PinkSVG/pinkSVG'
import HomeIcon from '../../components/SvgComponents/Icons/HomeIcon/homeIcon';
import HunterSignUpForm from '../../components/HunterSignupForm/hunterSignupForm';
import MerchantSignUpForm from '../../components/MerchantSignupForm/merhantSignupForm';

export default class SignUpScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Consumer: 'Hunter',
              color:"white",
              color1:'black'
      }
  }

  Hunter = () => {
    this.setState({Consumer:'Hunter'})
    this.setState({color:'white'})
    this.setState({color1:'black'})
  }
  
  Merchant = () => {
    this.setState({Consumer:'Merchant'})
    this.setState({color:'black'})
    this.setState({color1:'white'})
  }
  


  render(){
    return (
      <> 
       <ScrollView>
           <View style={styles.body}>    
              <View style ={styles.LoginContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}>
                  <Text style={styles.LoginText}>Login</Text>
                  </TouchableOpacity>
               </View>
                <View style={styles.SVG1}>               
                    <MainSVG/>                 
                </View>
                <View>            
                    <Text style={styles.sectionHeading}>Sign Up</Text>
                </View>
                <View style={styles.sectionContainer}>                            
                <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#F85252','#7C2929']} style={styles.LinearGradient} >        
                      <View style={styles.RowContainer}>  
                        <View style={styles.SVG2}>
                            <SignUpSvg/>
                          </View>
                          <View style={styles.RowContainer}>
                            <View style={styles.HunterSVGContainer}>
                              <TouchableOpacity onPress={this.Hunter}>
                                <View style={styles.HunterText}>
                                  <Text style={{fontSize:11, color:this.state.color1}}>Hunter</Text>
                                </View>
                                {
                                this.state.Consumer == 'Hunter'?
                                <WhiteSVG/>
                                :<PinkSVG/>
                                }
                              </TouchableOpacity>
                            </View>                                                                                  
                            <View style={styles.MerchantSVGContainer}>
                                <TouchableOpacity onPress={this.Merchant}>
                                    <View style={styles.MerchantText}>
                                      <Text style={{fontSize:10, color:this.state.color}}>Merchant</Text>
                                    </View>
                                    {
                                     this.state.Consumer == 'Merchant'?
                                     <WhiteSVG/> 
                                    :<PinkSVG/>
                                    }
                                </TouchableOpacity>
                            </View>
                          </View> 
                      </View>     
                      {
                      this.state.Consumer == 'Hunter'?
                       <HunterSignUpForm navigation={this.props.navigation}/>  
                      :<MerchantSignUpForm navigation={this.props.navigation}/>
                      }

                      <View style={styles.SocialMedia}>                   
                          <GoogleLogin/>
                          <FacebookLogin/>
                          <TwitterLogin/>           
                      </View>                                               
                      <View>   
                          <Text style={styles.sectionFooter}>{'\n\n'}Let Us Help You Save</Text>
                          <Text>{'\n'}</Text>
                      </View> 
                      <View style={styles.HomeIcon}>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Hub')}>                 
                            <HomeIcon/>                       
                          </TouchableOpacity>
                      </View>
                      </LinearGradient>
                  </View>
                  <Text>{"\n\n"}</Text>
            </View>
      </ScrollView>
    </>
    );
   };
  };
  
  const styles = StyleSheet.create({
    body: {
      backgroundColor: '#7C2929',
      flex:1
    },
    SVG1:{
      backgroundColor: '#F85252',
      alignItems: 'flex-end',
    },
    SVG2:{
      right:10,
      bottom:42
    },
    LoginContainer:{
      alignSelf:"flex-end",
      position:"absolute",
      zIndex:5,
      right:hp('3%'),
      top:hp('4%')
    },
    LoginText:{
      fontSize:hp('1.5%'),
      fontFamily:"Segeo UI",
      color:"white"
    },
    RowContainer:{
     flexDirection:'row'
    },
    HunterSVGContainer:{
      right:320,
      top:8
    },
    HunterText:{
      position:'absolute',
      zIndex:5,
      top:15,
      left:10,
    },
    MerchantSVGContainer:{
     right:340,
    top:10
    },
    MerchantText:{
      position:'absolute', 
      zIndex:5,
      top:20,
      left:7,
   
    },
    SignUpContainer:{
      position: 'absolute',
      top:hp('8%'),
      marginLeft:10
    },
    UsernameIcon:{
      top:13
    },
    PasswordIcon:{
      top:13
    },
    SocialMedia:{
      flexDirection:"row",
    },
    HomeIcon:{
      alignSelf:"flex-end",
      right:15
    },
    scrollView: {
      backgroundColor: '#F85252',
    },
    sectionContainer: {
      backgroundColor: '#F85252',
    },
    TextInputRegister: {
      height: hp("6%") ,
      width: hp("32%"),
      borderBottomColor:'black',
      borderBottomWidth:1,
      backgroundColor:'#ffffff',
    },
    sectionHeading: {
      fontSize: 26,
      fontWeight: "600",
      color:'white',
      backgroundColor: '#F85252',
      textAlign:"center",
    },
    sectionFooter:{
      fontSize: 26,
      fontWeight: "600",
      color:'white',
     // backgroundColor: '#F85252',
      textAlign:"center",
    },
    ButtonText:{
      fontSize: 18,
      color: '#F45C52',
      textAlign:"center",
      fontWeight: '700',
    },
    Scaler:{
      height:hp('55%'),
      width:hp("55%"),
      zIndex:5
    }
  });
  
  