import React,{useState} from 'react';
import {Text,StyleSheet,View, Alert} from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchAction} from '../../actions/searchAction'
import {connect} from 'react-redux'

function HubSearch(props){

    const [search, Search] = useState("")

    const SearchItem = () => {
       console.log(JSON.stringify(props.val))
       props.rerenderParentCallback();
       props.reduxSearchAction(search)
      // props.navigation.navigate('PriceHub')
    }

    return(
        <View style={{flexDirection:'row',justifyContent:'center'}}>       
            <TouchableOpacity style={{backgroundColor:'white',top:18,height:35,borderTopLeftRadius:20,borderBottomLeftRadius:20,width:80,padding:6}}>
            <View style={{flexDirection:'row'}}>                        
                    <Text style={{fontFamily:'Segoe ui semibold italic',color:'grey',bottom:2}}>Category</Text>
                    <Icon name="arrow-drop-down" size={33} style={{right:8,bottom:7}} color="grey"/>
                </View>                    
            </TouchableOpacity>
            <View>      
                <TextInput style={{height:35,backgroundColor:'white',width:210,top:18,elevation:20}} placeholder="enter product name" onChangeText={(text)=>Search(text)}></TextInput>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor:'#EFB926',top:18,height:35,borderTopRightRadius:20,borderBottomRightRadius:20,width:64,padding:6}} onPress={SearchItem}>
                    <Text style={{color:'white',fontFamily:'Segoe ui semibold italic'}}>Search</Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
}
const mapDispatchToProps = (dispatch) => 
{
    return {
     reduxSearchAction:(search) => dispatch(SearchAction(search)) , 
  }
}
export default connect(null,mapDispatchToProps)(HubSearch);