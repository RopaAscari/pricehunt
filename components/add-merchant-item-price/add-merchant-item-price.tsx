import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { format } from '@services/number-formater';
import Money from 'react-native-vector-icons/Fontisto';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, TouchableOpacity,Keyboard } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { NavigationScreenProp } from 'react-navigation';
import { SetItemAction } from '@actions/set-item-action';
import { RootState } from '@reducers/combined-reducers';
import { SetItemStepAction } from '@actions/set-add-item-progress';
import { SetItemActionType, SetItemStepStore } from '@constants/item-types';

type Props = {
    user: any
    item: any
    step: any
    reduxSearchItemAction:(item: any) => void
    reduxStepItemAction: (step: number) => void
    navigation: NavigationScreenProp<any,any>
}

function AddItemPrice(props: Props){

    const [price, getItemPrice] = React.useState('')
    const [focusing, togglefocus] = React.useState(false);

    const nextStep = () => {

        const Item =  {
            id: props.item._id,
            name: props.item.name,
            price: format(price),
            type: props.item.type,
            thumbnailImage: props.item.thumbnailImage,
            merchantId: props.user._id,
            //imageUrl: props.item.imageUrl,
            merchantName: props.item.merchantName,
            comments: props.item.comments,
            description: props.item.description,
            popularLabel: props.item.popularLabel,
            images: props.item.images,
            containerType: props.item.containerType,
        }
    
        Keyboard.dismiss();
        props.reduxSearchItemAction(Item);
        props.navigation.navigate('Select-Type')
        props.reduxStepItemAction(props.step + 1)
    }

    const previousStep = () => {
        Keyboard.dismiss()
        props.navigation.navigate('Add-Name')
        props.reduxStepItemAction(props.step - 1)
    }

    return(
        <View style={styles(props).body}>
            <Arrow name="arrow-back-ios"  color={'grey'} size={27} style={{left: 20}} onPress={() => previousStep()}/>
            <View style={styles(props).container}>            
                <Text style={styles(props).itemName}> Enter Your Product Price</Text>

                <TextInput 
                mode={'flat'} 
                theme={{  colors: { primary: "#F71735"}}}
                onFocus={() => togglefocus(!focusing)}
                onBlur={()=>togglefocus(!focusing)}
                onChangeText={(value: string) =>{ getItemPrice(value) }}
                style={styles(props).textField} 
                left={<TextInput.Icon name={() =>  <Money name="dollar" size={25} color={focusing?"#F71735":'grey'}/>} />} 
                />
            
                <TouchableOpacity
                disabled={price === ''? true: false}
                style={[price === ''? styles(props).nextButtonDisabled: styles(props).nextButton]}
                onPress={() => nextStep()}>
                <Text style={styles(props).nextText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = (props: Props) => StyleSheet.create({
    body: { 
        height: '100%',
        backgroundColor:'white'
    }, 
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    itemName:{
        fontSize:25,
        color: '#ED4E4E',
        fontFamily:'Roboto',
        //fontWeight: 'bold'
    }, 
    textField:{
        width:400, 
        height:60, 
        backgroundColor:'white'
    },
    nextButton: {
        width: wp(60),
        height: hp(5),
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 35,
        marginTop: hp(10),
        backgroundColor: '#F71735',
      },
      nextButtonDisabled: {
        width: wp(60),
        height: hp(5),
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 35,
        marginTop: hp(10),
        opacity:0.8,
        backgroundColor: 'grey',
      },
    nextText: {       
        color: 'white',
        fontSize:25,
        fontFamily:'Roboto',
    }
})
const mapStateToProps = (state: RootState) => {
    return {
      step: state.step.step,
      item: state.item.item,
      user: state.user.user,
      theme: state.theme.theme,
      session: state.session.isloggenIn,
      isNetworkConnected: state.network.isNetworkConnected,
    };
  };
  
  const mapDispatchToProps = (dispatch: Dispatch<SetItemActionType|SetItemStepStore>) => {
    return {
      reduxStepItemAction: (step: number) => dispatch(SetItemStepAction(step)),
      reduxSearchItemAction: (item: any) => dispatch(SetItemAction(item)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddItemPrice);
  