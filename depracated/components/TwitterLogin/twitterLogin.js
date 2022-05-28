import React from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import TwitterIcon from '../SvgComponents/Icons/TwitterIcon/twitterIcon';

export default function TwitterLogin(){
    return(
         <TouchableOpacity style={styles.ButtonRegister}>
             <TwitterIcon/>
         </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    ButtonRegister: {
    height:50,
    width:50,
    padding:13,
    backgroundColor:'#ffffff',
    borderRadius:60,
    borderColor: '#F150D8',
    elevation: 20,
    bottom:70,
    left:10
  }
})