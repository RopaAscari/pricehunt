import React, {useEffect, useState} from 'react';
import Router from './router/router';
import {Provider, useSelector} from 'react-redux';
import {store, persist} from './store/store';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {SetNetworkAction} from './actions/set-network-action';
import {
  Alert,
  AppState,
  Dimensions,
  LogBox,
  StyleSheet,
  Text,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {
  ManageUserOnlinePresence,
  ManageUseOfflinePresence,
} from './firebase/functions/user-presence';
import {RootState} from '@reducers/combined-reducers';

type Props = {};

function App(props: Props) {
 //const [appState, setAppState] = useState('' as any);
  const counter = useSelector((state: RootState) => state.user);
  const [flashMessageVisibility, setFlashMessageVisibility] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
    AppState.addEventListener('change', handleAppStateChange);

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          type: 'warning',
          icon: 'warning',
        });
        setFlashMessageVisibility(false); //
        // this.setState({flashMessageVisibility: false});
        store.dispatch(SetNetworkAction(state));
      } else {
        setFlashMessageVisibility(true);
        store.dispatch(SetNetworkAction(state));
      }
    });

    return () => {
      unsubscribe(),
        AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      console.log('ID', counter.user._id)
      ManageUserOnlinePresence(counter.user._id);
      console.log('app is active');
    } else {
      ManageUseOfflinePresence(counter.user._id);
      console.log('app is inactive');
    }
  };

  return (
    <React.Fragment>
      <Router />
      <FlashMessage
        autoHide={flashMessageVisibility}
        position="bottom"
        textStyle={styles.flashMessageTextStyles}
        style={styles.flashMesageStyles}
        duration={20000}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  flashMesageStyles: {
    marginBottom: 70,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
    width: Dimensions.get('window').width - 20,
  },
  flashMessageTextStyles: {
    color: 'white',
  },
});

export default App;
