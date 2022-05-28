import React,{Suspense,lazy} from 'react';
import {Text,StyleSheet,View, Alert,Dimensions,ActivityIndicator, RefreshControl} from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MenuSlider from '../../../deprecated/MenuSlider/menuSlider'
import MenuIcon from '../../components/SvgComponents/Icons/MenuIcon/menuIcon'
import ProfileIcon from '../../components/SvgComponents/Icons/ProfileIcon/profileIcon'
import SortIcon from '../../components/SvgComponents/Icons/SortIcon/sortIcon'
import HubSearch from '../../components/HubSearch/hubSearch'
import RenderHunterItems from '../../components/RenderHunterItems/renderHunterItems'
import ApiService from '../../services/ApiService'
import LazyLoad from 'react-lazyload'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'

class PriceHubScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           test:"",
           user:'',
           item:[],
           width: 110,
           loading:true,
           noItem:false,
           favItem:[],
           refreshing:false,
           search:'',
           favsize:0
        }
    }

async componentDidMount(){
     await this.getItem()
     console.log("ID",this.props.userInfo._id)
     console.log("TOKEN",this.props.account.auth.token)
}

SearchItem = () =>{
    this.setState({loading:true})
    this.setState({noItem:false})
    ApiService.GetItem(this.state.search).then((res)=>res.data).then((res)=>{
        switch(res){
            case "Item not found!": {           
                this.setState({noItem:true})
                this.setState({loading:false})
                break;
            }
            case res: {             
                this.setState({item:res}) 
                  ApiService.GetFavouriteItem(this.state.test._id).then((res)=>res.data).then((favItem)=>{
                    if(favItem == 'Favorite not found!'){
                        console.log( 'Favorite not found!')
                        this.setState({favItem:'Favorite not found!'})
                        this.setState({loading:false})                          
                    }else{
                        this.setState({favItem:favItem})
                        this.setState({loading:false}) 
                        console.log(this.state.favItem)
                    }
                })
                
                break;
            }  
            default: { 
                console.log('An error occurred')
                return null
            }
       }    
   })
}

 getItem = async() => {
        ApiService.GetItem(this.props.search).then((res)=>res.data).then((res)=>{
            switch(res){
                case "Item not found!": {           
                    this.setState({noItem:true})
                    this.setState({loading:false})
                    break;
                }
                case res: {             
                    this.setState({item:res}) 
                    ApiService.GetFavouriteItem(this.props.userInfo._id,this.props.account.auth.token).then((res)=>res.data).then((favItem)=>{
                        if(favItem == 'Favorite not found!'){
                            console.log( 'Favorite not found!')
                            this.setState({favItem:'Favorite not found!'})
                            this.setState({loading:false})                          
                        }else{
                            this.setState({favItem:favItem})
                            this.setState({favsize:this.state.favItem.length})
                            this.setState({loading:false}) 
                            console.log(this.state.favItem)
                        }
                    })
                    
                    break;
                }  
                default: { 
                    console.log('An error occurred')
                    return null
                }
           }    
     })
}

