import React, { useEffect } from 'react';
//import {connect} from 'react-redux'
import {Text,StyleSheet,View} from 'react-native'

export default class EditMerchantItems extends React.Component{
    constructor(props){
        super(props)
            this.state = {
        }
    }

componentDidMount(){
    console.log(JSON.stringify(this.props.edit))
}
render(){
    return(
        <View style={styles.container}>
        <Text style={{marginTop:70,fontSize:20}}>Editing...</Text>
        </View>
    )
}
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
  }
})
/*const mapStatetoProps = (state)=>{
    return {
            edit : state.edit.Item,
       }
  }
export default connect(mapStatetoProps)(EditMerchantItems);*/