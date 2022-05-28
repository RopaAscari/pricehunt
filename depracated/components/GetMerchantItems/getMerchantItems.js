
//import { ReactReduxContext } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
//import ApiService from '../../services/ApiService'
import PTRView from 'react-native-pull-to-refresh';
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import RenderMerchantItems from '../RenderMerchantItems/renderMerchantItems'
import {Text,View,ActivityIndicator,StyleSheet,Dimensions,RefreshControl, Alert} from 'react-native'
import { ErrorMessage } from 'react-hook-form';

export default class GetMerchantItems extends React.Component{
    constructor(props){
            super(props)
            this.state = {
                item:[],
                loading:true,
                refreshing: false,
                test:'',
                noItem:''
            }
        }

async componentDidMount(){
     //   await this.getItem()
    }

  /*    getItem = async() => {
   
            ApiService.GetMerchantItem(this.props.account._id).then(res=>res.data).then((res)=> {
            switch(res){
                case 'Item not found!': {
                    console.log("Failed")
                    this.setState({noItem:true})
                    this.setState({loading:false})
                    break;
                }
                case res: {                                     
                    this.setState({item:res})
                    this.setState({loading:false})
                    break;
                } 
                defaut:{
                    console.log("An error has occured")
                }
            }
        }).catch((Error=>{
            console.log(Error)
        }))
    } /*/


Fetch = () => {
        return this.state.item.map((data, name) => {   
        return <RenderMerchantItems obj={data} key={name}  navigation={this.props.navigation}/>
    });
}

_refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._refreshListView()} />
    )
}      
_refreshListView(){
    this.setState({refreshing:true});
    this.getItem()
    this.setState({refreshing:false});
}

NoItems = () =>{
    return(<Text>You have no items</Text>)
}

render(){ 
  return(
    
      <ScrollView refreshControl={this._refreshControl()}>         
            <View style={styles.container}>
            { this.state.loading?
                <ActivityIndicator size="large" color="#0000ff"/>
            : this.Fetch()
            }    
            { this.state.noItem?
               this.NoItems() : null
            } 
            </View>
        <Text>{"\n\n\n\n\n\n"}</Text>
    </ScrollView>
  )
 }
}
const styles = StyleSheet.create({
    container: {  
        alignItems: "center", 
        backgroundColor: 'white',
        padding:25,
      },
})
/*const mapStatetoProps = (state)=>{
    return {
            account : state.account.userObj,
       }
  }
export default connect(mapStatetoProps)(GetMerchantItems);*/