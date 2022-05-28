import React from 'react'
import {connect} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import {EditMerchantItem} from '../../actions/editMerchantItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text,StyleSheet,View, Alert,  Modal,TouchableOpacity,Image} from 'react-native';
//import ApiService from '../../services/ApiService'

 function RenderMerchantItems(props){

  /*const Merch = () =>{ 
    props.reduxEditMerchantItem(props.obj)
    props.navigation.navigate('Edit')
   
  }

  const DeleteItem = () =>{
    ApiService.RemoveItem(props.obj._id).then((res)=>res.data).then((res)=>{
      if(res == 'Item deleted successfully'){
        console.log('Item deleted successfully')
      }else{
        console.log('Item not deleted')
      }
    })
  }*/
    return(
        <View>
        <TouchableOpacity onPress={Merch}>
            <View elevation={5} style={styles.rectangle}>
             
            <View style={{flexDirection:'row'}}>
                <View>                       
                    <Image source={{uri:props.obj.thumbnailImage}} style={styles.ImageContainer}/>     
                </View>  
                <View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.ItemNameContainer}>Item Name:</Text>
                      <Text style={styles.ItemNameText}>{props.obj.name}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.PriceConatiner}>Price:</Text>
                      <Text style={styles.PriceText}>${props.obj.price} JMD</Text>
                    </View>
                    <View>
                      <TouchableOpacity style={{position:'absolute'}}> 
                          <Text style={styles.EditItemText}>Edit Item</Text>
                      </TouchableOpacity>
                   </View>
                </View> 
                 <View style={{left:400,bottom:80,position:'absolute'}}>
                     <Icon name="delete-sweep" size={25} style={{zIndex:5,elevation:4}} color="black" onPress={DeleteItem}/>
                 </View>
             </View>
            </View>
        </TouchableOpacity>
      <View><Text></Text></View>
    </View>  
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      top:30,
      backgroundColor: "white",
    },
   
    rectangle: {
        bottom:20,
      width: 210 * 2,
      height: 120,
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
        color:'black',fontSize:17,fontStyle:'italic'
      },
    PriceConatiner:{
      position:'absolute',top:55,left:15,
      color:'#F85252',fontWeight:'700',fontSize:17,fontStyle:'italic'
    },
    PriceText:{
        position:'absolute',top:55,left:63,
        color:'black',fontSize:17,fontStyle:'italic'
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
      resizeMode:'contain',
      top:5,
      width: 100,
      height: 100 ,
      borderTopLeftRadius:20 
    }
  });
  /*const mapDispatchToProps = (dispatch) => 
{
    return {
     reduxEditMerchantItem:(item) => dispatch(EditMerchantItem(item)) ,
  }
}
export default connect(null,mapDispatchToProps)(RenderMerchantItems);*/