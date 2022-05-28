import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {RootState} from '@reducers/combined-reducers';
import {  NavigationScreenProp } from 'react-navigation';
import { SetItemAction } from '@actions/set-item-action';
import { SetItemActionType } from '@constants/item-types';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import { DarkTheme } from '@theme/dark/landing-screen-dark-theme';
import { LightTheme } from '@theme/light/landing-screen-light-theme.tsx';
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native';

type Props = {
    items:{
      name?: string,
      imageUrl?: string,
      price?:number,
      merchant?:string,
      popularLabel?: string
      containerType?: number,
      images?: Array<string>
    }
    theme: any
    reduxItemAction(item: any): void
    navigation: NavigationScreenProp<any,any>,
  }

function DynamicContainer1(props: Props){
    
    const src: object = { uri: props.items.imageUrl }
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
              <View style={styles(props).itemConatiner}>
                <Text style={styles(props).textBase}>{props.items.name}</Text>
                  <View style={[styles(props).row, {top: '2%'}]}>
                    <Image source={require(logoPath)} style={styles(props).logo}/>
                    <Text style={styles(props).merchantText}> {props.items.merchant}</Text>  
                    </View>
                    <Text style={styles(props).priceText}>$ {props.items.price} </Text>
                    <View style={styles(props).row}>                   
                        <Text style={styles(props).offerEndsText}>{"\n\n\n"}Offer ends soon!</Text>
                       <Image source={src} style={styles(props).imageContainer}/> 
                    </View>  
                 </View>        
              </View>
           <Text>{'\n\n\n'}</Text>  
        </View>  
      </TouchableWithoutFeedback>
    )
}

const styles = (props: Props) => StyleSheet.create({

    dynamicContainers2:{
      height:220, 
      width:200, 
      backgroundColor: props.theme === DARK ? DarkTheme.promotionalItemsBackgroundColor : props.theme === LIGHT ? LightTheme.promotionalItemsBackgroundColor: DEFAULT,
      alignSelf:'flex-end', 
      borderTopLeftRadius:10
    },
    itemConatiner:{
      marginLeft: '13%',
      marginTop: '13%',
    },
    merchantText:{
      color: props.theme === DARK ? DarkTheme.promotionalItemsMerchantColor :props.theme === LIGHT? LightTheme.promotionalItemsMerchantColor: DEFAULT,
    },
    dynamicContainers2Image:{
      top:'7%',
      height:180,
      width:180
    },
    scrollPosition:{
      left:'10%'
    },
    logo:{
      top:'1%',
      height:15,
      width:15
    },
    offerEndsText:{ 
      color:'#DCDCDC',
      fontSize:17
   },
    priceText:{
      top:'10%',
      fontSize: 20,
      color:props.theme === DARK ? DarkTheme.promotionalItemsPriceColor : props.theme === LIGHT ? LightTheme.promotionalItemsPriceColor: DEFAULT,
    },
    row:{
      flexDirection:'row',
      alignSelf:'flex-start', 
    }, 
    imageContainer:{
      right:'15%',
      bottom: '30%',
      height:220, 
      width:220, 
      resizeMode:'contain'
     },
    container: {
      left:5,
      width: 350,
      height: 220,
      borderRadius: 17,
      backgroundColor: props.theme === DARK ? DarkTheme.promotionalItemsBackgroundColor: props.theme === LIGHT ? LightTheme.promotionalItemsBackgroundColor: DEFAULT,
      elevation:15,
    },
    textBase:{
      color:'#EFB926',
      textAlign:'left',
      fontSize:25,
      fontWeight: 'bold'
      //padding: 20
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
export default connect(mapStateToProps, mapDispatchToProps)(DynamicContainer1);
