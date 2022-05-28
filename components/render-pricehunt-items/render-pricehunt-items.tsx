import {connect} from 'react-redux';
import CartIcon from '@icons/cart-icon';
import {Rating} from 'react-native-ratings';
import ApiService from '@services/api-service';
import {NavigationScreenProp} from 'react-navigation';
import React, {Dispatch, useRef, useState} from 'react';
import {RootState} from '@reducers/combined-reducers';
import {SetUserAction} from '@actions/set-user-action';
import {SetItemAction} from '@actions/set-item-action';
import {SetUserActionType} from '@constants/user-types';
import {SetItemActionType} from '@constants/item-types';
import {showMessage} from 'react-native-flash-message';
import BasketIcon from '@components/svg/icons/basket-icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartIconFilled from '@components/svg/icons/heart-icon-filled';
import HeartIconOutline from '@components/svg/icons/heart-Icon-outline';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Alert,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { cond } from 'react-native-reanimated';

type Props = {
  //index: any;
  item: any;
  user: any;
  isloggenIn: boolean;
  subscribeFav?: () => void;
  unsubscribeFav?: () => void;
  reduxItemAction(item: any): void;
  reduxAddFavoriteItem(fav: any): void;
  reduxRemoveFavouriteItem(fav: any): void;
  reduxItemAction: (item: any) => void;
  navigation: NavigationScreenProp<any, any>;
};

const RenderPriceHuntItems = React.memo(function RenderPriceHuntItems(
  props: Props,
) {
  //console.log('renderer')
  const [favourited, favouriteItem] = useState(false);
  const logoPath: string = '../../assets/images/Icon.png';
  const animatedValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    compare()
  })

  const handleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const favouriteMerchantStoreItem = () => {
    console.log('test');
    favouriteItem(!favourited);
  };

  const navigateToItemScreen = () => {
    props.reduxItemAction(props.item);
    props.navigation.navigate('Item-Screen');
  };

  const selectFavouriteItem = (toggle: boolean) => {

 

    let user = {
      _id: props.user._id,
      email: props.user.email,
      lastName: props.user.lastName,
      username: props.user.username,
      firstName: props.user.firstName,
      profilePic: props.user.profilePic,
      favouriteItems: props.user.favouriteItems,
    };

    let favorite = {
      id: props.user._id,
      favouriteItem: props.item._id,
    };

    if (props.isloggenIn) {
      if (toggle) {
        user.favouriteItems.push(props.item._id);
        ApiService.AddFavouriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response.message === 'favorite item added!') {
              showMessage({
                message: 'Item added to basket',
                type: 'success',
                icon: 'success',
              });
              handleAnimation();
              favouriteItem(true); 
              props.reduxAddFavoriteItem(user);
            }
          });
      } else {
        props.user.favouriteItems.splice(
          props.user.favouriteItems.indexOf(props.item.id),
        );
        ApiService.RemoveFavoriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response) {
              showMessage({
                message: 'Item removed from basket',
                type: 'success',
                icon: 'success',
              });
              handleAnimation();
              favouriteItem(false);
              props.reduxRemoveFavouriteItem(user);
            }
          });
      }
    } else {
      console.log('Login to Favourite Items');
    }
  };

  const compare = () => {
    //console.log('test', props.user.favouriteItems)
    if (props.user.favouriteItems.length > 0) {
      console.log(props.user)
      props.user.favouriteItems.indexOf(props.item._id) !== -1
        ? favouriteItem(true)
        : null;
    }
  }; /*<View style={styles(props).margin}>
  <Text style={styles(props).itemName}>{props.item.name}</Text>
  <View style={styles(props).row}>
    <Text style={styles(props).itemPrice}>${props.item.price}</Text>
    <Text style={styles(props).itemDiscountedPrice}>$1050.95</Text>
  </View>
  <View style={[styles(props).row, {marginTop: '5%'}]}>
    <Image source={require(logoPath)} style={{height: 18, width: 18}} />
    <Text style={styles(props).merchantNameText}>
      {props.item.merchantName}
    </Text>
  </View>
  <View style={[styles(props).row, {marginTop: '5%'}]}>
    <Rating
      readonly={true}
      type={'custom'}
      imageSize={10}
      ratingBackgroundColor={'#C4C4C4'}
      startingValue={3}
    />
   <Text style={{bottom:5, fontSize: 13}}>  3.50</Text>

    <View style={[styles(props).row, {marginLeft: '27%', bottom:'35%'}]}>       
      {favourited ? (
      <View style={styles(props).iconContainer2}>
        <Icon
          style={{alignSelf: 'center',top:10 }}
          name="heart"
          size={20}
          color="#FFFFFF"
          onPress={() => selectFavouriteItem(true)}
        />
      </View>
    ) : (
      <View style={styles(props).iconContainer}>
        <Icon
          style={{alignSelf: 'center',top:10 }}
          name="heart"
          size={20}
          color="#D6D6D6"
          onPress={() => selectFavouriteItem(false)}
        />
      </View>
    )}
    </View>
  </View>
</View>*/

const spin = animatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})

  return (
    <React.Fragment>
      <View>
        <TouchableOpacity onPress={() => navigateToItemScreen()}>
        <View
          style={{
            marginTop: 10,
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            elevation: 0,
            marginLeft: 25,
            borderWidth: 2.5,
            borderColor: favourited?'white': '#EAEAEA',
            borderRadius: 10,
            backgroundColor: '#EAEAEA',
          }}
        >
         
        
          <ImageBackground source={{ uri: props.item.thumbnailImage, //'https://pricehunt101.s3.us-east-2.amazonaws.com/joyride-cdp-global-staging-page.jpg' //props.item.thumbnailImage
            }}
            style={[ styles(props).imageContainer ]}
            imageStyle={{borderRadius: 10}}>       
              {
              favourited?   
                <Icon name="heart" size={23} style={{padding: 5}} color="tomato"/>: null
              }      
          </ImageBackground>
      
         
        </View>
        </TouchableOpacity>
        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Roboto-Medium', color: 'black'}}>
            {props.item.name}
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#FF5844',
                top: 5,
              }}>
              ${props.item.price.toFixed(2)}
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
              <TouchableOpacity onPress={() => selectFavouriteItem(!favourited)}>
                <Animated.View  style={{transform: [{rotate: spin}] }}>
                  <BasketIcon color={favourited?'#EAEAEA': 'white'} height={18} width={18} />
                </Animated.View>                
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
});

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
      zIndex: 100,
      position: 'absolute',
      elevation: 5,
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
    user: state.user.user,
    theme: state.theme.theme,
    isloggenIn: state.session.isloggenIn,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SetItemActionType | SetUserActionType>,
) => {
  return {
    reduxItemAction: (item: any) => dispatch(SetItemAction(item)),
    reduxAddFavoriteItem: (fav: any) => dispatch(SetUserAction(fav)),
    reduxRemoveFavouriteItem: (fav: any) => dispatch(SetUserAction(fav)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderPriceHuntItems);
