import React from 'react';
import {connect} from 'react-redux';
import ApiService from '../../services/ApiService'
import Icon from 'react-native-vector-icons/MaterialIcons';
import HubSearch from '../../components/HubSearch/hubSearch'
import MenuSlider from '../../../components/menu-slider/menu-slider'
import AsyncStorage from '@react-native-community/async-storage';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import MenuIcon from '../../components/SvgComponents/Icons/MenuIcon/menuIcon'
import SortIcon from '../../components/SvgComponents/Icons/SortIcon/sortIcon'
import ProfileIcon from '../../components/SvgComponents/Icons/ProfileIcon/profileIcon'
import RenderFavouriteItems from '../../components/RenderFavouriteItems/renderFavouriteItems'
import {Text,StyleSheet,View, Alert,Dimensions,ActivityIndicator,RefreshControl} from 'react-native';
import { TouchableOpacity, TextInput, ScrollView, createNativeWrapper } from 'react-native-gesture-handler';

let a = 0

class FavouriteScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           test:"",
           user:'',
           item:[],
           loading:true,
           val:true,
            noItem:false,
            test:'',
           favorite:false,
           err:false,
           track:0,
           refreshing:false,
           favId:[],
           counter:0,
           favID:[],
           del:''
        }
    }

    async componentDidMount(){
        await this.getItem()
    }

    Change = () => {
        this.setState({showMenu:true})
     }
    HandleFav = () => {
        return(<Text style={{fontSize:15}}>No Favourite Items</Text>)
    }
   ErrorFav = () => {
        return(<Text style={{fontSize:15}}>Error loading Favourite Items try again</Text>)
    }

    Map = async(res) =>{
        for (let i in res){
            const favitem = await ApiService.GetOneItem(res[i].itemId);
            if(favitem.data != null) {          
                this.state.item.push(favitem.data)       
               }
          }
         this.setState({loading:false})
    }

    getItem = async() => {
            ApiService.GetFavouriteItem(this.props.userInfo._id, this.props.account.auth.token).then(res=>res.data).then((res)=> {
            switch(res){
                case 'Favorite not found!': {           
                    this.setState({noItem:true})
                    this.setState({loading:false})
                    break;
                } 
                case res: {   
                    this.setState({favID:res})
                    this.Map(res)
                 break;
                }              
                case 'Exception: Cannot get item': { 
                    console.log('An error occurred')
                    this.setState({err:true})
                    return null
                }
                default:{
                    console.log("An error has occured")
                }
            }   
        })
}

 RemoveFavourite = async() => {
   // this.setState({loading:true})
   // await this.getItem()
}

FavoriteItems() {
 try{
   return this.state.item.map((data,name) => {  
      return <RenderFavouriteItems obj={data[0]} key={name} navigation={this.props.navigation} favId={this.state.favID[name]} RemoveFavourite={this.RemoveFavourite}/>
     });    
    }catch(error) {
       console.log(error)
   }
}

_refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._refreshListView()} />
    )
}      
async _refreshListView(){
    this.setState({refreshing:true});
    await this.getItem();
    this.forceUpdate();
    this.setState({refreshing:false});
}


    render(){
        return(
            <>
            <View style={styles.body}>
                <View style={{flexDirection:"row",left:10,top:5}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')}>
                        <ProfileIcon/>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'white',fontWeight:"700",left:5,top:7}}>{this.state.user}</Text>
                    </View>
                </View>
                <Icon1 name="arrow-left" size={25} color="white" style={{top:15,left:5}} onPress={()=>this.props.navigation.navigate('Hub')}/>
                <View style={{alignSelf:'flex-end',justifyContent:'flex-end',position:'absolute',top:5,right:5}}>
                <Icon name="menu" size={35} style={{bottom:8,right:2}} color="white" onPress={this.Change}/>
                 </View>
                <View style={{alignSelf:'center',top:10}}>
                    <Text style={{color:'white',fontFamily:'Segoe ui semibold italic',fontSize:20 }}>Favourite Items</Text>
                </View>
                <View>
                    <HubSearch/>
                </View>
                <View style={{flexDirection:'row',top:22,left:17}}>
                
                    <Text style={{color:'white',fontFamily:'Segoe ui semibold italic'}}>  Sort </Text>
    
                    <Icon name="arrow-drop-down" size={35} style={{bottom:8,right:10}} color="white"/>
                    <View style={{top:6,right:7}}>
                      <SortIcon/>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <ScrollView refreshControl={this._refreshControl()}>
                    <Text>{"\n\n"}</Text>    
                    { 
                      this.state.loading?
                      <ActivityIndicator size="large" color="#0000ff"/>
                    :this.FavoriteItems()
                    }{
                        this.state.noItem?
                        this.HandleFav():null
                    }{
                        this.state.err?
                        this.ErrorFav():null
                    }                              
                </ScrollView>        
                       <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>
            </View>
            {
                this.state.showMenu?
                <MenuSlider navigation={this.props.navigation}/>
                : null         
            }    
            </>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#F85252',
        flex:1
      }, 
      container: {
        flex:2,
        alignItems: "center",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor: 'white',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        top:165
      },
    })

    const mapStatetoProps = (state)=>{
        return {
                 account: state.account.loginStatus,
                 userInfo: state.account.userObj,
                 count: state.item.count
           }
      }
    export default connect(mapStatetoProps,null)(FavouriteScreen);