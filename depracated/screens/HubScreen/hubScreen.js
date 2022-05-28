import React from'react'
import {connect} from 'react-redux'
import {Text,View,StyleSheet, Alert, Dimensions, Button, RefreshControl,Switch} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import HubSVG1 from '../../components/SvgComponents/HubSvg/hubSVG1'
import HubSVG2 from '../../components/SvgComponents/HubSvg/hubSVG2'
import ProfleButton from '../../components/ProfileButton/profileButton'
import { TouchableOpacity, ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import MenuSlider from '../../../deprecated/MenuSlider/menuSlider'
import MenuIcon from '../../components/SvgComponents/Icons/MenuIcon/menuIcon'
import Search from '../../components/Search/search'
import FeaturedItems from '../../components/FeaturedItems/featuredItems'


 class HubScreen extends React.Component{
    constructor(props){
        super(props)

        this.state = {
         showMenu:false,
         darkmode:false,
         theme:'white'
        }
    }
    
 Change = () => {
    this.setState({showMenu:true})
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
    this.setState({refreshing:false});
}

DarkMode = () =>{
    this.setState({darkmode:!this.state.darkmode})
  }

    render(){
        const { theme } = this.state; 
        return(
        <>
          <ScrollView refreshControl={this._refreshControl()}>       
            <View style={[styles.body],{backgroundColor:this.state.darkmode?"#151414":"white"}}>
                    <View style={{flexDirection:"row"}}>
                        <HubSVG1/>
                        <View style={styles.MenuButton}>            
                        <View>
                        <Icon name="menu" size={35} style={{bottom:8,right:10}} color="black" onPress={this.Change}/>
                         
                        </View>                    
                        </View>
                        <View style={styles.ProfileButton}>
                            {
                               this.props.account.auth !=null && this.props.account.auth?
                                <ProfleButton  navigation={this.props.navigation}/>
                                :null
                            }
                            <Text style={styles.PriceHuntHeading}>Price Hunt</Text>
                            <Text style={styles.PriceHuntText}>{"\n\n"}Find the best prices around with us</Text>   
                        </View>                
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>     
                      <Search navigation={this.props.navigation}/>
                   
                    </View>
                    <View style={{position:'relative',justifyContent:'center',alignSelf:'center'}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.darkmode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.DarkMode}
                        value={this.state.darkmode}
                      />
                    </View>
                 
                        <Text>{"\n\n\n\n\n"}</Text>
                    <View>   
                        
                        <Text style={styles.ThinkItText}>Think It</Text>
                        <Text style={styles.SearchItText}>Search It</Text>
                        <Text style={styles.FindItText}>Find It</Text>        
                        { !this.props.account?
                        <TouchableOpacity elevation={10} style={{elevation:50,zIndex:30,top:10,left:190,height:30,width:80,backgroundColor:'white',alignSelf:'center',bottom:30,borderRadius:30,padding:5,borderColor:'black'}} onPress={()=>this.props.navigation.navigate("SignIn")}><Text style={{textAlign:'center',alignSelf:'center',justifyContent:'center',right:0,zIndex:10,color:'#2AEC2A',fontWeight:'700'}}>SIGN IN</Text></TouchableOpacity>
                        :null
                        }
                        </View>
                    <View style={styles.SVG2}>  
                    {!this.props.account?
                        <Text style={{position:'absolute',left:25,top:80,zIndex:5,color:'white',fontWeight:'600',fontStyle:'italic'}}>Sign In and get{"\n"} daily updates </Text>                                   
                    :null
                    }
                           <HubSVG2/>         
                    </View> 
                    { <View>
                        <FeaturedItems/>
                    </View>    }
                       
                    {
                    this.state.showMenu?
                    <MenuSlider navigation={this.props.navigation}/>
                    : null         
                    }                     
            </View>
            </ScrollView>
        </>
        )
    }
}

const styles = StyleSheet.create({
    body:{
       width:Dimensions.get('window').width,
       height:Dimensions.get('window').height
    },
    SVG2:{
        bottom:150,
        alignSelf:'flex-end',
        zIndex:-1
    },
    MenuButton: {
        alignItems:'flex-end',
        flex:1,
        top:10,

    },
    ProfileButton: {
        position:'absolute',
        left:10,
        top:5
    },
    PriceHuntHeading:{
        position:'relative',
        top:20,
        fontSize:25,
        color:"white",
        fontWeight:"700",
        fontFamily:'Segoe UI Semibold'
        //fontFamily:'Segoe UI.ttf'
    },
    PriceHuntText:{
        fontSize:9.3,
        color:"white",
        fontWeight:'bold',
        left:15,
        fontFamily:'Segoe UI'
    },
    SearchBar:{
        position:'absolute',
        bottom:280,
        width:260,   
        height:45,
        alignSelf:"center",
        elevation:50,
        backgroundColor:'white',
        borderBottomLeftRadius:40,
        borderTopLeftRadius:40,
       flex:1,
       left:35,zIndex:-1
    },
    SearchButton:{
         height:45,
         width:80,
         borderBottomRightRadius:40,
         borderTopRightRadius:40,
         backgroundColor:'#F85252',
         elevation:30,
         right:20
    },
    SearchText:{
       color:"white",
       padding:10,

       fontFamily:'Segoe UI'
    },
    ThinkItText:{
        borderBottomColor:'black',
        position:'absolute',
        bottom:240,
        fontSize:25,
      //  fontWeight:'700',
        color:"#A93838",
        alignSelf:"center",
        fontFamily:'Sitka Small'
    },
    SearchItText:{
        borderBottomColor:'black',
        position:'absolute',
        bottom:220,
        fontSize:18,
        fontFamily:'Sitka Small',
        color:"#EFB926",
        alignSelf:"center",
    },
    FindItText:{
        borderBottomColor:'black',
        position:'absolute',
        bottom:200,
        fontFamily:'Sitka Small',
        color:"#A93838",
        alignSelf:"center"
    }
})

const mapStatetoProps = (state)=>{
    return {
            account : state.account.loginStatus,
       }
  }
export default connect(mapStatetoProps)(HubScreen);