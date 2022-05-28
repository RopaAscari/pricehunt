import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {SetItemStepAction} from '@actions/set-add-item-progress'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { SetItemAction } from '@actions/set-item-action';
import { SetItemActionType, SetItemStepStore } from '@constants/item-types';
import { Dispatch } from 'redux';
import { RootState } from '@reducers/combined-reducers';

type Props = {
    step: any
    reduxStepItemAction: (step: number) => void
    navigation: NavigationScreenProp<any,any>
}

function AddMerchantItemStart(props: Props){

    const nextStep = () => {
        props.reduxStepItemAction(props.step + 1)
        props.navigation.navigate('Add-Name')
    }

    return (
        <View style={styles(props).body}>
            <Text style={styles(props).startText}> Add Items To Your Store</Text>
            <TouchableOpacity
                style={styles(props).nextButton}
                onPress={() => nextStep()}>
                <Text style={styles(props).nextText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = (props: Props) => StyleSheet.create({
    body: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    startText:{
        fontSize:20,
        color: 'black',
        fontFamily:'Roboto',
        //fontWeight: 'bold'
    }, 
    nextButton: {
        width: wp(60),
        height: hp(5),
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 35,
        marginTop: hp(5),
        backgroundColor: '#F71735',
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
  
  const mapDispatchToProps = (dispatch: Dispatch<SetItemStepStore>) => {
    return {
      reduxStepItemAction: (step: number) => dispatch(SetItemStepAction(step)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddMerchantItemStart);
