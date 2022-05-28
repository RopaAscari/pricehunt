import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '@reducers/combined-reducers';
import {  NavigationScreenProp } from 'react-navigation';
import { SetItemAction } from '@actions/set-item-action';
import { DARK, LIGHT, DEFAULT } from '@constants/theme-types';
import { SetItemActionType } from '../../constants/item-types';
import { DarkTheme } from '@theme/dark/landing-screen-dark-theme';
import { LightTheme } from '@theme/light/landing-screen-light-theme.tsx';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

type Props = {
    items:{
      name: string,
      imageUrl?: string,
      price?:number,
      merchant?:string,
      popularLabel?: string
      containerType?: number,
      images?: Array<string>
    }
    theme:any,
    navigation: NavigationScreenProp<any,any>,
    reduxItemAction(item: any): void,
  }
  
function DynamicContainer2(props: Props){

    const src: object = { uri: props.items.imageUrl }
    const itemName: Array<string> = props.items.name.split(' ')
   // const { dispatch: { setItemData } } = useContext(ItemContext);
    const logoPath: string = '../../assets/images/Icon.png';

    const navigateToItemScreen = () => {
      props.reduxItemAction(props.items)
      props.navigation.navigate('Item')
    }

    return (
      <TouchableWithoutFeedback onPress={() => navigateToItemScreen()}>
        <View style={styles(props).scrollPosition}>
           <View style={styles(props).container}> 
              <View style={styles(props).row}>
                <Image source={src} style={[styles(props).imageContainer, styles(props).dynamicContainers2Image ]}></Image>
                  <View style={[styles(props).dynamicContainers2,{}]}>
                    <View style={styles(props).itemNameContainer}>
                     <Text style={styles(props).itemName}>{itemName[0]}</Text>
                     <Text style={styles(props).itemName}>    {itemName[1]}</Text>
                     <View style={[styles(props).row, {top:'5%'}]}>
                     <Image source={require(logoPath)} style={styles(props).logo}/>
                      <Text style={styles(props).merchantText}> {props.items.merchant}</Text>                    
                     </View>
                     <View style={styles(props).row}>
                       <Text style={styles(props).priceDollarSign}>$</Text>
                      <Text style={styles(props).priceText}>{props.items.price}</Text>
                    </View>
                    </View>
                    <Text style={styles(props).offerEndsText}>Offer ends soon!</Text>
                  </View>
               </View>
           </View>
        </View>
      </TouchableWithoutFeedback>
    )
}

const styles = (props: Props) => StyleSheet.create({

    dynamicContainers2:{
      width:200,
      height:220, 
      alignSelf:'flex-end', 
      borderTopLeftRadius:10,
      borderTopRightRadius:17,
      backgroundColor:'#005BA6', 
      borderBottomRightRadius: 17,
    },
    offerEndsText:{
      top:'25%',
      fontSize:17,
      color:'#DCDCDC', 
      textAlign:'center',   
   },
    dynamicContainers2Image:{
      top:'7%',
      width:180,
      height:180, 
    },
    scrollPosition:{
      left:'10%'
    },
    logo:{
      top:'1%',
      height:15,
      width:15
    },
    priceText:{
      top:'10%',
      fontSize:25, 
      color:'white'
    },
    merchantText: {
      fontSize:12,
      color: 'white',    
    },
    itemNameContainer:{
      marginTop: 20,
      marginLeft: 20,     
    },
    itemName: {
      fontSize:24, 
      color:'white'
   },
    priceDollarSign:{
      top:'10%',
      color: '#F7A03C'   
    },
    row:{
      flexDirection:'row',
      alignSelf:'flex-start', 
    }, 
    imageContainer:{
      width:220, 
      height:220, 
      bottom: '20%',
      resizeMode:'contain'
     },
    container: {
      left:5,
      width: 350,
      height: 220,
      elevation:15,
      borderRadius: 17,
      backgroundColor: props.theme === DARK ? DarkTheme.promotionalItemsBackgroundColor: props.theme === LIGHT ? LightTheme.promotionalItemsBackgroundColor: DEFAULT,
    },
    textBase:{
      fontSize:25,
      color:'#EFB926',
      textAlign:'left',    
      fontWeight: 'bold'
    }
  })

  const mapStateToProps = (state: RootState) => {
    return {
        theme: state.theme.theme,
    }
  }
  

  const mapDispatchToProps = (dispatch: Dispatch<SetItemActionType>) => {
    return {
             reduxItemAction:(item: any) => dispatch(SetItemAction(item))
       }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(DynamicContainer2);
  