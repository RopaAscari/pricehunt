import React from "react";
import {connect} from 'react-redux';
import { RootState } from '@reducers/combined-reducers';
import { NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RemoveUserAction } from '@actions/remove-user-action';
import { DARK, DEFAULT, LIGHT } from '@constants/theme-types';
import { DarkTheme } from '@theme/dark/menu-content-dark-mode';
import { LightTheme } from '@theme/light/menu-content-light-mode';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
 theme: any
 user:any
 reduxRemoveUserAction(): void
 navigation: NavigationScreenProp<any,any>
 
}

function MenuContent (props: Props){

    const SignOut = () => {
        props.reduxRemoveUserAction();
        props.navigation.navigate('D-Home');
    }

    return(
    <View style={{alignItems:'flex-start', top:'5%'}}>  
        
                <TouchableOpacity onPress={ () => props.navigation.navigate('Landing')}>
                    <View style={styles(props).container}>  
                        <View style={{flexDirection:'row'}}>
                            <Icon name="home" size={25} style={styles(props).iconContainer} color="#F85252"/> 
                            <Text style={styles(props).textContainer}>Home</Text>                  
                        </View> 
                    </View> 
                </TouchableOpacity>
            
                { //state.isloggenIn?                   
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                    <View style={styles(props).container}>
                        <View style={{    flexDirection:'row'}}>
                            <Icon name="account-circle" size={25} style={styles(props).iconContainer} color="#F85252"/> 
                            <Text style={styles(props).textContainer}>Profile</Text>                  
                        </View> 
                    </View>
                </TouchableOpacity>//:/ //null
                }
                <TouchableOpacity onPress={()=> Alert.alert('Favourite Screen not ready as yet')}>
                    <View style={styles(props).container}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="menu" size={25} style={styles(props).iconContainer} color="#F85252"/>                          
                            <Text style={styles(props).textContainer}>View Favourite List</Text>                  
                        </View> 
                    </View>
                </TouchableOpacity>
            
            {/* props.account.userType == 'Merchant'?
            <View style={styles.container}>  
                <TouchableOpacity onPress={()=>props.navigation.navigate('MerchantHub')}>
                    <View style={{    flexDirection:'row'}}>
                        <Icon name="broken-image" size={25} style={{right:10,bottom:3}} color="#F85252"/> 
                        <Text style={{textAlign:'left'}}>Merchant Portal</Text>                  
                    </View> 
                </TouchableOpacity>
            </View>:null
           */}
                <TouchableOpacity onPress={()=> Alert.alert('Price Hub Screen not ready as yet')}>
                    <View style={styles(props).container}>                     
                        <View style={{    flexDirection:'row'}}>
                            <Icon name="attach-money"  size={25} style={styles(props).iconContainer} color="#F85252"/> 
                            <Text style={styles(props).textContainer}>Price Hub</Text>                  
                        </View>          
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> Alert.alert('About Screen not ready as yet')}>
                    <View style={styles(props).container}>                   
                        <View style={{    flexDirection:'row'}}>
                            <Icon name="developer-board" size={25} style={styles(props).iconContainer} color="#F85252"/> 
                            <Text style={styles(props).textContainer}>About Us</Text>                  
                        </View>              
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> Alert.alert('Settings Screen not ready as yet')}>
                    <View style={styles(props).container}>      
                        <View style={{    flexDirection:'row'}}>
                            <Icon name="settings" size={25} style={styles(props).iconContainer} color="#F85252"/> 
                            <Text style={styles(props).textContainer}>Settings</Text>                  
                        </View>              
                    </View>
                </TouchableOpacity>

                <View style={{alignSelf:'center',top:'20%'}}>
                    <TouchableOpacity onPress={ ()=> SignOut() } style={styles(props).buttonContainer}>
                        <Text style={{alignSelf:'center', color:'white',fontSize:hp(1.4)}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
       </View>
    )
}
const styles = (props: Props) => StyleSheet.create({
    iconContainer:{
        right:10,
        bottom:3,
        color: props.theme === DARK ? DarkTheme.iconColor: props.theme === LIGHT ? LightTheme.iconColor: DEFAULT,
    },
    textContainer:{
        textAlign:'left',
        color: props.theme === DARK ? DarkTheme.textColor: props.theme === LIGHT ? LightTheme.textColor : DEFAULT,
    },
    buttonContainer:{
        elevation:3,
        height:hp(3),
        width:wp(18),
        backgroundColor: props.theme === DARK ? DarkTheme.buttonContainerColor: props.theme === LIGHT ? LightTheme.buttonContainerColor : DEFAULT,
        borderRadius:15,
        justifyContent:'center'
    },
    container:{
        padding:20,
    },
    MenuSVG1:{
       top:10
    }
})

const mapStateToProps = (state: RootState) => {
    return{
        user: state.user.user,
        theme: state.theme.theme
    }

}

const mapDispatchToProps = (dispatch: any) =>{
    return {
        reduxRemoveUserAction:()=> dispatch(RemoveUserAction())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MenuContent)