import React from 'react';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import { RootState } from '@reducers/combined-reducers';
import { createStore, applyMiddleware, Store } from 'redux';
import { persistedReducer } from '@reducers/combined-reducers';
import subscribeActionMiddleware from 'redux-subscribe-action';

export const store = createStore(persistedReducer, applyMiddleware(thunk, subscribeActionMiddleware))
export const persist = persistStore(store)

