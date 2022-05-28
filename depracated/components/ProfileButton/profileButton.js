import React from 'react'
import {TouchableOpacity} from 'react-native';
import ProfileIcon from '../SvgComponents/Icons/ProfileIcon/profileIcon'

export default function ProfileButton(props){
    return(
    <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')}>
            <ProfileIcon/>
    </TouchableOpacity>
    )
}