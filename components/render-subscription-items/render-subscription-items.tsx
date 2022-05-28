import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import BasketIcon from '@icons/basket-icon';
import MerchantIcon from '@icons/merchant-icon';
import ApiService from '@services/api-service';
import React, {useState, useEffect} from 'react';
import {format} from '@services/number-formater';
import Icon from 'react-native-vector-icons/Fontisto';
import {RootState} from '@reducers/combined-reducers';
import {SetItemAction} from '@actions/set-item-action';
import {SetUserAction} from '@actions/set-user-action';
import {SetItemActionType} from '@constants/item-types';
import {SetUserActionType} from '@constants/user-types';
import {NavigationScreenProp} from 'react-navigation';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from 'react-native';

interface Props {
  items: {
    id: number;
    name?: string;
    imageUrl?: string;
    price?: number;
    merchant?: string;
    popularLabel?: string;
    containerType?: number;
    images?: Array<string>;
  };
  user: any;
  theme: any;
  idx: number
  isloggenIn: boolean;
  subscribeFav: () => void;
  unsubscribeFav: () => void;
  reduxItemAction(item: any): void;
  reduxAddFavoriteItem(fav: any): void;
  reduxRemoveFavouriteItem(fav: any): void;
  navigation: NavigationScreenProp<any, any>;
}

