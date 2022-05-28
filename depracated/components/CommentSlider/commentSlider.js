import React from 'react'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import ImageContainer from '../ImageContainer/imageContainer'
import ApiService from '../../services/ApiService'
import AsyncStorage from '@react-native-community/async-storage';

import {Image,Text,StyleSheet,View,ScrollView, Dimensions,TouchableOpacity,TextInput,Alert,ActivityIndicator} from 'react-native'


const width = 550
const height = width*0.60


export default class ImageSlider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          active:0,
         comment:"",
         comments:"",
         loading:true
        }
    }

    componentDidMount(){
      this.GetAllComments()
    }

    onChangeText = (key, val) => {
      this.setState({ [key]: val})
  }
 
   Date = () => {

     const date = new Date().getDate();
     const month = new Date().getMonth() + 1 
     const year = new Date().getFullYear();
     return date + '/' + month + '/' + year
     //console.log(FullDate)
   }

   GetAllComments = () => {
     ApiService.GetAllComments(this.props.item._id).then((res)=>res.data).then((comments)=>{
       if(comments!=null){
       //  console.log("Test",comments.length)
         this.setState({comments:comments})
         this.setState({loading:false})     
       }
     })
   }

   AddComments = async() => {
    try {
      const value = await AsyncStorage.getItem("Token");
      if (value !== null) {
          var user = JSON.parse(value)
          const name = await AsyncStorage.getItem("User")
            if (name !== null) {
            const comment = {
              userId : user._id,
              itemId: this.props.item._id,
              comment: this.state.comment,
              date: this.Date(),
              name:name
            }    
            ApiService.AddComment(comment).then((res) =>res.data).then((res)=>{
              switch(res){
                case "comment Added!":{
                  console.log("Comment Added")
                  this.setState({loading:true})     
                  this.GetAllComments()
                  //this.setState({loading:false})   
                  break;
                }
                case "comment not added!":{
                   console.log("Comment was added")
                   break;
                 }
              }})
          }
      }
      
    }catch(error){
      console.log(error)
    }
  }

  Comments = () => {
            try{
              console.log(this.state.comments)
              if(this.state.comments !== 'Comment not found!' )
              {
               return this.state.comments.slice(0).reverse().map((data,index)=>{
                return (        
                  <>
                    <View style={{padding:135,alignSelf:'center'}}>
                        <View elevation={20} style={styles.rectangle} >
                            <View  style={{flexDirection:'row'}}>
                                 <Icon2  size={25} name='account-circle' color='#F85252'/>
                                 <Text  style={{top:4,fontWeight:'bold'}}>{data.name}</Text>
                            </View>
                              <Text  style={{marginLeft:8,marginRight:8,fontSize:15,top:5,fontStyle:'italic'}}>{data.comment}</Text>
                              <Text style={{marginLeft:8,marginRight:8,fontSize:13,top:5,fontStyle:'italic',top:10}}>{data.date}</Text>
                        </View>
                     </View>
                  </>
                  )
               })
    
              }else{
                return(
                <View style={{padding:135,alignSelf:'center'}}>
                <View elevation={20} style={styles.rectangle} >
                    <View  style={{flexDirection:'row'}}>
                         <Icon2  size={25} name='account-circle' color='#F85252'/>
                    </View>
                      <Text style={{marginLeft:8,marginRight:8,fontSize:15,top:5,fontStyle:'italic'}}>Be the first to comment</Text>                     
                </View>
             </View>
                )
              }
            } catch(error){
                console.log(error)
        }
    }

render(){
 
    return(
         <>
            <View style={{marginTop:0,height,width,alignItems:'center'}}>           
                <ScrollView onScroll={this.change} horizontal={true} pagingEnabled style={{width,height}} showsHorizontalScrollIndicator={false}>
                {
                  this.state.loading?
                  <ActivityIndicator size="large" color="#0000ff" style={{padding:150,left:120}}/>
                    :this.Comments()
                }   
                </ScrollView>    
                    
             </View>
             <View style={{marginLeft:40}}>
                    <Text style={{fontSize:16,color:'#F85252'}}>Leave a Comment</Text>
                     
                      <TextInput  placeholder='Type a message here' style={{height:130,width:350,backgroundColor:'white',top:10,borderRadius:20,elevation:11 ,borderColor:'grey',borderWidth:2,right:5,textAlignVertical:'top'}} onChangeText={val => this.onChangeText('comment', val)}></TextInput>
                     <View>
                       <Text>{"\n"}</Text>
                        <TouchableOpacity style={{backgroundColor:'#EFB926', borderRadius:10,width: 70,height:27,padding:2}} onPress={this.AddComments}>
                                <Text style={{color:'white',fontSize:17,left:4,fontWeight:'700'}}>Submit</Text>
                        </TouchableOpacity>
                     </View>
              </View>   
        </>
        )
    }
}

const styles = StyleSheet.create({
  rectangle:{
    alignItems:'center',
    width: 290,
    height: 100,
    borderColor:'black',
    backgroundColor: "white",
    borderRadius:17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
 },
})