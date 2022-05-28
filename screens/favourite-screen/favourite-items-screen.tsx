import React from 'react';
import {connect} from 'react-redux';
import {allItems} from '@data/app-data';
import {Card} from 'react-native-paper';
import UpArrowIcon from '@icons/up-arrow-icon';
import DownArrowIcon from '@icons/down-arrow-icon';
import Collapsible from 'react-native-collapsible';
import {Item} from '@constants/type-definitions';
import {RootState} from '@reducers/combined-reducers';
import {NavigationScreenProp} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DarkTheme} from '@theme/dark/favourite-item-screen-dark-mode';
import {LightTheme} from '@theme/light/favourite-item-screen-light-mode';
import RenderFavouriteItems from '@components/render-favourites/render-favourite-items';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SetNetworkAction } from '@actions/set-network-action';
import { store } from '@store/store';

type Props = {
  user: any;
  theme: any;
  network: any;
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  listInfo: any;
  search: string;
  searching: boolean;
  activeMerchant: any;
  collaspeMerchant: boolean;
  collaspeListInfo: boolean;
  activeSections: Array<any>;
};

class FavourtiteItemsScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: '',
      listInfo: {},
      searching: false,
      activeSections: [],
      activeMerchant: 0,
      collaspeListInfo: false,
      collaspeMerchant: false,
    };
  }

  componentDidMount() {}

  onChangeText = (key: string, value: any) => {
    this.setState({[key]: value} as Pick<State, keyof State>);
  };

  checkNetworkConnection = () => {
    NetInfo.fetch().then((state)=>{
      if (!state.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          type: 'warning',
          icon: 'warning',
        });
        store.dispatch(SetNetworkAction(state));
      }
    })
  }

  getFavouriteInfo = () => {
    let price = 0;
    let totalFavourited = 0;
    let result: Array<any> = [];
    let merchantTracker: Array<any> = [];

    const filtered = allItems.filter(item =>
      this.props.user.favouriteItems.includes(item.id),
    );

    filtered.map((item: any, index: any, arr) => {
      price = price + item.price;
      totalFavourited = arr.length;

      merchantTracker.indexOf(item.merchant) !== -1
        ? null
        : merchantTracker.push(item.merchant);
      // merchantCount = merchantTracker.length
      if (arr.length - 1 === index) {
        result.push({
          favourite: {filtered},
          listInfo: {price, totalFavourited, merchantTracker},
        });
      }
    });
    // console.log('Mapped', test)
    return result;
  };

  renderFavouriteItems = (favourite: Array<Item>, listInfo: any) => {
    let totalPrice = 0 as any;
    let totalAmount = 0 as any;

    if(listInfo.merchantTracker.lenght > 0) {

    
    return listInfo.merchantTracker.map((merchant: any, index: any) => {
      return (
        <Card
          key={index}
          style={{
            width: 420,
            borderRadius: 15,
            elevation: 5,
            alignSelf: 'center',
            marginTop: '15%',
          }}>
          <TouchableOpacity onPress={() => this.collapseMerchants(index)}>
            <View style={{flexDirection: 'row', padding: 15}}>
              {this.state.collaspeMerchant && this.state.activeMerchant === index ? (
                <DownArrowIcon height={25} width={25} />
              ) : (
                <UpArrowIcon height={25} width={25} />
              )}
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: 23,
                  left: 10,
                  bottom: 5,
                  color: '#404040',
                }}>
                {merchant}
              </Text>
            </View>
          </TouchableOpacity>

          <Collapsible
            collapsed={
              this.state.collaspeMerchant && this.state.activeMerchant === index
            }
            align="center">
            {favourite
              .filter(filteredItem => filteredItem.merchant === merchant)
              .map((item, index, arr) => {
                totalAmount = arr.length;
                totalPrice = totalPrice + item.price;

                return (
                  <View key={index}>
                    <View style={styles(this.props).chatLine} />
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: 10,
                          marginTop: '5%',
                          marginLeft: '5%',
                          marginBottom: '5%',
                          // resizeMode: 'contain',
                          borderWidth: 2,
                          borderColor: '#E0E0E0',
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={{
                            height: 130,
                            width: 130,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{marginTop: '5%', marginLeft: '7%'}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Regular',
                            color: '#404040',
                            fontSize: 18,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: '#EB3A31',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: '5%',
                          }}>
                          ${item.price}
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: '10%'}}>
                          <Icon name="minussquare" color="#BCBCBC" size={25} />
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: '#404040',
                            }}>
                            {' '}
                            1{' '}
                          </Text>
                          <Icon name="plussquare" color="#EB3A31" size={25} />
                        </View>
                        <View
                          style={{
                            // alignSelf: 'flex-end',
                            //justifyContent: 'flex-end',
                            left: 130,
                          }}>
                          <Text
                            style={{
                              marginTop: '10%',
                              fontSize: 18,
                              color: '#FF0000',
                              // position:'absolute'
                            }}>
                            Remove
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            <View
              style={{marginTop: '5%', marginLeft: '7%', marginBottom: '7%'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: '#242528', fontSize: 17, fontWeight: 'bold'}}>
                  Items:{' '}
                </Text>
                <Text style={{color: '#242528', fontSize: 17}}>
                  {totalAmount}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: '#242528', fontSize: 17, fontWeight: 'bold'}}>
                  Total:{' '}
                </Text>
                <Text style={{color: '#242528', fontSize: 17}}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
          </Collapsible>
        </Card>
      );
    });
  }else{
    return (
      <Text>No Favourites</Text>
    )
   }
  };

  collapseMerchants = (index: any) => {
    this.setState({activeMerchant: index});
    this.setState({collaspeMerchant: !this.state.collaspeMerchant});

    console.log('ACTIVE MERCHANT', this.state.activeMerchant, 'ACTIVE INDEX', index)
  };

  collapseListInfo = () => {
    this.setState({collaspeListInfo: !this.state.collaspeListInfo});
  };

  render() {
    const data = this.getFavouriteInfo();
    console.log(data[0].listInfo.totalFavourited)

    return (
      <ScrollView
        style={styles(this.props).body}
        contentContainerStyle={{flexGrow: 2}}>
        <View> 
        {this.props.network.networkConnection.isConnected ? (
        <React.Fragment>
          <Text style={styles(this.props).headingText}>Shopping List</Text>
            <View style={{marginTop: '5%'}}>
              <Card
                style={{
                  width: 420,
                  borderRadius: 15,
                  alignSelf: 'center',
                  elevation: 6,
                }}>
                <TouchableOpacity onPress={() => this.collapseListInfo()}>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    {this.state.collaspeListInfo ? (
                      <DownArrowIcon height={25} width={25} />
                    ) : (
                      <UpArrowIcon height={25} width={25} />
                    )}
                    <Text
                      style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 23,
                        bottom: 5,
                        color: '#404040',
                      }}>
                      {' '}
                      List Info
                    </Text>
                  </View>
                  <View style={styles(this.props).chatLine} />
                </TouchableOpacity>

                <Collapsible
                  collapsed={this.state.collaspeListInfo}
                  align="center">
                  <View style={{marginLeft: '12%', marginBottom: 15}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles(this.props).listInfoText}>
                        Total Items:{' '}
                      </Text>
                      <Text style={{fontSize: 17, marginTop: 5}}>
                        {data.length > 0 ?
                        data[0].listInfo.totalFavourited: ''
                        }
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles(this.props).listInfoText}>
                        Total Price:{' '}
                      </Text>
                      <Text style={{fontSize: 17, marginTop: 5}}>
                        ${
                        //data[0].listInfo.price.toFixed(2)
                        }
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles(this.props).listInfoText}>
                        # of Merchants:{' '}
                      </Text>
                      <Text style={{fontSize: 17, marginTop: 5}}>
                        {
                        //data[0].listInfo.merchantTracker.length
                        }
                      </Text>
                    </View>
                  </View>
                </Collapsible>
              </Card>
              {
                data.length > 0 ?
                this.renderFavouriteItems(data[0].favourite.filtered, data[0].listInfo): null
              }
              <TouchableOpacity style={styles(this.props).clearListButton}>
                <Text style={styles(this.props).clearListText}>CLEAR LIST</Text>
              </TouchableOpacity>
            </View>
            </React.Fragment>
          ) : (
            <View
              style={{
                top: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Text style={{fontSize: 28}}> You are not connected</Text>
              <Image
                source={require('../../assets/images/no-net.jpg')}
                style={{
                  marginTop: 10,
                  height: 200,
                  width: 200,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18, marginTop: 10}}>
                Your internet connection is not{' '}
              </Text>
              <Text style={{fontSize: 18}}>stable tap below to refresh</Text>
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  height: 32,
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}  
                onPress={() =>this.checkNetworkConnection()}
                >
                <Text style={{fontSize: 18}}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? 'white'
          : DEFAULT,
      width: Dimensions.get('window').width,
      height: '100%',
    },
    center: {
      // alignItems: 'center',
    },
    listInfoText: {
      fontSize: 17,
      color: '#404040',
      marginTop: 5,
      fontWeight: 'bold',
    },
    clearListButton: {
      height: 40,
      width: 140,
      right: 20,
      marginTop: '10%',
      borderRadius: 20,
      marginBottom: '10%',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EB3A31',
    },
    clearListText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    chatLine: {
      borderBottomColor: '#F1F2F3',
      borderBottomWidth: 2,
      width: '95%',
      marginTop: '1%',
      alignSelf: 'center',
      // position:'absolute'
    },
    headingText: {
      //  justifyContent:'flex-start',
      padding: 20,
      fontSize: 31,
      fontFamily: 'Roboto-Regular',
      color:
        props.theme === DARK
          ? '#EB3A31'
          : props.theme === LIGHT
          ? '#EB3A31'
          : DEFAULT,
      //fontWeight: '700',
    },

    scrollPosition: {
      left: '50%',
    },
    base: {
      width: '100%',
      height: '120%',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
    },
    modalContainer: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
    },
    headerText: {
      fontSize: 20,
      color: '#ED4E4E',
    },
    headerIconsContainer: {
      padding: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    todaysDealItems: {
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
      //alignItems: 'flex-start',
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // /top:50,
    },
    rowContainer: {
      marginTop: 40,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText: {
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 18,
      color: 'black',
      fontStyle: 'italic',
    },
    activeCatergoryText: {
      fontSize: 18,
      color: '#E94D4D',
      fontStyle: 'italic',
    },
    searchBar: {
      width: '70%',
      height: '100%',
      elevation: 3,
      color:
        props.theme === DARK
          ? 'white'
          : props.theme === LIGHT
          ? 'black'
          : DEFAULT,
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      alignSelf: 'center',
      backgroundColor:
        props.theme === DARK
          ? '#F3F4F6'
          : props.theme === LIGHT
          ? '#F3F4F6'
          : DEFAULT,
    },
    searchButton: {
      width: '17%',
      height: '83%',
      alignItems: 'center',
      borderTopRightRadius: 10,
      backgroundColor: '#E94D4D',
      borderBottomRightRadius: 10,
    },
    headerContainer: {
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
    },
    searchButtonText: {
      top: '20%',
      fontSize: 15,
      color: 'white',
      fontStyle: 'italic',
    },
    searchIcon: {
      // justifyContent: 'center', //Centered vertically
      // alignItems: 'center', // Centered horizontally
      // flex:1
      //left:'20%',
      padding: 15,
      // elevation:5
    },
    searchIconContainer: {
      width: '10%',
      height: '100%',
      elevation: 3,
      alignItems: 'center',
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? '#F3F4F6'
          : DEFAULT,
    },
  });

const mapStatetoProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    network: state.network,
  };
};
export default connect(mapStatetoProps)(FavourtiteItemsScreen);
