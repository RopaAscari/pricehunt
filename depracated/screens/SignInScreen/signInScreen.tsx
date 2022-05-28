import React,{useEffect} from 'react';
import {useForm} from "react-hook-form";

import {
TouchableOpacityComponent, Alert,
ScrollView,TouchableOpacity, TextInput,
SafeAreaView,StyleSheet,View,Text,StatusBar,
TextInputComponent, Button, TouchableWithoutFeedback,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

                    //EXTERNAL COMPONENTS//                    
import {  NavigationScreenProp } from 'react-navigation';
import HunterLoginForm from './isolatedComponents/HunterLoginForm/hunterLoginForm'
import GoogleLogin from '../../old-implementations/components/GoogleLogin/googleLogin';
import MerchantLoginForm from './isolatedComponents/MerchantLoginForm/merchantLoginForm';
import TwitterLogin from '../../old-implementations/components/TwitterLogin/twitterLogin';
import FacebookLogin from '../../old-implementations/components/FacebookLogin/facebookLogin';
import MainSVG from '../../old-implementations/components/SvgComponents/MainSvg/Main/mainSVG';
import PinkSVG from '../../old-implementations/components/SvgComponents/MainSvg/PinkSVG/pinkSVG'
import HomeIcon from '../../old-implementations/components/SvgComponents/Icons/HomeIcon/homeIcon'
import SignInSVG from '../../old-implementations/components/SvgComponents/MainSvg/SignIn/signinSVG';
import WhiteSVG from '../../old-implementations/components/SvgComponents/MainSvg/WhiteSVG/whiteSVG'

interface State  {
    Consumer: string,
    color: string,
    color1: string,
    status: boolean
}

type Props = {
  navigation: NavigationScreenProp<any,any>
}

export default class SignInScreen extends React.Component<Props, State > {
    constructor(props: Props){
      super(props)

      this.state = {
            Consumer: 'Hunter',
            color:"white",
            color1:'black',
            status:true,
      }
  }

Hunter = () => {
  this.setState({Consumer:'Hunter'})
  this.setState({color:'white'})
  this.setState({color1:'black'})
}

Merchant = () => {
  Alert.alert('Merchant Login is not available')
}

render() {
    return (
      <React.Fragment> 
        <ScrollView>
          <View style={styles.body}>        
              <View style ={styles.JoinUsContainer}>
                  <TouchableOpacity onPress={()=> Alert.alert('Sign up is not available at the moment')}>
                    <Text style={styles.JoinUsText}>Join Us</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.SVG1}>               
                  <MainSVG/>                 
              </View>
              <View>            
                  <Text style={styles.sectionHeading}>Sign In</Text>
              </View>
              <View style={styles.sectionContainer}>    
                  <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#F85252','#7C2929']} style={styles.LinearGradient} >  
                     <View style={styles.RowContainer}>  
                          <View style={styles.SVG2}>
                              <SignInSVG/>
                          </View>
                          <View style={styles.RowContainer}>
                              <View style={styles.HunterSVGContainer}>
                                <TouchableOpacity onPress={this.Hunter}>
                                  <View style={styles.HunterText}>
                                    <Text  style={{fontSize:11, color:this.state.color1}}>Hunter</Text>
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
                        <HunterLoginForm navigation={this.props.navigation}/>
                        :<MerchantLoginForm navigation={this.props.navigation}/>
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
                      <Text>{'\n\n\n\n\n\n'}</Text>
                      <View style={styles.HomeIcon}>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Landing')}>                 
                            <HomeIcon/>                       
                          </TouchableOpacity>
                      </View>
                </LinearGradient>
              </View>
            <Text>{'\n\n\n'}</Text>
          </View>
        </ScrollView>
    </React.Fragment>
    );
  };
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: '#7C2929',
    flex:1
  },
  LinearGradient:{
    flex: 1,
  },
  SVG1:{
    backgroundColor: '#F85252',
    alignItems: 'flex-end',
  },
  SVG2:{
    right:8,
    bottom:30
  },
  JoinUsContainer:{
    alignSelf:"flex-end",
    position:"absolute",
    zIndex:5,
    right:hp('2.5%'),
    top:hp('4%')
  },
  JoinUsText:{
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
    right:15,

  },
  scrollView: {
    backgroundColor: '#F85252',
  },
  sectionContainer: {
    backgroundColor: '#F85252',
  },
  sectionHeading: {
    fontSize: 26,
    fontWeight: "600",
    color:'white',
    backgroundColor: '#F85252',
    textAlign:"center",
  },
  sectionFooter:{
    fontSize: 30,
    fontWeight: "600",
    color:'white',
    textAlign:"center",
    top:40
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
