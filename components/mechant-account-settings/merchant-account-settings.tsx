import React, {useEffect} from 'react';
//import {connect} from 'react-redux'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<any,any>
}

type State = {

}

export default class MerchantAccount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   // console.log(JSON.stringify(this.props.edit));
  }
  
  logOut = () => {
    this.props.navigation.navigate('D-MerchantSignIn')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 70, fontSize: 20}}>Account...</Text>
  
        <TouchableOpacity onPress={()=> this.logOut()} style={{height:50, width: 200,borderRadius: 35, backgroundColor:'#0D0F25', alignItems: 'center', justifyContent:'center'}}>
          <Text style={{color:'white'}}>LogOut</Text>
        </TouchableOpacity>
 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
/*const mapStatetoProps = (state)=>{
    return {
            edit : state.edit.Item,
       }
  }
export default connect(mapStatetoProps)(EditMerchantItems);*/
