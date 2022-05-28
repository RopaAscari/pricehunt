import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import React, {useState} from 'react';
import ApiService from '@services/api-service';
import MerchantIcon from '@icons/merchant-icon';
import Icon from 'react-native-vector-icons/Fontisto';
import {RootState} from '@reducers/combined-reducers';
import {SetItemAction} from '@actions/set-item-action';
import {SetUserAction} from '@actions/set-user-action';
import {SetItemActionType} from '@constants/item-types';
import {SetUserActionType} from '@constants/user-types';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {NavigationScreenProp} from 'react-navigation';

type Props = {
  theme: any;
  items: any;
  user: any;
  index: number;
  isloggenIn: boolean;
  reduxItemAction(item: any): void;
  reduxAddFavoriteItem(fav: any): void;
  reduxRemoveFavouriteItem(fav: any): void;
  navigation: NavigationScreenProp<any, any>;
};

function RenderFavouriteItems(props: Props) {
  const [fav, favouriteItem] = useState(false);

  const navigateToItemScreen = () => {
    props.reduxItemAction(props.items);
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
      favouriteItem: props.items.id,
    };

    if (props.isloggenIn) {
      favouriteItem(!toggle);

      if (!toggle) {
        props.user.favouriteItems.splice(
          props.user.favouriteItems.indexOf(props.items.id),
        );
        ApiService.RemoveFavoriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response) {
              props.reduxRemoveFavouriteItem(user);
            }
          });
      } else {
        props.user.favouriteItems.push(props.items.id);
        ApiService.AddFavouriteItem(props.user._id, favorite)
          .then(res => res.data)
          .then(response => {
            if (response) {
              props.reduxAddFavoriteItem(user);
            }
          });
      }
    } else {
      console.log('Login to Favourite Items');
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles(props).container}
      onPress={() => navigateToItemScreen()}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: props.items.imageUrl}}
          style={styles(props).imageContainer}
        />
        <View style={{marginTop: 30, marginLeft: 30}}>
          <Text style={{fontSize: 19}}>{props.items.name}</Text>
          <Text
            style={{
              fontSize: 19,
              marginTop: 8,
              color: '#EB3A31',
              fontWeight: 'bold',
            }}>
            {' '}
            ${props.items.price}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <MerchantIcon height={26} width={26} />
            <Text style={{fontSize: 17.5, fontFamily: 'Segoe UI'}}>
              {' '}
              {props.items.merchant}
            </Text>
          </View>
          {fav ? (
            <View style={styles(props).iconContainer}>
              <Icon
                style={{alignSelf: 'center', top: 10}}
                name="heart"
                size={20}
                color="#D6D6D6"
                onPress={() => {
                  selectFavouriteItem(true);
                }}
              />
            </View>
          ) : (
            <View style={styles(props).iconContainer2}>
              <Icon
                style={{alignSelf: 'center', top: 10}}
                name="heart"
                size={20}
                color="#FFFFFF"
                onPress={() => {
                  selectFavouriteItem(false);
                }}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      elevation: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      width: 400,
      height: 200,
    },
    imageContainer: {
      top: 10,
      height: 170,
      width: 170,
      resizeMode: 'contain',
    },
    iconContainer: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      //   alignSelf:'flex-end',
      marginTop: '10%',
      marginRight: '5%',
    },
    iconContainer2: {
      height: 40,
      width: 40,
      elevation: 5,
      borderRadius: 25,
      backgroundColor: '#EAA53D',
      // alignSelf:'flex-end',
      marginTop: '10%',
      marginRight: '5%',
    },
  });

const mapDispatchToProps = (
  dispatch: Dispatch<SetItemActionType | SetUserActionType>,
) => {
  return {
    reduxItemAction: (item: any) => dispatch(SetItemAction(item)),
    reduxAddFavoriteItem: (fav: any) => dispatch(SetUserAction(fav)),
    reduxRemoveFavouriteItem: (fav: any) => dispatch(SetUserAction(fav)),
  };
};

const mapStatetoProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    isloggenIn: state.session.isloggenIn,
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(RenderFavouriteItems);
