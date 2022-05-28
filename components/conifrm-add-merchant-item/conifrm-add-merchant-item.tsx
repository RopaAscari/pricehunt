import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ApiService from '@services/api-service';
import {NavigationScreenProp} from 'react-navigation';
import {SetItemStepAction} from '@actions/set-add-item-progress';
import {Dispatch} from 'redux';
import {RootState} from '@reducers/combined-reducers';
import {SetItemStepStore} from '@constants/item-types';
import {connect} from 'react-redux';

type Props = {
  item: any;
  step: any;
  token: any;
  reduxStepItemAction: (item: any) => void;
  navigation: NavigationScreenProp<any, any>;
};

function ConfirmAddMerchantItem(props: Props) {
  const [adding, addingItem] = React.useState(false);

  const addItem = () => {
    addingItem(true);

    ApiService.AddItem(props.item, props.token)
      .then(res => res.data)
      .then(res => {
        if (res === 'item Added!') {
          console.log('try')
          props.navigation.navigate('Final');
        } else {
          addingItem(false);
          Alert.alert('An Error occured while adding');
        }
      });
  };

  return (
    <View style={[styles(props).body, styles(props).container]}>
      <TouchableOpacity
        style={[styles(props).nextButton]}
        onPress={() => addItem()}>
        <Text style={styles(props).nextText}>Add Item</Text>
      </TouchableOpacity>

      {adding ? <ActivityIndicator size={50} color="#0000ff" /> : null}
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      height: '100%',
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    nextButton: {
      width: wp(60),
      height: hp(5),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      marginTop: hp(10),
      backgroundColor: '#F71735',
    },
    nextButtonDisabled: {
      width: wp(60),
      height: hp(5),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      marginTop: hp(10),
      opacity: 0.8,
      backgroundColor: 'grey',
    },
    nextText: {
      color: 'white',
      fontSize: 25,
      fontFamily: 'Roboto',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    step: state.step.step,
    item: state.item.item,
    user: state.user.user,
    token: state.token.token,
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
)(ConfirmAddMerchantItem);
