import React from 'react';
import {Text,StyleSheet,View} from 'react-native'

type Props = {

}

export default function ManagePromotions(props: Props){
    return(
        <View style={styles.container}>
        <Text style={{marginTop:70,fontSize:20}}>You currently have no promotions</Text>
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