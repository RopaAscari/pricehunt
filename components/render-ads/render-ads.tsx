import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    color:any
    pagination: any
}

function RenderAds(props: Props){

    return(
        <View style={styles(props).container}>
             <Text style={styles(props).adsHeading}>PriceHunt Ads</Text>
             {props.pagination}
        </View>
    )
}

const styles = (props:Props) => StyleSheet.create({
    container: {
        width: 350,
        height: 200,
        borderRadius:25,
        alignSelf: 'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: props.color,
    },
    adsHeading: {
        fontSize: 20, 
        fontWeight: 'bold'
    }
})

export default RenderAds