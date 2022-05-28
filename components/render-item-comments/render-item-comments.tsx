import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
   comment?: string
}

export function RenderComments(props: Props){

    const quoteSrc: string = '../../assets/images/quote.png'

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon name="person-pin" size={27} color="#F85252"/>
                  <View style={styles.commentContainer}>
                     <Text style={styles.commentText}>{props.comment}</Text>
                  </View>
                <Image source={require(quoteSrc)} style={styles.imageContainer}/>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({

    imageContainer:{
        position:'absolute',
        left:'20%'
    },
    commentText:{
      fontSize:14,
     // fontFamily:'Roboto-Thin'
    },
    commentContainer:{
        left:'40%', 
        flexDirection: 'column', 
        flex: 0.9
    },
    row: {
        flexDirection:'row'
    },

    container: {
        position:'relative',
        left:5,
        width:320,
        height:85,
        elevation:10,
        borderRadius:15,
        padding:10,
        backgroundColor: 'white',
     },

})