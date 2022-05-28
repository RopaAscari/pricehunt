import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import { ChatType } from "@constants/type-definitions"
import MapView, {Marker} from 'react-native-maps';
import {RootState} from '@reducers/combined-reducers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import {landingItems, todaysDealItems} from '@data/app-data';
import RenderTodaysDeals from '@components/render-todays-deal-Items/render-todays-deals-items';
import Geolocation from '@react-native-community/geolocation';
import RenderPriceHuntItems from '@components/render-pricehunt-items/render-pricehunt-items';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  NavigationActions,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation';
import ApiService from'@services/api-service'
import firestore from '@react-native-firebase/firestore';
import {ShowBarActionType} from '@constants/router-types';
import {CreateChatActionType} from '@constants/create-chat-types';
import {CreateChatInstanceAction} from '@actions/create-chat-instance-action';
import {ToggleRouterBarVisibilityAction} from '@actions/toggle-router-bar-visibility-action';
import axios from 'axios';

type Props = {
  user: any;
  storeRef: any;
  navigation: NavigationScreenProp<any, any>;
  reduxCreateChatInstanceAction: (chatObj: ChatType) => void;
  reduxToggleRouterBarVisibilityAction: (visiblility: boolean) => void;
};

type State = {
  store: any;
  following: boolean;
};

class MerchantStoreScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      store:{},
      following: false,
    };
  }

  async componentDidMount() {
    ApiService.GetMerchantStore(this.props.storeRef.merchantId).then(res => res.data).then((store)=>{
     if(store){
       console.log('STORE',store)
       this.setState({store: store})
     }
   }).then(() =>{
    // ApiService.GetMerchant
   })
    // await this.getLocation();
    this.viewMerchantStore()
  }

  followMerchant = async() => {
      firestore().collection('SUBSCRIPTIONS').doc(this.props.storeRef.merchantId).collection('USERS').doc(this.props.user.id).set({ 
      id: this.props.user._id,
      username: this.props.user.username
    }).then(() => {
      this.setState({following: !this.state.following});
    })
  };

  viewMerchantStore = async() => {
    const views = await firestore().collection('VIEWS').doc(this.props.storeRef.merchantId).get();

    const currentViews = {
      views: views.data()?.views + 1
    }

    if(!views.exists){
      firestore().collection('VIEWS').doc(this.props.storeRef.merchantId).set({views: 1}).catch((err) => {
        if(err){
           console.error(err)
        }
      })
    }else{
      firestore().collection('VIEWS').doc(this.props.storeRef.merchantId).update(currentViews).catch((error)=>{
        console.log(error)
      })
    }
  }

  updateStoreView = async(currentViews: any) => {
    
  }

  messageMerchant = () => {

    const hunter = {
      id: this.props.user._id, 
      name: this.props.user.username,
      photo: this.props.user.profilePic
    }

    const merchant = {
      id: this.props.storeRef.merchantId,
      name: this.props.storeRef.merchantName,
      photo: this.state.store.logo,
    }

    const latestMessage = {
      text: '',
      createdAt:''
    }

    let chatId = '' as any;

    if (hunter.id < merchant.id) {
      chatId = hunter.id + '-' + merchant.id;
    } else {
      chatId = merchant.id + '-' + hunter.id;
    }

    const chat = {chatId, hunter, merchant, latestMessage};

    this.props.navigation.navigate('Message');
    this.props.reduxCreateChatInstanceAction(chat);
    this.props.reduxToggleRouterBarVisibilityAction(false);
  };

  renderStoreItems = () => {
    return landingItems.map((i, k) => {
      return (
        <RenderPriceHuntItems
          navigation={this.props.navigation}
          item={i}
          key={k}
        />
      );
    });
  };

  renderTrendingItems = () => {
    return todaysDealItems.map((i, k) => {
      return (
        <RenderTodaysDeals
          navigation={this.props.navigation}
          items={i}
          key={k}
        />
      );
    });
  };

  render() {
    const merchBack: string = '../../assets/images/merchBack.jpeg';
    const merchPlaceholder: string = '../../assets/images/merchImage.png';

    return (
      <ScrollView style={styles(this.props).body}>
        <View style={styles(this.props).imageContainer}>
          {
            <ImageBackground
              source={{uri: this.state.store.logo}}
              style={{width: '100%', height: '100%'}}
            />
          }
          <TouchableOpacity style={styles(this.props).searchCircularContainer}>
            <Icon name="search" color="#EB3A31" size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles(this.props).margin}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => this.followMerchant()}
              style={
                this.state.following
                  ? styles(this.props).followingButton
                  : styles(this.props).followButton
              }>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={
                    this.state.following
                      ? styles(this.props).followingButtonText
                      : styles(this.props).followButtonText
                  }>
                  {this.state.following ? 'Following ' : 'Follow '}
                </Text>
                <Icon
                  size={16}
                  style={{top: 3}}
                  color="white"
                  name="person-add"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.messageMerchant()}
              style={styles(this.props).followButton}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles(this.props).followButtonText}>Message</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles(this.props).topDealsText}>TOP DEALS</Text>
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={200} //your element width
              snapToAlignment={'center'}
              pagingEnabled={true}
              style={styles(this.props).carousel}
              showsHorizontalScrollIndicator={false}>
              {this.renderStoreItems()}
            </ScrollView>
          </View>
        </View>
        <Text style={styles(this.props).whatHsappeningText}>
          WHATS HAPPENING
        </Text>
        <Image
          source={require(merchPlaceholder)}
          style={{width: '100%', resizeMode: 'cover', marginTop: '5%'}}
        />
        <Text style={styles(this.props).trendingText}>TRENDING ITEMS</Text>
        <View style={styles(this.props).trendingItemContainer}>
          {this.renderTrendingItems()}
        </View>
        <Text style={styles(this.props).whereToFindUsText}>
          WHERE TO FIND US
        </Text>

        <TouchableOpacity style={styles(this.props).locatorButton}>
          <Text style={styles(this.props).locatorText}>Locator</Text>
        </TouchableOpacity>
        <Text>{'\n\n\n\n'}</Text>
      </ScrollView>
    );
  }
}
const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      height: '100%',
      backgroundColor: 'white',
    },
    locatorButton: {
      marginTop: '8%',
      alignSelf: 'flex-end',
      backgroundColor: 'black',
      borderRadius: 6,
      width: 120,
      height: 35,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
    },
    locatorText: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'Roboto-Bold',
    },
    markerImage: {
      height: 40,
      width: 40,
      borderRadius: 200,
      resizeMode: 'cover',
    },
    imageContainer: {
      height: 300,
      //top: 0,
      // position:'absolute',
      width: '100%',
      backgroundColor: '#C4C4C4',
    },
    trendingItemContainer: {
      backgroundColor: 'white',
      //alignItems: 'flex-start',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // /top:50,
    },
    topDealsText: {
      fontSize: 20,
      marginLeft: '6%',
      fontFamily: 'Roboto-Bold',
      color: '#2E2E2E',
    },
    whatHsappeningText: {
      fontSize: 22,
      marginLeft: '6%',
      marginTop: '6%',
      fontFamily: 'Roboto-Bold',
      color: '#2E2E2E',
    },
    whereToFindUsText: {
      fontSize: 22,
      marginLeft: '6%',
      marginTop: '6%',
      fontFamily: 'Roboto-Bold',
      color: '#2E2E2E',
    },
    trendingText: {
      fontSize: 22,
      marginLeft: '6%',
      marginTop: '6%',
      fontFamily: 'Roboto-Bold',
      color: '#2E2E2E',
    },
    margin: {
      marginTop: '10%',
      //  marginLeft:'6%',
    },
    followButton: {
      marginBottom: 20,
      marginLeft: 10,
      height: 25,
      width: 100,
      //  position: 'absolute',
      backgroundColor: '#EB3A31',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //  flex:1
    },
    followButtonText: {
      fontSize: 15,
      fontFamily: 'Roboto',
      color: 'white',
    },
    followingButton: {
      // marginTop: 250,
      marginBottom: 20,
      marginLeft: 10,
      height: 25,
      width: 120,
     // position: 'absolute',
      backgroundColor: '#0D0F25',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    followingButtonText: {
      fontSize: 16,
      color: 'white',
    },
    searchCircularContainer: {
      height: 30,
      width: 30,
      position: 'absolute',
      alignItems: 'center',
      marginTop: '5%',
      marginRight: '5%',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      borderRadius: 200,
      backgroundColor: 'white',
    },
    carousel: {
      height: 300,
      width: Dimensions.get('window').width,
      marginTop: 25,
      marginLeft: 20,
      elevation: 10,
      zIndex: 10,
      marginRight: 10,
    },
  });
const mapDispatchToProps = (
  dispatch: Dispatch<ShowBarActionType | CreateChatActionType>,
) => {
  return {
    reduxToggleRouterBarVisibilityAction: (visibility: boolean) =>
      dispatch(ToggleRouterBarVisibilityAction(visibility)),
    reduxCreateChatInstanceAction: (chatObj: ChatType) =>
      dispatch(CreateChatInstanceAction(chatObj)),
  };
};

const mapStatetoProps = (state: RootState) => {
  return {
    item: state.item.item,
    user: state.user.user,
    theme: state.theme.theme,
    storeRef: state.storeRef.storeRef,
    isloggenIn: state.session.isloggenIn,
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(MerchantStoreScreen);
