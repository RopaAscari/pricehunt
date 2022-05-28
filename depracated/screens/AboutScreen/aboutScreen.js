import React from 'react';
import {Text,StyleSheet,View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class AboutScreen extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }

    render(){
        return(
            <View style={styles.body}>
               <Icon name="arrow-left" size={25} color="black" style={{top:22,left:10}} onPress={()=>this.props.navigation.navigate('Hub')}></Icon>
                <View style={styles.container}>
                    <Text>About Us</Text>
                        <Text>{"\n\n\n\n"}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:30,fontWeight:'bold'}}>TIGR </Text>
                            <Icon name="paw" size={30} style={{top:5.5}} color="#0F9BC1"/>
                            <Text>{"\n\n"}</Text>
                        </View>    
                    <View>
                            <Text style={{padding:6,fontSize:15,fontStyle:'italic'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                        </View>           
                </View>
                <View style={styles.container2}>
                 <View style={{padding:5}}>
                    <Text>{"\n\n"}</Text>
                    <View style={{flexDirection:'row',bottom:5}}>
                        <Icon name="facebook-box" size={30} style={{top:5.5}} color="#0F4389"/>
                        <Text style={{top:10}}>Follow us on facebook</Text>
                    </View>
                    <View style={{flexDirection:'row',top:5}}>
                        <Icon name="twitter" size={30} style={{top:5.5}} color="#0F9BC1"/>
                        <Text style={{top:10}}>Follow us on facebook</Text>
                    </View>
                    <View style={{flexDirection:'row',top:15}}>
                        <Icon name="instagram" size={30} style={{top:5.5}} color="#F85252"/>
                        <Text style={{top:10}}>Follow us on facebook</Text>
                    </View>
                </View>
            </View>
            <View style={{top:240}}>
            <Text style={{textAlign:'center',fontSize:20}}>PriceHunt 1.0.0</Text>
            </View>
            
            </View>
        )
    }
}
export default AboutScreen;

const styles = StyleSheet.create({
    body: {      
        flex:1,
        backgroundColor: 'white',

      },
      container:{
        top:100,
        alignItems:'center'
      },
      container2:{
        top:100,
        alignItems:'flex-start'
      }
    })