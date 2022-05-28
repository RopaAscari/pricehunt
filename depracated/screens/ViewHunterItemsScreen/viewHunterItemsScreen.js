import React from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions, Alert,Image} from 'react-native'
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import ImageSlider from '../../components/ImageSlider/imageSlider'
import CommentSlider from '../../components/CommentSlider/commentSlider'

let a = true;

class ViewHunterItemsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          sub:false,
          track:true
        }
    }

   Change = () =>{
       this.setState({track:false})
   }

   Unchange = () =>{
    this.setState({track:true})
   }

    render(){
        return(
            <ScrollView>
            <View style={styles.body}> 
          
             <Icon1 name="arrow-left" size={30} color="#F85252" style={{top:15,left:5}} onPress={()=>this.props.navigation.navigate('PriceHub')}/>
                <View style={{alignSelf:'flex-end'}}>
                    <Text style={{fontWeight:'bold',zIndex:10,top:6.5,left:8}}>{this.props.count}</Text>
                <Icon2 name="shopping-basket" size={32} color="#F85252" style={{bottom:13,right:15}}onPress={()=>this.props.navigation.navigate('Favourite')}/>
             </View>
            
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontFamily:'copyfonts.com_segoe-ui-symbol',fontSize:40,color:'#F85252', }}>{this.props.item.merchantName}</Text>
                  {
                   this.state.track?
                    <TouchableOpacity style={{backgroundColor:'#F5BF2D', borderRadius:10,width: 74,height:24,padding:3.5,left:20,top:27}} onPress={this.Change}>
                            <Text style={{color:'white',fontSize:11,left:4,fontFamily:'Sitka Small'}}>Subscribe</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{backgroundColor:'black', borderRadius:10,width: 74,height:24,padding:3,left:20,top:27}} onPress={this.Unchange}>
                     <Text style={{color:'white',fontSize:11,left:4,fontFamily:'Sitka Small'}}>Subscribed</Text>
                    </TouchableOpacity>
                  }
                </View>
                </View>

                
                <Text>{"\n\n\n"}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:26,marginLeft:30,fontFamily:'copyfonts.com_segoe-ui-symbol'}}>{this.props.item.name}</Text>
                  <Icon1 name="heart" size={27} color="#FF391A" style={{top:7,left:20}}></Icon1>
                </View>
                    <View style={{flexDirection:'row',marginLeft:30,top:15}}>
                        <Icon2 name="attach-money" size={30} style={{bottom:6}} color="#35F012" onPress={()=>Favourite(false)}/>    
                        <Text style={styles.Text}>{this.props.item.price} JMD</Text>      
                    </View>             
                  <View elevation={15} style={styles.container}>
                    <ImageSlider images={this.props.item.images}/>
                 </View>
                 <View>
                    <Text style={{top:20,fontWeight:'bold',color:'#ED4E4E',fontSize:26,marginLeft:20}}>Description{"\n"}</Text>
                </View>

                <View style={styles.DescriptionContainer}>
                        <Text style={{fontSize:15.5,fontFamily:'sitka-small-815'}}>{this.props.item.description}</Text>
                </View>


                <View elevation={15} style={styles.container}>
                    <View style={styles.CommentsContainer}>
                         <Text style={{fontSize:20,color:'#EFB926'}}>See what others are saying</Text>
                    </View>
                    <CommentSlider item={this.props.item}/>
                </View>

                   
        </View>
     
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
  body:{
      backgroundColor:'white',
      marginBottom:30
  },
  DescriptionContainer:{ 
    marginLeft:35,
    marginRight:10,

  },
    container:{  
      alignItems:'center',
  } ,
  CommentsContainer:{
    top:60,
    alignItems:'center',
  },
  Text:{
      fontSize:16,
      fontFamily:'Segoe UI Semibold'
  },
  Subscribe:{
      top:400,
      left:15,
  },
  
  rectangle:{
    alignSelf:'center',
    alignItems:'center',
    width: 200,
    height: 270,
    backgroundColor: "white",
    borderRadius:25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
   }
 
})

const mapStateToProps = (state) =>{
    return {
        item: state.item.SelectedItem,
        count: state.item.count
    }
}
export default connect(mapStateToProps)(ViewHunterItemsScreen)