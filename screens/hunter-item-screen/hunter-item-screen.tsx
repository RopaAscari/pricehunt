import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Rating} from 'react-native-ratings';
import {landingItems, newlyAddedItems} from '@data/app-data';
import {format} from '@services/number-formater';
import {Item} from '@constants/type-definitions';
import ApiService from '@services/api-service';
import {ADDED_FAVOURITE} from '@constants/flash-messages';
import FlashMessage from '@components/flash-message/flash-message';
import {SetUserActionType} from '@constants/user-types';
import {SetUserAction} from '@actions/set-user-action';
import {RootState} from '@reducers/combined-reducers';
import {NavigationScreenProp} from 'react-navigation';
import React, {useState, useEffect, useRef} from 'react';
import {MenuIcon} from '@components/svg/icons/menu-icon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuSlider from '@components/menu-slider/menu-slider';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import {CommentButton} from '@svgcomponents/comment-button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {DarkTheme} from '@theme/dark/hunter-item-screen-dark-theme';
import {LightTheme} from '@theme/light/hunter-item-screen-light-theme.tsx';
import {RenderComments} from '@components/render-item-comments/render-item-comments';
import RenderItemImages from '@components/render-item-screen-images/render-item-screen-images';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import RenderPriceHuntItems from '@components/render-pricehunt-items/render-pricehunt-items';
import {SetMerchantStoreAction} from '@actions/set-merchant-store-action';
import {SetMerchantStoreActionType} from '@constants/merchant-store-types';
import ActionSheet from 'react-native-actions-sheet';



type Props = {
  user: any;
  //itemProps: any
  item: Item;
  theme: any;
  isloggenIn: boolean;
  reduxAddFavoriteItem: (user: any) => void;
  navigation: NavigationScreenProp<any, any>;
  reduxSetMerchantStore: (storeRef: any) => void;
};

