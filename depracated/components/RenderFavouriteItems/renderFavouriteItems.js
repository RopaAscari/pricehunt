import React,{useState, useEffect} from 'react'
import ViewHunterItems from '../ViewHunterItems/viewHunterItems'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiService from '../../services/ApiService'
import {Text,StyleSheet,View, Alert,  Modal,TouchableOpacity,Image} from 'react-native';

export default function RenderFavouriteItems(props){
    
  useEffect(()=>{
  })

const [fav,Favourite] = useState(true)

const unFavourite = () => {
  props.RemoveFavourite()
Favourite(false);
ApiService.RemoveFavoriteItem(props.favId._id).then((res)=>res.data).then((res)=>{
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
    }
  }
})
 }

    return(
        <View>
            <TouchableOpacity onPress={()=>ViewHunterItems(props.navigation,props.obj)}>
            <View elevation={5} style={styles.rectangle}>
            <View style={{flexDirection:'row'}}>
                <View>                       
                    <Image source={{uri: `data:image/gif;base64,${props.obj.thumbnailImage}`}} style={styles.ImageContainer}/>     
                </View>  
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.ItemNameContainer}>Item Name:</Text>
                        <Text style={styles.ItemNameText}>{props.obj.name}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.PriceConatiner}>Price:</Text>
                        <Text style={styles.PriceText}>${props.obj.price}.00 JMD</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{top:80,left:15,color:'#F85252',fontWeight:'700',fontSize:17,fontStyle:'italic'}}>Merchant: </Text>
                        <Text style={{top:80,left:18, color:'black',fontSize:15,fontFamily:'Segoe UI Semibold'}}>{props.obj.merchantName}</Text>
                    </View>
                  
                    <View style={styles.FavIcon}>                   
                    { fav?
                          <Icon name="heart" size={25} style={{left:40,zIndex:5}} color="red" onPress={unFavourite}/>:
                          <Icon name="heart-outline" size={25} style={{left:40,zIndex:5}} color="grey" onPress={()=>Favourite(true)}/>
                    }             
                    </View>
                </View> 
            </View>
            </View>
        <View><Text></Text></View>
        </TouchableOpacity>
     </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      top:60,
      backgroundColor: "white",
    },
   
    rectangle: {
        bottom:20,
      width: 210 * 2,
      height: 140,
      backgroundColor: "white",
      borderRadius:25,
      bottom:10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 3,
        height: 3,
    }
  },
    ItemNameContainer:{
      position:'absolute',top:30,left:15,
      color:'#F85252',fontWeight:'700',fontSize:17,fontStyle:'italic'
    },
    ItemNameText:{
        position:'absolute',top:30,left:110,
        color:'black',fontSize:15,fontFamily:'Segoe ui semibold italic'
      },
    PriceConatiner:{
      position:'absolute',top:55,left:15,
      color:'#F85252',fontWeight:'700',fontSize:17,fontStyle:'italic'
    },
    PriceText:{
        position:'absolute',top:55,left:63,
        color:'black',fontSize:15,fontFamily:'Segoe ui semibold italic'
      },
    FavIcon:{
      left:220,
      top:85
    },
    ImageContainer:{
      resizeMode:'contain',
      top:5,
      width: 100,
      height: 100 ,
      borderTopLeftRadius:20 
    }
  });