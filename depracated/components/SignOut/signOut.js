import React from "react";
import {connect} from 'react-redux'
import { Alert } from "react-native";
import {store} from '../../store/store'
import { UserAction } from "../../actions/userAction";
import {LogoutAction} from '../../actions/logoutAction'

export default function SignOut(navigation) { 

       const user = {...user,
              _id:'',
              username: '',
              email: '',
              firstName: '',
              lastName: '',
              profilePic: ''
          }

       console.log("Sign Out")
       navigation.navigate('SignIn') 
       store.dispatch(UserAction(user)) 
       store.dispatch(LogoutAction())
}
