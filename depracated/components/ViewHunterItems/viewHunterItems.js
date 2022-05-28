import React from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {store} from '../../store/store'
import {ViewHunterItemsAction} from '../../actions/viewHunterItemsAction'
import {FavouriteCountAction} from '../../actions/favouriteCountAction'

export default function ViewHunterItems(navigation, items, count){

  // console.log("ffff",count);
    navigation.navigate("View");
    store.dispatch(FavouriteCountAction(count))
    store.dispatch(ViewHunterItemsAction(items))
   // props.reduxViewHunterSelectedItems(items);
}

