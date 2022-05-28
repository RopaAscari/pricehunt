import {SetNetworkAction} from '@actions/set-network-action';
import {store} from '@store/store';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

type Props = {};

type State = {};

class VerfifyNetworkConnenction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  checkNetworkConnection = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          type: 'warning',
          icon: 'warning',
        });
        store.dispatch(SetNetworkAction(state));
      }
    });
  };

  render() {
    return (
      <View style={styles(this.props).container}>
        <Text style={styles(this.props).notConnectedText}> You are not connected</Text>
        <Image
          source={require('../../assets/images/no-net.jpg')}
          style={styles(this.props).imageContainer}
        />
        <Text style={[styles(this.props).internetConnectedText, { marginTop: 10 }]}>
          Your internet connection is not{' '}
        </Text>
        <Text style={styles(this.props).fontSize}>stable tap below to refresh</Text>
        <TouchableOpacity
          style={styles(this.props).refreshButton}
          onPress={() => this.checkNetworkConnection()}>
          <Text style={styles(this.props).fontSize}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 1,
    },
    notConnectedText: {
        fontSize:28
    },
    fontSize:{
        fontSize: 18, 
    },
    internetConnectedText:{
        fontSize: 18, 
      
    },
    imageContainer: {
      marginTop: 10,
      height: 200,
      width: 200,
      resizeMode: 'contain',
    },
    refreshButton: {
      marginTop: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'black',
      height: 32,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default VerfifyNetworkConnenction