onChangeText = (key, val) => {
    this.setState({ [key]: val})
}

    Items() {
        try{
            return this.state.item.map((data,name) =>{   
            return(
                <RenderHunterItems obj={data} key={name} navigation={this.props.navigation} fav={this.state.favItem} increment={this.Increment} favcount={this.state.favsize}/>
            )});
        }catch(error) {
           return null
       }
    }

    onLayout(e) {
        if (this.state.width !== e.nativeEvent.layout.width) {
          this.setState({
            width: e.nativeEvent.layout.width
          })
        }
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
        this.Items(this.props.search)
        this.setState({refreshing:false});
    }    

    HandleItem = () =>{
        return(<Text>No exact matches found</Text>)
    }
    
    Change = () => {
        this.setState({showMenu:true})
    }
    
    Increment= () =>{
        this.setState({favsize:this.state.favsize + 1})
    }
    
    render(){
        const width = `${200 / parseInt(this.state.width / 110)}%`;
        return(
          <>
            <View style={styles.body}>
                <View style={{flexDirection:"row",left:10,top:5,}}>
                 
                       <Text style={{left:9,zIndex:40,fontFamily:'Segoe ui semibold ',color:'white',fontSize:15,fontWeight:'700'}}>{this.state.favsize}</Text>
                   
                    <Icon name="shopping-basket" size={32} color="yellow" onPress={()=>this.props.navigation.navigate('Favourite')}/>
                    <View>
                        <Text style={{color:'white',fontWeight:"700",left:5,top:12,fontSize:13}}>{this.state.user}</Text>
                    </View>
                </View>
                <Icon1 name="arrow-left" size={25} color="white" style={{top:15,left:5}} onPress={()=>this.props.navigation.navigate('Hub')}/>
                <View style={{alignSelf:'flex-end',justifyContent:'flex-end',position:'absolute',top:5,right:5}}>
                <Icon name="menu" size={35} style={{bottom:8,right:2}} color="white" onPress={this.Change}/>
                 </View>
                <View style={{alignSelf:'center',top:10}}>
                    <Text style={{color:'white',fontSize:22 ,fontFamily:'Segoe ui semibold italic',}}>Price Hub</Text>
                </View>


                <View style={{flexDirection:'row',justifyContent:'center'}}>       
            <TouchableOpacity style={{backgroundColor:'white',top:18,height:35,borderTopLeftRadius:20,borderBottomLeftRadius:20,width:80,padding:6}}>
            <View style={{flexDirection:'row'}}>                        
                    <Text style={{fontFamily:'Segoe ui semibold italic',color:'grey'}}>Category</Text>
                    <Icon name="arrow-drop-down" size={33} style={{right:8,bottom:5}} color="grey"/>
                </View>                    
            </TouchableOpacity>
            <View elevation={30} style={{    shadowOffset: {width: 15,height: 15,shadowColor: '#000000',}}}>      
                <TextInput  style={{height:35,backgroundColor:'white',width:210,top:18,elevation:23}} placeholder="enter product name" onChangeText={val => this.onChangeText('search', val)}></TextInput>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor:'#EFB926',top:18,height:35,borderTopRightRadius:20,borderBottomRightRadius:20,width:69,padding:6,elevation:20}} onPress={this.SearchItem}>
                    <Text style={{color:'white',fontFamily:'Segoe ui semibold italic',}}>Search</Text>
                </TouchableOpacity>
            </View>
        </View> 
                <View style={{flexDirection:'row',top:35,left:17}}>
                   <Text style={{color:'white',fontFamily:'Segoe ui semibold italic',}}>  Sort </Text>
                    <Icon name="arrow-drop-down" size={35} style={{bottom:6,right:10}} color="white"/>
                       <View style={{top:8,right:7}}>
                           <SortIcon/>
                      </View>
                </View>
            </View>

     

            <View style={styles.container} onLayout={this.onLayout.bind(this)}>

                <ScrollView refreshControl={this._refreshControl()}>   
               
                <View style={styles.container2} onLayout={this.onLayout.bind(this)}>      
                   {
                    this.state.noItem?
                    this.HandleItem():null                    
                    }    
                            
                    { this.state.loading?
                     <ActivityIndicator size="large" color="#0000ff" style={{top:100}}/>
                    : this.Items()
                    }                
                 </View>  
                 <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>       
               </ScrollView>       
            </View>
            {
            this.state.showMenu?
            <MenuSlider navigation={this.props.navigation}/>
            : null         
            }  
            <Text>{"\n\n\n\n\n"}</Text>  
         </>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#F85252',
        flex:2
      }, 
      container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 40,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor: 'white',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        top:190
      },  
      container2: {
      
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        right:20,
        top:30
      },
      wrapper: {
        marginVertical: 10, alignItems: 'center'
      }
    })
    
const mapStatetoProps = (state)=>{
     return {
            search : state.search.searchParam,
            account: state.account.loginStatus,
            userInfo: state.account.userObj,
        }
}
export default connect(mapStatetoProps)(PriceHubScreen);