function RenderItems(props: Props) {

  let lastTap: number = 0;
  const animation = new Animated.Value(0);
  let spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const [seconds, setSeconds] = React.useState(1000);
  const [fav, favouriteItem] = useState(false);
  const [isAnimated, animate] = useState(false);
  const [clickCount, updateClickCount] = useState(0);
  const src: object = {uri: props.items.imageUrl};
  const logoPath: string = '../../../assets/images/Icon.png';

  useEffect(() => {
    compare();
  }, [fav]);

  const navigateToItemScreen = () => {
    props.reduxItemAction(props.items);
    props.navigation.navigate('Item-Screen');
  };

  const navigateToSubscriptionTimelineScreen = () => {
    props.reduxItemAction(props.items);
    props.navigation.navigate('Subscriptions');
  };

  const selectFavouriteItem = (toggle: boolean) => {

    animateBasket();

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
      favouriteItem: props.items.id,
    };

    if (props.isloggenIn) {
      if (!toggle) {
        props.user.favouriteItems.push(props.items.id);
        ApiService.AddFavouriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response) {
              props.subscribeFav();
              favouriteItem(!toggle);
              props.reduxAddFavoriteItem(user);
            }
          });
      } else {
        props.user.favouriteItems.splice(
          props.user.favouriteItems.indexOf(props.items.id),
        );
        ApiService.RemoveFavoriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response) {
              props.unsubscribeFav();
              favouriteItem(!toggle);
              props.reduxRemoveFavouriteItem(user);
              
            }
          });
      }
    } else {
      console.log('Login to Favourite Items');
    }
  };

  const compare = () => {
    if (props.user.favouriteItems.length > 0) {
      props.user.favouriteItems.indexOf(props.items.id) !== -1
        ? favouriteItem(true)
        : null;
    }
  };

  const handleDoubleTap = async () => {
    console.log('called');

    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 1000;

    setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1);

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      console.log('double');
      selectFavouriteItem(!fav);
    }

    if (lastTap && now - lastTap > DOUBLE_PRESS_DELAY) {
      console.log('single');
      navigateToItemScreen();
    }

    console.log('SECONDS', seconds);
    lastTap = now;
  };

  function wait(ms: number) {
    return new Promise((resolve: any) => setTimeout(resolve, ms));
  }

  const animateBasket = () => {
    animation.setValue(0);
    return Animated.spring(animation, {
      toValue: 1,
      friction: 2.0,
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
  };
  
  return (
    <React.Fragment>
    { props.idx !== 4?
      <TouchableWithoutFeedback onPress={() => navigateToItemScreen()}>
      <View style={styles(props).scrollPosition}>
        <View style={styles(props).container}>
          {fav ? (
            <View style={styles(props).iconContainer2}>
              <Icon
                style={{alignSelf: 'center', top: 10}}
                name="heart"
                size={20}
                color="#FFFFFF"
                onPress={() => selectFavouriteItem(true)}
              />
            </View>
          ) : (
            <View style={styles(props).iconContainer}>
              <Icon
                style={{alignSelf: 'center', top: 10}}
                name="heart"
                size={20}
                color="#D6D6D6"
                onPress={() => selectFavouriteItem(false)}
              />
            </View>
          )}
          <Image source={src} style={styles(props).imageContainer} />
          <Text style={[styles(props).textBase, styles(props).itemName]}>
            {props.items.name}
          </Text>
          <Text style={[styles(props).textBase, styles(props).priceText]}>
            ${format(props.items.price)}
          </Text>

          <View style={[styles(props).row, {top: '2%'}]}>
            <MerchantIcon style={''} height={25} width={25} />
            <Text style={[styles(props).merchantText]}>
              {' '}
              {props.items.merchant}
            </Text>
          </View>

          <Animated.View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#F04F4F',
              borderRadius: 25,
              bottom: 32,
              right: 15,
              alignSelf: 'flex-end',
              elevation: 5,
            }}>
            <BasketIcon
              color={
                props.theme === DARK
                  ? DarkTheme.basketIconColor
                  : props.theme === LIGHT
                  ? LightTheme.basketIconColor
                  : ''
              }
              style={{
                elevation: 5,
                alignSelf: 'center',
                top: 4,
                transform: [{rotate: spin}],
              }}
              height={23}
              width={23}
            />
          </Animated.View>
        </View>
        <Text>{''}</Text>
      </View>
    </TouchableWithoutFeedback>: 
    
    <TouchableWithoutFeedback onPress={()=>navigateToSubscriptionTimelineScreen()}>
      <View style={[styles(props).container, { backgroundColor:'red', justifyContent:'center', opacity:0.9}]}>
          <Text style={{fontSize: 25, color:'white'}}>SEE MORE</Text>
      </View>
    </TouchableWithoutFeedback>
    }
    </React.Fragment>
  );
}
const styles = (props: Props) =>
  StyleSheet.create({
    scrollPosition: {
      left: '10%',
    },
    row: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: 15,
    },
    container: {
      alignItems: 'center',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.renderItemsBackgroundColor
          : props.theme === LIGHT
          ? LightTheme.renderItemsBackgroundColor
          : DEFAULT,
      elevation: 6,
      borderRadius: 25,
      width: 220,
      height: 300,
    },
    logo: {
      top: '2%',
      height: 15,
      width: 15,
    },
    imageContainer: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    iconContainer: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      alignSelf: 'flex-end',
      marginTop: '5%',
      marginRight: '5%',
    },
    iconContainer2: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#EAA53D',
      alignSelf: 'flex-end',
      marginTop: '5%',
      marginRight: '5%',
    },
    priceText: {
      fontSize: 15,
      color:
        props.theme === DARK
          ? DarkTheme.priceTextColor
          : props.theme === LIGHT
          ? LightTheme.priceTextColor
          : DEFAULT,
      fontWeight: '700',
    },
    textBase: {
      alignSelf: 'flex-start',
      marginLeft: 15,
      marginTop: 0,
    },
    merchantText: {
      fontSize: 16,
      color:
        props.theme === DARK
          ? DarkTheme.merchantTextColor
          : props.theme === LIGHT
          ? LightTheme.merchantTextColor
          : DEFAULT,
      //fontStyle:'italic',
      fontFamily: 'Segoe UI',
    },
    itemName: {
      fontSize: 17,
      marginTop: 10,
      color:
        props.theme === DARK
          ? DarkTheme.itemNameColor
          : props.theme === LIGHT
          ? LightTheme.itemNameColor
          : DEFAULT,
      fontWeight: '700',
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
)(RenderItems);
