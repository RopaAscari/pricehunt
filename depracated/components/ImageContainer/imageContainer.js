import React from 'react'
import {View,Image,StyleSheet,Text,ScrollView} from 'react-native'
import { create } from 'react-test-renderer'
export default function ImageContainer(props){
    const width = 350
    const height = width*0.60

    return(
        <>
   <View style={{padding:30,alignSelf:'center'}}>
    <View elevation={40} style={styles.rectangle} >
             <ScrollView pagingEnabled horizontal>
                 <Image source={{uri: `data:image/gif;base64,${props.image}`}} style={{height,width,resizeMode:'contain',top:20,right:20}}/>  
            </ScrollView>
        </View>
    </View>
    </>
)}
const styles = StyleSheet.create({
    rectangle:{
  
        alignItems:'center',
        width: 300,
        height: 300,
        borderColor:'black',
        backgroundColor: "white",
        borderRadius:17,
        shadowColor: '#000000',
        shadowOffset: {
          width: 20,
          height: 20,
      }
       }
})