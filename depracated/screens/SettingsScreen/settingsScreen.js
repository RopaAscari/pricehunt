import React from 'react';
import {Text,StyleSheet,View, Alert,  Modal,TouchableOpacity,Image,Dimensions,Switch} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AppNotifcations:false,
      EmailNotifications:false,
      Biometrics:false,
    }
  }

  toggleAppNotifications = () =>{
  this.setState({AppNotifcations:!this.state.AppNotifcations})
  }
  toggleEmailNotifications = () =>{
    this.setState({EmailNotifications:!this.state.EmailNotifications})
  }
  toggleBiometrics = () =>{
      this.setState({Biometrics:!this.state.Biometrics})
      Alert.alert("FingerPrint Scanner Enabled")
  }

  render() {
    return (
      <ScrollView>
          <View style={{backgroundColor:'#F85252',padding:10}}>
            <Icon name="arrow-left" size={25} color="white" onPress={()=>this.props.navigation.navigate('Hub')}></Icon>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'700',color:'white',bottom:15}}>Settings</Text>
          </View>
            <View style={styles.Body}>

                <Text style={[styles.Spacing, styles.Account]}>Account</Text>  
                <View elevation={10} style={styles.FourOptionsContainer}>
                    <Text style={styles.Spacing}>Account Information</Text>
                    <Text style={styles.Spacing}>Edit Profile</Text>
                    <Text style={styles.Spacing}>Manage Subscriptions</Text>
                    <Text style={styles.Spacing}>Add Payment</Text>
                </View>
                <Text style={[styles.Spacing,styles.Notifications]}>Notifications</Text>

                <View elevation={3} style={styles.ThreeOptionsContainer}>
                  <View style={{flexDirection:'row'}}>
                    <View>
                      <Text style={styles.Spacing}>Push App Notifications</Text>
                   </View> 
                   <View style={{flexDirection:'row-reverse',left:240}}>
                      <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={this.state.AppNotifcations ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={this.toggleAppNotifications}
                      value={this.state.AppNotifcations}
                    /> 
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>    
                    <Text style={styles.Spacing}>Email Notifications</Text>
                    <View style={{flexDirection:'row-reverse',left:270}}>
                        <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.EmailNotifications ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleEmailNotifications}
                        value={this.state.EmailNotifications}
                      /> 
                    </View>   
                  </View> 
                  <Text style={styles.Spacing}>Sound & Vibration</Text>
                </View> 

                <Text style={[styles.Spacing, styles.Security]}>Privacy & Security</Text>
                <View elevation={3} style={styles.FourOptionsContainer}>
                  <Text style={styles.Spacing}>Two-Factor Authentification</Text>
                  <Text style={styles.Spacing}>Change Password</Text>        
                  <View style={{flexDirection:'row'}}>    
                    <Text style={styles.Spacing}>Enable Biometrics</Text>
                    <View style={{flexDirection:'row-reverse',left:270}}>
                        <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.Biometrics ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleBiometrics}
                        value={this.state.Biometrics}
                      /> 
                    </View>   
                  </View>
                  <Text style={styles.Spacing}>Permissions</Text>
                </View>
                <Text style={[styles.Spacing, styles.MoreInformation]}>More Information</Text>
                <View  elevation={3} style={styles.ThreeOptionsContainer}>
                  <Text style={styles.Spacing}>Policies</Text>               
                  <Text style={styles.Spacing}>Terms of Service</Text>
                  <Text style={styles.Spacing}>Feedback</Text>
               </View>
               <View style={{top:50,}}>
                   <Text style={{textAlign:'center',fontWeight:'600',fontStyle:'italic'}}>Powered by TIGR{}</Text>
               </View>
            </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
Spacing:{
  padding:10
},
Body:{
  padding:20,
  height:Dimensions.get('window').height
  ,//backgroundColor:'white'
}
,Security:{
  fontSize:20
},
Account:{
  fontSize:20
},
Notifications:{
  fontSize:20
},
MoreInformation:{
  fontSize:20
},
FourOptionsContainer: {
  width: Dimensions.get("window").width,
  height: 180,
  backgroundColor: "white",
  bottom:10,
  right:20,
  top:5.5,
  shadowColor: '#000000',
  shadowOffset: {
    width: 10,
    height: 5    
  }
 },
 ThreeOptionsContainer: {
  width: Dimensions.get("window").width,
  height: 130,
  backgroundColor: "white",
  bottom:10,
  right:20,
  top:5.5,
  shadowColor: '#000000',
  shadowOffset: {
    width: 3,
    height: 3    
  }
 },
});