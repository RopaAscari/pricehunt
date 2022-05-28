import React from 'react'
import ImageContainer from '../ImageContainer/imageContainer'
import {Image,Text,StyleSheet,View,ScrollView, Dimensions,TouchableOpacity} from 'react-native'

const width = 550
const height = width * 0.60

export default class ImageSlider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         rise: this.props.images[0],
         active: 0,
        }
    }

    componentDidMount(){
       console.log(this.props.images)
    }

    change = ({nativeEvent}) =>{
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
     if(slide !== this.state.active){
      this.setState({active:slide})
      }
    }

    SliderDot = () =>{
      return this.props.images.map((i,k) => {
          return(
            <Text key={k} style={k==this.state.active? styles.DotActive:styles.Dot}>⬤</Text>
          )
        })
    }

    Images = () => {
        if(this.props.images instanceof Array){
            try{
                return this.props.images.map((data,key) => {
                return (        
                  <>
                    <View style={{padding:190,alignSelf:'center'}}>
                        <View elevation={40} style={styles.rectangle} >
                            <TouchableOpacity onPress={()=>this.setState({rise:data})}>                        
                                        <Image source={{uri: data }} style={{height:100,width:100,resizeMode:'contain',top:20,left:10}}/>  
                            </TouchableOpacity>  
                        </View>
                     </View>
                    </>
                   )
                })
            } catch(error){
                console.log(error)
        }
      } else {
        return <Image source={{uri: props.images[0] }} style={{height:300,wdith:300}}/>  
      }
    }

render(){
 
    return(
        <>
            <View elevation={30} style={styles.rectangle2}>
                <Image source={{uri: this.state.rise}}  style={{height:270,width:310,resizeMode:'contain',top:4,bottom:10}}/>
            </View>
                <View style={{flexDirection:'row'}}>
                {
                    this.SliderDot()
                }
                </View>

            <View style={{marginTop:50,height,width}}> 
            
                <ScrollView onScroll={this.change} horizontal={true} pagingEnabled style={{width,height}} showsHorizontalScrollIndicator={false}>
                {
                    this.Images()
                }   
                </ScrollView>         
             </View>
        </>
        )
    }
}

const styles = StyleSheet.create({
ImageContainer:{
    width: 170,
    height: 170,
    resizeMode:'contain',

  },
  rectangle:{
    alignItems:'center',
    width: 160,
    height: 160,
    borderColor:'black',
    backgroundColor: "white",
    borderRadius:17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
   },

   rectangle2:{
       top:20,
    alignItems:'center',
    width: 400,
    height: 300,
    borderColor:'black',
    backgroundColor: "white",
    borderRadius:17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
  }
   },
   Dot:{
    top:90,fontSize:20,margin:5,color:'#888'
   },
   DotActive:{
    top:90,fontSize:20,margin:5,
    color:'#F14F4F'
   }

})