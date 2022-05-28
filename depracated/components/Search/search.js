import React,{useEffect, useState} from 'react'
import {StyleSheet,View,Text,TouchableOpacity,TextInput, Alert} from 'react-native'
import {useForm} from 'react-hook-form'
import {SearchAction} from '../../actions/searchAction'
import {connect} from 'react-redux'

 function Search(props){

    const [search, Search] = useState("")

    const SearchItem = () => {
        if(search == '' || search == ' ')
        {
            Alert.alert("Cannot search an empty parameter")
        }else{
         //   props.rerenderParentCallback();
            props.reduxSearchAction(search)
            props.navigation.navigate('PriceHub')
        }
    }
    
    return(
        <View>
            <TextInput style={styles.SearchBar} placeholder="enter product name"  onChangeText={ (text) =>  Search(text)}></TextInput>         
                <View style={{bottom:220}}>
                    <TouchableOpacity style={styles.SearchButton} onPress={SearchItem}><Text style={styles.SearchText}>Search</Text></TouchableOpacity>
                </View> 
        </View>
    )
}
const styles = StyleSheet.create({
    SearchBar:{
        position:'absolute',
        bottom:220,
        width:270,   
        height:45,
        alignSelf:"center",
        elevation:30,
        backgroundColor:'white',
        borderBottomLeftRadius:40,
        borderTopLeftRadius:40,
       flex:1,
       right:140,zIndex:-1
    },
    SearchButton:{
        height:45,
        width:80,
        borderBottomRightRadius:40,
        borderTopRightRadius:40,
        backgroundColor:'#F85252',
        //elevation:30,
        right:60
   },
   SearchText:{
    color:"white",
    padding:10,
    fontSize:16,
   // fontWeight:"700",
    fontFamily:'Segoe UI'
  },
})
const mapDispatchToProps = (dispatch) => 
{
    return {
     reduxSearchAction:(search) => dispatch(SearchAction(search)) , 
  }
}
export default connect(null,mapDispatchToProps)(Search);