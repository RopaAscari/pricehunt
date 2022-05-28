import React from 'react';
import {connect} from 'react-redux';
import BasketIcon from '@icons/basket-icon';
import MerchantIcon from '@icons/merchant-icon';
import {RootState} from '@reducers/combined-reducers';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import {format} from '@services/number-formater';
import {SetItemActionType} from '@constants/item-types';
import {SetUserActionType} from '@constants/user-types';
import {Dispatch} from 'redux';
import {SetItemAction} from '@actions/set-item-action';

type Props = {
  item: any;
  theme: any;
  navigation: any;
  reduxItemAction(item: any): void;
};

function RenderTopViewedItems(props: Props) {
  const navigateToItemScreen = () => {
    props.reduxItemAction(props.item);
    props.navigation.navigate('Item-Screen');
  };

  return (
    <View style={styles(props).container}>
      <TouchableOpacity onPress={() => navigateToItemScreen()}>
        <Image
          source={{uri: props.item.thumbnailImage}}
          style={styles(props).imageContainer}
        />
      </TouchableOpacity>
      <View style={styles(props).textContainer}>
        <Text style={styles(props).itemName}>{props.item.name}</Text>
        <View style={styles(props).rowContainer}>
          <MerchantIcon height={26} width={26} />
          <Text style={styles(props).merchantText}> {props.item.merchant}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles(props).priceText}>
            {' '}
            ${format(props.item.price)}
          </Text>
          <View style={styles(props).basketContainer}>
            <BasketIcon
              color={
                props.theme === DARK
                  ? DarkTheme.basketIconColor
                  : props.theme === LIGHT
                  ? LightTheme.basketIconColor
                  : ''
              }
              style={styles(props).basketStyle}
              height={20}
              width={20}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.topViewItemBackgroundColor
          : props.theme === LIGHT
          ? LightTheme.topViewItemBackgroundColor
          : DEFAULT,
      width: '100%',
      height: 600,
    },
    rowContainer: {
      marginTop: 10,
      flexDirection: 'row',
    },
    merchantText: {
      //    /     top:5,
      fontSize: 17,
      fontFamily: 'Segoe UI',
      color:
        props.theme === DARK
          ? DarkTheme.topViewItemMerchantTextColor
          : props.theme === LIGHT
          ? LightTheme.topViewItemMerchantTextColor
          : DEFAULT,
    },
    textContainer: {
      marginLeft: (Dimensions.get('window').width - 450) / 2,
    },
    basketStyle: {
      // alignSelf:'center',
      //top:4
    },
    basketContainer: {
      top: 5,
      height: 35,
      width: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F04F4F',
      borderRadius: 25,
      bottom: 32,
      right: 15,
      alignSelf: 'flex-end',
      elevation: 2,
    },
    priceText: {
      marginTop: 10,
      fontSize: 19,
      //fontWeight:'bold',
      color: '#EB3A31',
      fontFamily: 'Roboto-Medium',
    },
    imageContainer: {
      alignSelf: 'center',
      marginTop: 30,
      height: 420,
      width: 420,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    itemName: {
      marginTop: 20,
      fontSize: 17,
      fontFamily: 'Roboto-Medium',
      color:
        props.theme === DARK
          ? DarkTheme.topViewItemTextColor
          : props.theme === LIGHT
          ? LightTheme.topViewItemTextColor
          : DEFAULT,
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch<SetItemActionType | SetUserActionType>,
) => {
  return {
    reduxItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderTopViewedItems);
