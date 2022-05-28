import React from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
import FacebookIcon from '../SvgComponents/Icons/FacebookIcon/facebookIcon';

export default function FacebookLogin(){
    return(
         <TouchableOpacity style={styles.ButtonRegister}>
             <FacebookIcon/>
         </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    ButtonRegister: {
    height:50,
    width:50,
    padding:11,
    backgroundColor:'#ffffff',
    borderRadius:60,
    borderColor: '#F150D8',
    marginLeft:17,
    marginRight:17,
    elevation: 30,
    bottom:45,
    right:5
  }
})