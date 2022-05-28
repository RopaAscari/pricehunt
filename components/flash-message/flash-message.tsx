import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight, Alert} from 'react-native';

type Props = {
   onRefresh: () => void
   refresh: boolean
};

type State = {
  flashMessage: boolean;
};

export default class FlashMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      flashMessage: false,
    };
  }

  render() {
    return (
      <View style={styles(this.props).container}>
        {this.props.refresh? (
          <View style={styles(this.props).flashMessage}>
           <MaterialIcons name="refresh" size={23} color="black" onPress={this.props.onRefresh}/>
          </View>
        ) : null}
       
      </View>

    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {

    },
    flashMessage: {
     // flex:1,
      zIndex: 1,
      elevation: 10,
      borderRadius:25,
      position: 'absolute',
      backgroundColor: 'white',
      width:80, //Dimensions.get('window').width, //- 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      //borderRadius: 15,
      height: 28,
      top: 200,
    },
  });
