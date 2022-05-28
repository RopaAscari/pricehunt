import React from 'react';
import {combineReducers} from 'redux';
import searchReducer from './searchReducer';
import accountReducer from './accountReducer';
import sessionReducer from './sessionReducer';
import imageReducer from './imageReducer'
import { persistReducer } from "redux-persist";
import viewHunterItemsReducer from './viewHunterItemsReducer'
import editMerchantItemReducer from './EditMerchantItemReducer'
import AsyncStorage from '@react-native-community/async-storage';

const persistanceConfiguartion = {
    key: 'persist',
    storage: AsyncStorage
}

const allReducers = combineReducers({
    session:sessionReducer,
    account:accountReducer,
    search:searchReducer,
    item:viewHunterItemsReducer,
    edit:editMerchantItemReducer,
    image:imageReducer
})

export const persistedReducer = persistReducer(persistanceConfiguartion,allReducers);