function HunterItemsScreen(props: Props) {
  const actionSheetRef = React.createRef();

let actionSheet;

  const placeholderImage = ['hold'];
  const [rating, setRating] = useState(0);
  const animation = new Animated.Value(0);
  const [reveal, revealed] = useState(false);
  const [shown, showMessage] = useState(false);
  const [activeIndex, setActive] = useState(0);
  const [sub, changeSubColor] = useState(false);
  const maxWidth = Dimensions.get('window').width;
  const maxHeight = Dimensions.get('window').height;
  const IconAnimated = Animated.createAnimatedComponent(Icon2);

  useEffect(() => {
    //actionSheetRef.current?.setModalVisible()
   // animateBell();
  }, [animation]);

  const showFavMessage = () => {
    showMessage(true);

    setTimeout(() => {
      showMessage(false);
    }, 3000);
  };

  const ratingValue = (rating: number) => {
    setRating(rating);
  };

  const renderMerchantImages = () => {
    return [1,2,3,4,5].map((i, k) => {
      return (
        <TouchableOpacity>
          <View style={{marginLeft: 10}}>
          <ImageBackground 
          resizeMode="cover" 
          imageStyle={{borderRadius: 10}} 
          style={{height: 200, width:200}} 
          source={{uri:'https://pricehunt101.s3.us-east-2.amazonaws.com/frame_01_delay-0.03s.png'}}>
          </ImageBackground>
          </View>
        </TouchableOpacity>

      );
    });
  };

  const navigateToMerchantStore = () => {
    props.navigation.navigate('Merchant-Store');
    props.reduxSetMerchantStore({
      merchantId: props.item.merchantId,
      merchantName: props.item.merchantName,
    });
  };

  const addToBasket = () => {
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
      favouriteItem: props.item.id,
    };

    props.user.favouriteItems.push(props.item.id);
    ApiService.AddFavouriteItem(props.user._id, favorite)
      .then(res => res.data)
      .then(response => {
        if (response) {
          showFavMessage();
          props.reduxAddFavoriteItem(user);
        }
      });
  };

  const animateBell = () => {
    animation.setValue(0);
    return Animated.spring(animation, {
      toValue: 1,
      friction: 2.0,
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
  };

  let spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const imageSlider = ({item, index}: any) => {
    return <RenderItemImages key={index} imageUrl={item} />;
  };

  return (
    <ScrollView style={styles(props).background}>
      <View>

   {/*   <View style={styles(props).rowContainer}>
          <Text style={styles(props).itemNameText}>
            {props.item.name}
            {'\n'}
          </Text>
          <Rating
            //readonly={true}
            type={'custom'}
            imageSize={18}
            ///  style={{ paddingVertical: 10 }}
            ratingBackgroundColor={'#C4C4C4'}
            startingValue={rating}
          />
  </View>*/}

        <View>
          <Carousel
            //ref={c => this._slider1Ref = c}
            itemWidth={maxWidth}
            sliderHeight={0}
            sliderWidth={maxWidth}
            inactiveSlideOpacity={1}
            data={props.item.images ? props.item.images : placeholderImage}
            activeSlideAlignment={'start'}
            renderItem={imageSlider}
            onSnapToItem={(index: number) => {
              setActive(index);
            }}
          />
          
        </View>


        <Pagination
            dotsLength={props.item.images.length}
            activeDotIndex={activeIndex}
            // containerStyle={styles.paginationContainer}
            dotColor={'#EFB926'}
            dotStyle={{}}
            inactiveDotColor={'black'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1.3}
            // carouselRef={this._slider1Ref}
            // tappableDots={!this._slider1Ref}
          />
          <Text style={[styles(props).itemNameText,{alignSelf:'center'}]}>
            {//props.item.name
            }
          </Text>
       
        <View style={styles(props).positionContainer}>
          <Text style={styles(props).descriptionHeaderText}>Description</Text>
          <Text style={styles(props).descriptionItemText}>
            {props.item.description}
          </Text>

<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={styles(props).itemPriceText}>$ {props.item.price?.toFixed(2)}</Text>
<View style={{padding: 20}}>
          <Rating
            //readonly={true}
            type={'custom'}
            imageSize={18}
              style={{ paddingVertical: 10 }}
            ratingBackgroundColor={'#C4C4C4'}
            startingValue={rating}
          />
          </View>
</View>
          <View
            style={{
              alignItems: 'flex-end',
              marginTop: '5%',
              marginRight: '5%',
            }}>
            <TouchableOpacity
              style={{
                height: 45,
                width: 300,
                alignSelf: 'center',
                borderRadius: 18,
                backgroundColor: '#FF5844',
              }}
              onPress={() => addToBasket()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontFamily: 'Roboto-Medium',
                  }}>
                  Add to Cart{' '}
                </Text>
                <Icon2 name="cart-outline" color={'white'} size={22} />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigateToMerchantStore()}>
            <View style={{flexDirection: 'row', marginTop: '20%'}}>
              <Text style={styles(props).merchantStoreNameText}>
                {' '}
                {props.item.merchant}{' '}
              </Text>
              <Icon
                style={{left: 5, top: 7}}
                name="arrow-forward-ios"
                size={20}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles(props).visitStoreText}>
            Visit our store today for amazing deals and offers
          </Text>
        </View>  

      </View>
    
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={200} //your element width
        snapToAlignment={'center'}
        pagingEnabled={true}
        style={{
          height: 300,
          width: Dimensions.get('window').width,
          marginTop: 30,
          marginLeft: 10,
          elevation: 10,
          zIndex: 10,
          marginRight: 10,
          //marginBottom: 65,
        }}
        showsHorizontalScrollIndicator={true}>
        {renderMerchantImages()}
      </ScrollView>

      <View
        style={{
          width: Dimensions.get('window').width,
          height: 180,
          backgroundColor: '#FF5844',
          position: 'absolute',
          bottom: 0,
        }}
      />
      
    </ScrollView>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: '100%',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
    },
    visitStoreText: {
      marginTop: '3%',
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
    },
    merchantStoreNameText: {
      color: 'black',
      fontSize: 23,
      fontFamily: 'Montserrat-Bold',
    },
    commentHeaderText: {
      fontSize: 17,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    rateHeaderText: {
      fontSize: 17,
      marginTop: 10,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    descriptionItemText: {
      padding: 5,
      color: '#2E2E2E',
      fontSize: 17,
      fontFamily: 'Roboto',
    },

    descriptionHeaderText: {
      fontSize: 21,
      marginTop: 10,
      color: '#2E2E2E',
      fontFamily: 'Roboto-Bold',
      //fontWeight: 'bold',
    },

    itemPriceText: {
      fontSize: 24,
      marginTop: '5%',
      color: '#2E2E2E',
      fontFamily: 'Roboto-Medium',
    },

    dollarSign: {
      color: '#F85252',
      fontSize: 25,
      fontWeight: 'bold',
    },
    positionContainer: {
      marginLeft: 20,
    },
    headerContainer: {
      backgroundColor: '#E94D4D',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },

    row: {
      flexDirection: 'row',
    },

    rowContainer: {
      top: '5%',
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    merchantNameText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },

    itemNameText: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Roboto-Medium',
    },
  });

const mapDispatchToProps = (
  dispatch: Dispatch<SetUserActionType | SetMerchantStoreActionType>,
) => {
  return {
    // reduxItemAction: (item: any) => dispatch(SetItemAction(item)),
    reduxAddFavoriteItem: (fav: any) => dispatch(SetUserAction(fav)),
    reduxRemoveFavouriteItem: (fav: any) => dispatch(SetUserAction(fav)),
    reduxSetMerchantStore: (storeRef: string) =>
      dispatch(SetMerchantStoreAction(storeRef)),
  };
};

const mapStatetoProps = (state: RootState) => {
  return {
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    isloggenIn: state.session.isloggenIn,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(HunterItemsScreen);
