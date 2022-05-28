import 'react-native-gesture-handler';
import React from 'react';
import TabStack from '../../router/tabStack'
//import ApiService from '../../services/ApiService'
import ImagePicker from 'react-native-image-picker';
import HubSearch from '../../components/HubSearch/hubSearch'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import RenderItems from '../../components/RenderItems/renderItems'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuSlider from '../../../deprecated/MenuSlider/menuSlider'
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import MenuIcon from '../../components/SvgComponents/Icons/MenuIcon/menuIcon'
import SortIcon from '../../components/SvgComponents/Icons/SortIcon/sortIcon'
import ProfileIcon from '../../components/SvgComponents/Icons/ProfileIcon/profileIcon'
import { TextInput, ScrollView,TouchableHighlight } from 'react-native-gesture-handler';
import MerchantHubIcon from '../../components/SvgComponents/Icons/merchantHubIcon/merchantHubIcon'
import {Text,StyleSheet,View,  Modal,TouchableOpacity,Image,Dimensions,ActivityIndicator,Alert} from 'react-native';

const Stack = createStackNavigator();

class MerchantHubScreen extends React.Component {
constructor(props){
    super(props)
    this.state = {
        user:' ',
        business:'',   
    }
}




render(){
  return (
    <>
      <View style={styles.body}>
        <View style={{flexDirection:"row",left:10,top:5}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')}>
                <ProfileIcon/>
            </TouchableOpacity>
            <View>
                <Text style={{color:'white',fontWeight:"700",left:5,top:7}}>{this.state.user}</Text>
            </View>
        </View>
        <Icon name="arrow-left" size={25} color="white" style={{top:22,left:10}} onPress={()=>this.props.navigation.navigate('Hub')}></Icon>
          <View style={{alignSelf:'flex-end',justifyContent:'flex-end',position:'absolute',top:5,right:5}}>
            <Icon name="menu" size={35} style={{bottom:8,right:2}} color="white" onPress={this.Change}/>
          </View>
          <View style={{alignSelf:'center',top:10}}>
             <Text style={{color:'white',fontWeight:"600",fontSize:20 ,fontFamily:'Segoe ui semibold italic'}}>Merchant Hub</Text>
          </View>
   </View>






   

   <View style={styles.container}>
    <NavigationContainer independent={true}  >
      <Stack.Navigator
        initialRouteName="View"
        screenOptions={{
          headerShown: false,
          cardStyle:{backgroundColor: 'transparent'},
          headerStyle: { backgroundColor: 'white', borderTopLeftRadius:35, borderTopRightRadius:35, elevation:0 },
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: 'normal',textAlign:'center',fontSize:16,left:5}
         }}>
        <Stack.Screen name="TabStack" component={TabStack}  />
      </Stack.Navigator>
    </NavigationContainer>
    </View>





    {
     this.state.showMenu?
     <MenuSlider navigation={this.props.navigation}/>
     : null         
    }  
   </>
  );
 }
}

const styles = StyleSheet.create({

    body: {
        backgroundColor: '#F85252',
        flex:1,
        width:Dimensions.get('window').width,
      }, 
      container: {
        flex:1,
        backgroundColor: 'white',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        top:135
      },
    })

export default MerchantHubScreen;