/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import {store, persist} from './store/store';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';

SplashScreen.hide();

const ReduxProvider = () => {
    return(
        <PersistGate persistor={persist}>
          <Provider store={store}>
            <App />
            </Provider>
        </PersistGate>
    )
}

AppRegistry.registerComponent(appName, () => ReduxProvider);
