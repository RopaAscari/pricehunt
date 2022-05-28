import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, ImageBackground, Alert } from "react-native";

type Props = {
  // index: any;
   items:any
 }

export function RenderPopularItems(props: Props){

   const src: object = { uri: props.items.imageUrl };

   const navigateToPopularItemScreen = () => { 
      Alert.alert('Popular Item not ready')
      //  props.navigation.routes({key: '',name:'',params:{}})
      }

    return (
       <TouchableWithoutFeedback onPress={() => navigateToPopularItemScreen()}>
            <View style={styles.scrollPosition}>
               <View style={styles.container}>
                  <ImageBackground source={src} style={styles.imageContainer} imageStyle={{ borderRadius: 10}}>                      
                     <Text style={styles.popularLabel}>{props.items.popularLabel}</Text>           
                  </ImageBackground>  
               </View>
            </View>   
         </TouchableWithoutFeedback>   
    )
}

const styles = StyleSheet.create({

   scrollPosition: {
     // right:'30%'
   },
   container: {
      marginLeft:15,
      width:100,
      height:100,
      //marginTop:20,
      borderRadius:15,
      alignItems: 'center',
      backgroundColor: 'white',
   },
   imageContainer: { 
      width: 100, 
      height: 100,  
      opacity:0.89,
      borderRadius:15,
      resizeMode:'contain',
      alignItems: 'center',
      justifyContent:'center',
   },
   popularLabel: {
      fontSize: 16,
      color: 'white',
      fontWeight:'bold',
   }
})