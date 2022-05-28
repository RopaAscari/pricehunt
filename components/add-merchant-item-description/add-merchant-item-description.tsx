import React from 'react';
import { TextInput } from 'react-native-paper';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, TouchableOpacity,Keyboard } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { SetItemAction } from '@actions/set-item-action';
import { SetItemActionType, SetItemStepStore } from '@constants/item-types';
import { Dispatch } from 'redux';
import { RootState } from '@reducers/combined-reducers';
import { SetItemStepAction } from '@actions/set-add-item-progress';

type Props = {
    user: any
    item: any
    step: any
    reduxStepItemAction:(item: any) => void
    reduxSearchItemAction:(item: any) => void
    navigation: NavigationScreenProp<any,any>
}

function AddItemDescription(props: Props){

    const [descritpion, getItemDescritpion] = React.useState('')
    const [focusing, togglefocus] = React.useState(false);

    const nextStep = () => {

        const Item =  {
            id: props.item._id,
            name: props.item.name,
            price: props.item.price,
            type: props.item.type,
            merchantId: props.user._id,
            thumbnailImage: props.item.thumbnailImage,
            merchantName: props.item.merchantName,
            comments: props.item.comments,
            description: descritpion,
            popularLabel: props.item.popularLabel,
            images: props.item.images,
            containerType: props.item.containerType,
        }

        Keyboard.dismiss()
        props.reduxSearchItemAction(Item);       
        props.navigation.navigate('Add-Images')
        props.reduxStepItemAction(props.step + 1)
    }

    const previousStep = () => {
        Keyboard.dismiss()
        props.navigation.navigate('Select-Type')
        props.reduxStepItemAction(props.step - 1)
    }

    return(
        <View style={styles(props).body}>
            <Arrow name="arrow-back-ios"  color={'grey'} size={27} style={{left: 20}} onPress={() => previousStep()}/>
            <View style={styles(props).container}>            
                <Text style={styles(props).itemName}> Enter Your Product Description</Text>
                
                <TextInput 
                textAlignVertical={'top'}
               // textAlign={'center'}
                mode={'outlined'} 
                theme={{  colors: { primary: "#F71735"}}}
                onFocus={() => togglefocus(!focusing)}
                onBlur={()=>togglefocus(!focusing)}
                onChangeText={(value: string) =>{ getItemDescritpion(value) }}
                style={styles(props).textField} 
               // left={<TextInput.Icon name={() =>  <Money name="dollar" size={25} color={focusing?"purple":'grey'}/>} />} 
                />
                <Text style={{alignSelf:'flex-end', right: 20, marginTop:10, fontFamily:'Roboto'}}>{descritpion.length}/200</Text>
            
                <TouchableOpacity
                disabled={descritpion === ''? true: false}
                style={[descritpion === ''? styles(props).nextButtonDisabled: styles(props).nextButton]}
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
        height:120, 
        marginTop:20,
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
      isNetworkConnected: state.network
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
  )(AddItemDescription);

