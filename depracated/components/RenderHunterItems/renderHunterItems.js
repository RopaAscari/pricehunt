import {connect} from 'react-redux'
import React,{useState, useEffect} from 'react'
import ApiService from '../../services/ApiService'
import { ScrollView } from 'react-native-gesture-handler';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BusinessIcon from '../SvgComponents/Icons/BusinessIcon/businessIcon'
import ViewHunterItems from '../../components/ViewHunterItems/viewHunterItems'
import {Text,StyleSheet,View, Alert,  Modal,TouchableOpacity,Image} from 'react-native';


function RenderHunterItems(props){
 
  const [fav,Favourite] = useState(false)

  const [changed,Change] = useState(false)
  
  const FavItem = {
    userId:props.userInfo._id,
    itemId:props.obj._id
  }

  useEffect( () => {
    Compare();
  },[fav])
  
  const SelectFavourite = async() => {
    props.increment();
    Favourite(true);
    ApiService.AddFavouriteItem(FavItem,props.account.auth.token).then((res)=>res.data).then((status)=>{
      if(status != null){
        console.log(status)
      }
    }) 
  }

  const UnSelectFavourite = () => {
    Change(true);
    Favourite(false);
    console.log("TestingID",FavItem.userId)
    ApiService.GetFavouriteItem(FavItem.userId).then(res=>res.data).then((res)=> {
    console.log("RESPONSE",res)
    switch(res){
        case res: {   
          res.map((data,index)=>{
            if(data.itemId == props.obj._id){
            console.log("Testing....")
            ApiService.RemoveFavoriteItem(data._id).then((res)=>res.data).then((res)=>{
              switch(res){
                case'Favorite deleted successfully':{
                  console.log('Favorite deleted successfully')
                  break;
                }
                case'Favorite not deleted':{
                  console.log('Favorite not deleted')
                  break;
                }
                case 'Exception: Favorite not deleted':{
                  console.log('Exception: Favorite not deleted')
                  break;
                }
                default:{
                  console.log("Unexpected error")
                  break;
                }
              }
          })
        }}) 
     break;
    }  
    default:{
      console.log("ERROR!!!!!!!")
    }
  }
})
}

const Compare = () => {
    if(props.fav !== 'Favorite not found!'){
        props.fav.map((data,index)=> {
          if(data.itemId == props.obj._id){
              if(changed === false){
              console.log("Item favorited")
              Favourite(true);
            }
          }
          else{
            console.log("Item not favorited")
          }
        })
   }else{
     null
   }
  }

  return(
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>ViewHunterItems(props.navigation,props.obj,props.favcount)}>
              <View elevation={10} style={styles.rectangle}>
              <View style={{flexDirection:'row'}}>              
                  <View>
                      <View style={{flexDirection:'row'}}>
                        { fav?
                          <Icon name="heart" size={25} style={{top:12,right:70,position:'absolute',zIndex:5}} color="red" onPress={UnSelectFavourite}/>:
                          <Icon name="heart-outline" size={25} style={{top:12,right:70,position:'absolute',zIndex:5}} color="grey" onPress={SelectFavourite}/>
                        }
                          <View style={{left:50}}>                  
                          <Image source={{uri: props.obj.thumbnailImage}} style={styles.ImageContainer}/>  
                          </View>         
                      </View>
                      <View style={{top:50,left:45,alignItems:'center'}}>
                        <Text style={styles.ItemNameContainer}>
                          {props.obj.name}
                        </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <View style={{top:58,left:27,position:'absolute'}}>
                        <BusinessIcon/>
                        </View>
                        <Text style={styles.BusinessText}>{props.obj.merchantName}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <View style={{top:89,left:27,position:'absolute'}}>
                          <Icon1 name="attach-money" size={25} color="green"/>                       
                      </View>
                          <Text style={styles.PriceText}>{props.obj.price} JMD</Text>
                      </View>          
                  </View> 
              </View>
              </View>
           </TouchableOpacity>
        <View><Text>  </Text></View>   
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
     left:5,
      alignItems: "center",
      backgroundColor: "white",
  
    },
    rectangle: {
      bottom:20,
      width: 220,
      height: 250,
      backgroundColor: "white",
      borderRadius:25,
      bottom:10,
      left:15,
      top:15,
      shadowColor: '#000000',
      shadowOffset: {
        width: 8,
        height: 8    
    }
  },
    ItemNameContainer:{
      right:12,
      color:'black',fontSize:17,
      fontFamily:'Segoe ui semibold italic',
    },
    BusinessText:{
        position:'absolute',top:55,left:53.5,
        color:'#EFB926',fontSize:17,   fontFamily:'Segoe ui semibold italic',
    },
    PriceText:{
        top:88,left:53,position:'absolute',
        color:'black',fontSize:16,fontFamily:'Segoe ui semibold italic',
    },
    EditItemText:{
      textAlign:'right',
      left:220,
      top:85,
      position:'absolute',
      color:'#F85252',fontWeight:'700',fontSize:17,fontStyle:'italic',
      zIndex:20
    },
    ImageContainer:{
      top:30,left:50,
      width: 100,
      height: 100 ,left:10,
      borderTopLeftRadius:20 
      ,resizeMode:'contain'
    }
  });

const mapStatetoProps = (state)=>{
    return {
             account : state.account.loginStatus,
             userInfo: state.account.userObj,
             count: state.item.count
       }
  }
export default connect(mapStatetoProps,null)(RenderHunterItems);