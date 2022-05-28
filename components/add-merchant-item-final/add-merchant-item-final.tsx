import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import ApiService from '@services/api-service'
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { SetItemStepAction } from '@actions/set-add-item-progress';
import { SetItemStepStore } from '@constants/item-types';
import { RootState } from '@reducers/combined-reducers';
import { Dispatch } from 'redux';


type Props = {
    step: any
    reduxStepItemAction:(item: any) => void
    navigation: NavigationScreenProp<any,any>
}

function MerchantItemFinal(props: Props){

    React.useEffect(() => {
    })
    
    const [added, setAdded] = React.useState(true)

    const returnToStart = () => {
        props.reduxStepItemAction(0)
        props.navigation.navigate('Add-Start')
    }

    return (
        <View style={[styles(props).body, styles(props).container]}>
     
           { added? <>
                <Text>Item has been added</Text>
                    <TouchableOpacity
                    style={[styles(props).nextButton]}
                    onPress={() => returnToStart()}>
                        <Text style={styles(props).nextText}>Add More </Text>
                    </TouchableOpacity>
            </>: <ActivityIndicator size={50} color="#0000ff" />
            }
         
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
  
  const mapDispatchToProps = (dispatch: Dispatch<SetItemStepStore>) => {
    return {
      reduxStepItemAction: (step: number) => dispatch(SetItemStepAction(step))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MerchantItemFinal);

