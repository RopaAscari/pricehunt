import React from 'react';
import {connect} from 'react-redux';
import DiscountIcon from '@icons/discount-icon';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '@reducers/combined-reducers';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import BasketIcon from '@components/svg/icons/basket-icon';

type Props = {
  // index:any
  theme: any;
  items: any;
  //index: any
  navigation: NavigationScreenProp<any, any>;
};

function RenderTodayDeals(props: Props) {
  const src: object = {uri: props.items.imageUrl};

  const navigateToPopularItemScreen = () => {
    Alert.alert('Popular Item not ready');
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => null}>
        <View>
          <View
            style={{margin: 10, flex: 1}}
            //  elevation: 5,}}//style={styles(props).container}
          >
            <Image
              source={{
                uri: props.items.thumbnailImage, //'https://pricehunt101.s3.us-east-2.amazonaws.com/joyride-cdp-global-staging-page.jpg' //props.item.thumbnailImage
              }}
              style={styles(props).imageContainer}
            />
          </View>
          <View style={{marginLeft: 20, marginTop: 4, bottom: 5}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: 'black',
              }}>
              {props.items.name}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  color: '#FF5844',
                  top: 5,
                }}>
                ${props.items.price.toFixed(2)}
              </Text>
              <View
                style={{
                  height: 26,
                  width: 26,
                  backgroundColor: '#FF5844',
                  borderRadius: 7,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <BasketIcon height={18} width={18} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      height: 290,
      width: 200,
      borderRadius: 25,
      elevation: 5,
      zIndex: 100,
      marginLeft: 20,
      backgroundColor: 'white',
    },
    row: {
      flexDirection: 'row',
    },
    margin: {
      marginTop: '5%',
      marginLeft: '6%',
    },
    iconContainer: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      alignSelf: 'flex-end',
      //  marginTop: '5%',
      // marginRight: '5%',
    },
    iconContainer2: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#EB3A31',
      alignSelf: 'flex-end',
      marginTop: '5%',
      marginRight: '5%',
    },
    imageContainer: {
      // marginTop: '5%',
      alignSelf: 'center',
      height: 200,
      width: 200,
      borderRadius: 10,
      //  elevation: 5,
      resizeMode: 'cover',
    },
    itemName: {
      marginTop: '5%',
      fontFamily: 'Roboto-Regular',
      fontSize: 17,
      color: '#1D1D1D',
    },
    itemPrice: {
      marginTop: '5%',
      fontFamily: 'Roboto-Bold',
      fontSize: 22,
      color: '#1D1D1D',
    },
    itemDiscountedPrice: {
      marginTop: '8%',
      fontFamily: 'Roboto-Bold',
      position: 'absolute',
      fontSize: 15,
      color: '#A5A5A5',
      marginLeft: '62%',
      textDecorationLine: 'line-through', //textDecorationStyle: 'solid'
    },
    merchantNameText: {
      fontFamily: 'Roboto-Italic',
      marginLeft: '5%',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(RenderTodayDeals);
