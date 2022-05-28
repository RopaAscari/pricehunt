import React from 'react';
import {Text,StyleSheet,View} from 'react-native'

export default function ViewStatistics(){
    return(
        <View style={styles.container}>
        <Text style={{marginTop:70,fontSize:20}}>Statistics Loading...</Text>
        </View>
    )
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
}
})