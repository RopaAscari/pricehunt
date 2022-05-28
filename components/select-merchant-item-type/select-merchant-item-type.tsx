import React from 'react';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Money from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Feather';
import Arrow from 'react-native-vector-icons/MaterialIcons';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationScreenProp} from 'react-navigation';
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
    navigation: NavigationScreenProp<any, any>;
};

type State = {
  type: string;
  focusing: boolean;
};

class SelectItemType extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      type: '',
      focusing: false,
    };
  }

  nextStep = () => {

    const Item =  {
        id: this.props.item._id,
        name: this.props.item.name,
        price: this.props.item.price,
        type: this.state.type,
        merchantId: this.props.user._id,
        thumbnailImage: this.props.item.thumbnailImage,
        //imageUrl: this.props.item.imageUrl,
        merchantName: this.props.item.merchantName,
        comments: this.props.item.comments,
        description: this.props.item.description,
        popularLabel: this.props.item.popularLabel,
        images: this.props.item.images,
        containerType: this.props.item.containerType,
    }

    this.props.reduxSearchItemAction(Item);
    this.props.navigation.navigate('Add-Description');
    this.props.reduxStepItemAction(this.props.step + 1)
  };

  previousStep = () => {
    this.props.navigation.navigate('Add-Price');
    this.props.reduxStepItemAction(this.props.step - 1)
  };

  render() {
    return (
      <View style={styles(this.props).body}>
        <Arrow
          name="arrow-back-ios"
          color={'grey'}
          size={27}
          style={{left: 20}}
          onPress={() => this.previousStep()}
        />
        <View style={styles(this.props).container}>
          <Text style={styles(this.props).itemName}>
            {' '}
            Select Your Product Type
          </Text>

          <DropDownPicker
            items={[
              {label: 'FastFood', value: 'FastFood'},
              {label: 'Vehicle', value: 'Vehicle'},
              {label: 'Electronics', value: 'Electronics'},
              {label: 'Shoes', value: 'Shoes'},
              {label: 'Book', value: 'Book'},
              {label: 'Baby', value: 'Baby'},
              {label: 'Home', value: 'Home'},
              {label: 'Fashion', value: 'Fashion'},
            ]}
            defaultValue={this.state.type}
            containerStyle={{height: 50, width: 400, marginTop: 10}}
            placeholder="Select Product type"
            style={{backgroundColor: '#fafafa', height: 300}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa', height: 300}}
            onChangeItem={item =>
              this.setState({
                type: item.value,
              })
            }
          />

          <TouchableOpacity
            disabled={this.state.type === '' ? true : false}
            style={[
              this.state.type === ''
                ? styles(this.props).nextButtonDisabled
                : styles(this.props).nextButton,
            ]}
            onPress={() => this.nextStep()}>
            <Text style={styles(this.props).nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    itemName: {
      fontSize: 25,
      color: '#ED4E4E',
      fontFamily: 'Roboto',
      //fontWeight: 'bold'
    },
    textField: {
      width: 400,
      height: 60,
      backgroundColor: 'white',
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
  )(SelectItemType);
