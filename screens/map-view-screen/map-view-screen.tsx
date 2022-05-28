import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {mapStyle} from './dark-map-theme';
import {lightMap} from './light-map-theme';
import Geocoder from 'react-native-geocoding';
import ApiService from '@services/api-service';
import {LIGHT, DARK} from '@constants/theme-types';
import {RootState} from '@reducers/combined-reducers';
import {NavigationScreenProp} from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions';
import Options from 'react-native-vector-icons/SimpleLineIcons';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import MenuSlider from '@components/menu-slider/menu-slider';
import MapView, {AnimatedRegion, Callout, Marker} from 'react-native-maps';
import {Merchant, CoordinateType} from '@constants/type-definitions';
import {
  Alert,
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import MenuBar from '@icons/menu-bar';
import {renderers} from 'react-native-popup-menu';
import {Picker} from '@react-native-picker/picker';
import SwipeUpDown from '@components/swipe-up-down';
import {MenuProvider} from 'react-native-popup-menu';
import firestore from '@react-native-firebase/firestore';
import MenuLine from 'react-native-vector-icons/Ionicons';
import {SetMerchantStoreAction} from '@actions/set-merchant-store-action';
import {SetMerchantStoreActionType} from '@constants/merchant-store-types';
import Stories from '@components/render-stories/screens/Stories';
import ActionSheet from 'react-native-actions-sheet';
import { Rating } from 'react-native-ratings';
const {SlideInMenu} = renderers;

interface ParishType {
  name: string;
  coordinates: CoordinateType;
}

interface DirectionType {
  destination: CoordinateType;
  source: CoordinateType;
}

type Props = {
  user: any;
  theme: any;
  reduxSetMerchantStore: (merchant: Merchant) => void;
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  test: any;
  stories: any;
  merchant: any;
  index: number;
  animation: any;
  watchID: number;
  lastPosition: any;
  openMenu: boolean;
  marker: Array<any>;
  following: boolean;
  initialPosition: any;
  currentRegion: string;
  showDirections: boolean;
  reRenderComponent: number;
  merchants: Array<Merchant>;
  parishes: Array<ParishType>;
  setCurrentMerchant: any;
  hideMerchantScroll: boolean;
  showSwipeMenu: boolean;
  markerPress: boolean;
  currentPlace: string;
  distanceFromMerchant: number;
  directionCoordinates: DirectionType;
};

const actionSheetRef = React.createRef();

let actionSheet;

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUD_DELTA + maxWidth / maxHeight;

const CARD_HEIGHT = maxHeight / 4;
const CARD_WIDTH = 400;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCf1PW8PbrGOGPyfTTO0HpMWrEyAUflZ4c';

const coords = {
  centroid: {
    latitude: '24.2472',
    longitude: '89.920914',
  },
  boundingBox: {
    southWest: {
      latitude: '24.234631',
      longitude: '89.907127',
    },
    northEast: {
      latitude: '24.259769',
      longitude: '89.934692',
    },
  },
};

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const lat = parseFloat(coords.centroid.latitude);
const lng = parseFloat(coords.centroid.longitude);
const northeastLat = parseFloat(coords.boundingBox.northEast.latitude);
const southwestLat = parseFloat(coords.boundingBox.southWest.latitude);
const latDelta = northeastLat - southwestLat;
const lngDelta = latDelta * ASPECT_RATIO;

class MapViewScreen extends React.PureComponent<Props, State> {
  
  constructor(props: Props) {
    super(props);

    this.state = {
      index: 0,
      marker: [],
      stories: [],
      watchID: 0,
      markerPress: false,
      merchant: {},
      distanceFromMerchant: 0,
      merchants: [],
      showSwipeMenu: false,
      openMenu: true,
      lastPosition: {},
      following: false,
      currentPlace: '',
      initialPosition: {},
      showDirections: false,
      reRenderComponent: 0,
      currentRegion: 'Kingston',
      setCurrentMerchant: {},
      hideMerchantScroll: false,
      animation: new Animated.Value(0),
      test: [1, 2, 3, 4, 6, 7, 8, 9, 10],
      directionCoordinates: {
        source: {latitude: 0, longitude: 0},
        destination: {latitude: 0, longitude: 0},
      },
      parishes: [
        {
          name: 'Kingston',
          coordinates: {
            latitude: 17.995147,
            longitude: -76.7846006,
          },
        },
        {
          name: 'St.Andrew',
          coordinates: {
            latitude: 18.0166666,
            longitude: -76.8999964,
          },
        },
        {
          name: 'St.Catherine',
          coordinates: {
            latitude: 18.0,
            longitude: -77.0,
          },
        },
        {
          name: 'Manchester',
          coordinates: {
            latitude: 18.0499998,
            longitude: -77.5333312,
          },
        },
        {
          name: 'Clarendon',
          coordinates: {
            latitude: 18.0,
            longitude: -77.283,
          },
        },
        {
          name: 'St.Elizabeth',
          coordinates: {
            latitude: 18.0499998,
            longitude: -77.7833302,
          },
        },
        {
          name: 'Westermoreland',
          coordinates: {
            latitude: 18.23333,
            longitude: -78.15,
          },
        },
        {
          name: 'Hanover',
          coordinates: {
            latitude: 18.41667,
            longitude: -78.13333,
          },
        },
        {
          name: 'St.James',
          coordinates: {
            latitude: 18.3833318,
            longitude: -77.8833298,
          },
        },
        {
          name: 'Trewlany',
          coordinates: {
            latitude: 18.38333,
            longitude: -77.63333,
          },
        },
        {
          name: 'St.Ann',
          coordinates: {
            latitude: 18.2,
            longitude: -77.467,
          },
        },
        {
          name: 'St.Mary',
          coordinates: {
            latitude: 18.3166654,
            longitude: -76.8999964,
          },
        },
        {
          name: 'Portland',
          coordinates: {
            latitude: 18.1333328,
            longitude: -76.5333312,
          },
        },
      ],
    };
  }

  watchID = 0;

  async componentDidMount() {
   
    this.initializeGeoCoding();
    await this.getLocation();
    await this.getMerchants();
    this.watchUserPosition(); 
    
     // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH ); // animate 30% away from landing on the next item
      if (index >= this.state.merchant.length) {
        index = this.state.merchant.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const coordinate  =  this.state.merchants[index].location !== undefined ? this.state.merchants[index].location : {}
          this.animateToCoordinates(coordinate)
        }
      }, 10);
    });

    () => {
      this.watchUserPosition();
    };
  }

  //shouldComponentUpdate(nextProps) {
  //return nextProps.latitude !== this.props.latitude && nextProps.longitude !== this.props.longitude;
  //}

  componentWillMount() {
     this.index = 0;
     this.animation = new Animated.Value(0);
    
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  /**
   * Method to initialize geocoding fucnionality
   */
  initializeGeoCoding = () => {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
  };

  animateToCoordinates = (coordinates: GeolocationResponse) => {

    this.getNamefromCoordinates(coordinates)
  
    this.map.animateToRegion(
      {
        ...coordinates,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      },
      350,
    );
  };

  traverseToParish = (coordinates: AnimatedRegion) => {
    this.map.animateToRegion({
      ...coordinates,
      latitudeDelta: LATITUD_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  getMerchants = async() => {
    await ApiService.GetAllMerchants()
      .then(res => res.data)
      .then(merchants => {
        //console.log('MERCH', merchants)
        if (merchants.length > 0) {
          let stories: Array<any> = [];
          const user = { 
            id: this.props.user._id,
            username: this.props.user.username,
            profilePic: this.props.user.profilePic, 
            location: {
              latitude: this.state.initialPosition.coords.latitude,
              longitude: this.state.initialPosition.coords.longitude
            }
          }

          merchants.unshift(user)
          this.setState({merchants: merchants});
        }
      }) .catch(err => console.log(err));
  };

  //calculateDistance(lat1, lon1, lat2, lon2, unit) {
  calculateDistance(
    source: CoordinateType,
    destination: CoordinateType,
    unit: string,
  ) {
    if (
      source.latitude == source.longitude &&
      destination.latitude == destination.longitude
    ) {
      return 0;
    } else {
      let radlat1 = (Math.PI * source.latitude) / 180;
      let radlat2 = (Math.PI * destination.latitude) / 180;
      let theta = source.longitude - destination.longitude;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  getDirectionsToMerchant = (
    source: CoordinateType,
    destination: CoordinateType,
    merchant: string,
  ) => {
   // console.log('directions');
    this.setState({hideMerchantScroll: true});
    this.setState({setCurrentMerchant: merchant});
    const directionCoordinates = {
      source: {
        latitude: source.latitude,
        longitude: source.longitude,
      },
      destination: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    };

    this.setState({directionCoordinates: directionCoordinates});
    this.setState({showDirections: true});
    // this.animateToCoordinates(source)
  };

  getLocation = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({initialPosition: position});
          this.animateToCoordinates(position.coords);
          console.log(position);
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      console.log('You have no permissions to access location');
    }
  };

  watchUserPosition = () => {
    const options = {
      enableHighAccuracy: true,
    };

    const successCallback = (success: any) => {
      // const { latitude, longitude } = success.cords;
      this.setState({initialPosition: success});
      console.log('Watching position', success);
    };

    const errorCallback = (error: any) => {
      if (error) {
        console.log('err');
        // throw new Error(error);
      }
    };
    Geolocation.watchPosition(successCallback, errorCallback, options);
  };

  getCoordinatesFromName = async (value: string) => {
    const country = 'Jamaica';
    const coordinates = await Geocoder.from(value + ',' + country)
      .then(json => {
        return json.results[0].geometry.location;
        //console.log(location);
      })
      .catch(error => console.warn(error));
    return coordinates;
  };

  getNamefromCoordinates = async (coordinates: any) => {
     const address = await Geocoder.from(coordinates)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
     //  merchantsconsole.log('ADDREESS',addressComponent);
      this.setState({currentPlace: addressComponent.long_name})
      return addressComponent
		})
    .catch(error => console.warn(error));
    return address
  }

  merchantMapInfo = (currentPosition: any) => {
    return (
      <View>
        <View style={{alignSelf: 'center'}}>
          <MenuBar />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.getDirectionsToMerchant(
              currentPosition,
              this.state.merchant.location,
              this.state.merchant.companyName,
            )
          }>
          <Text style={{fontSize: 25, alignSelf: 'flex-start'}}>
            Get Directions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.navigateToMerchantStore()}>
          <Text style={{fontSize: 25}}>Visit Merchant Store</Text>
        </TouchableOpacity>

        {this.state.showDirections ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({hideMerchantScroll: false}),
                this.setState({showDirections: false});
            }}>
            <Text style={{fontSize: 25}}>Close Navigator</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  parishListView = () => {
    return this.state.parishes.map((parish, index) => {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View key={index} style={{alignSelf: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => {
                this.changeParish(parish);
              }}>
              <Text style={{fontSize: 20}}>
                {'\n'}
                {parish.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  merchantSlider = (currentPosition: any) => {
    if (this.state.merchants.length > 0) {
      return this.state.merchants.map((merchant, index) => {
        if(index === 0){
          return (
            <React.Fragment>
            <TouchableOpacity
              key={index}>
            
              <View style={[styles(this.props).card, {elevation:0}]}>
                <View style={{flexDirection: 'row', }}>
                  <Image
                    source={{uri: merchant.profilePic}}
                    style={{height: 70, width: 70, borderRadius: 300, resizeMode:'cover'}}
                  />
                  <View style={{  left: 10,width: 150 }}>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    {merchant.username}
                  </Text>
                  <Text style={{marginTop:3}}>{'55 Garden Blvd, Mona Heights'}</Text>
                  <View style={{right: 35,marginTop:6}}>

                </View>
                  </View>
                
                </View>
              </View>
            </TouchableOpacity>
            </React.Fragment>
          );

        }else {
          return (
            <React.Fragment>
            <TouchableOpacity
              key={index}
              onPress={() => {this.setState({setCurrentMerchant: merchant}),actionSheetRef.current?.setModalVisible()}}>
              <View style={[styles(this.props).card, {elevation:0}]}>
                <View style={{flexDirection: 'row', }}>
                  <Image
                    source={{uri: merchant.logo}}
                    style={{height: 100, width: 130, flex: 0, borderRadius:5, }}
                  />
                  <View style={{  left: 10,width: 150 }}>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    {merchant.companyName}
                  </Text>
                  <Text style={{marginTop:3}}>{'55 Garden Blvd, Mona Heights'}</Text>
                  <View style={{right: 35,marginTop:6}}>
                  <Rating
                    readonly={true}
                    type={'custom'}
                    imageSize={15}
          
                    ratingBackgroundColor={'#C4C4C4'}
                    startingValue={3}
                  />
                </View>
                  </View>
                  <FontAwesome5 name="truck-moving" size={20} style={{left: 70}}/>
                </View>
              </View>
            </TouchableOpacity>
            </React.Fragment>
          );
          
        }
        
      });
    } else {
      return null;
    }
  };

  handleOpen = () => {
    //this.setState({openMenu: true});
    /*Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();*/
  };

  changeParish = async (parish: ParishType) => {
    this.setState({currentRegion: parish.name});
    // const coords = await this.getCoordinatesFromName(value);
    //const coordinates = {latitude: coords.lat, longitude: coords.lng};
    this.traverseToParish(parish.coordinates);
  };

  isEmpty = (obj: any) =>
    !Object.values(obj).filter(e => typeof e !== 'undefined').length;

  navigateToMerchantStore = () => {
    console.log('navigated');
    actionSheetRef.current?.hide()
    this.props.navigation.navigate('Merchant-Store');
    this.props.reduxSetMerchantStore({
      merchantId: this.state.setCurrentMerchant._id,
      merchantName: this.state.setCurrentMerchant.merchantName,
    });
  };

  getMerchantMapStories = async (merchantId: any) => {
    try {
      const stories = await firestore()
        .collection('STORIES')
        .doc(merchantId)
        .get();
      if (stories.exists) {
        
        return stories.data();
      } else {
        console.log('NONE');
        return 'none';
      }
    } catch (err) {
      console.log(err);
    }
  };

  resolveMerchantStoires = async () => {
    const results = this.state.merchants.map(async merchant => {
      const merchantObj = merchant;
      const merchantStory = await this.getMerchantMapStories(merchant._id);

     //console.log(merchantStory)
      return {merchant,  merchantStory }
    });

    Promise.all(results).then(resolved => {
      this.setState({stories: resolved});
    });
  };

  renderUserMarker = (currentPosition: any) => {
    if (!this.isEmpty(currentPosition)) {
      return (
        <Marker
          title={'You'}
          //description={''}
          coordinate={currentPosition}
          tracksViewChanges={false}
          description={this.props.user.username}
          onPress={e => {
            //this.getDirectionsToMerchant(currentPosition, )//e.stopPropagation()
          }}>
          <Image
            source={{uri: this.props.user.profilePic}}
            style={styles(this.props).markerImage}
          />
        </Marker>
      );
    }
  };

  toggleMarkerPress = () => {
    this.setState({markerPress: !this.state.markerPress});
  }

  renderMerchantMarkers = () => {

    if(this.state.merchant.length > 0){
      //console.log('MAP STORIES',this.state.stories)
    }

    if (this.state.merchants.length  > 0) {
      if (!this.state.showDirections) {
        return this.state.merchants.map(
           (merchant: Merchant, index: number) => {
            // console.log(merchant.merchantStory)
            // const res = await this.getMerchantMapStories(merchant._id)
            return (
              <Marker
                ref={ref => {
                  this.mark = ref;
                }}
                key={`coordinate_${index}`}
                title={merchant.companyName}
                tracksViewChanges={false}
                onCalloutPress={()=> null}
                onPress={e => {
                  actionSheetRef.current?.setModalVisible()
                //  this.toggleMarkerPress()
                 // e.stopPropagation(), e.preventDefault()
                  //this.swipeUpDownRef.showFull(),
                    // this.setState({showSwipeMenu: true});
                   // this.setState({merchant: merchant}); // this.getDirectionsToMerchant(currentPosition, merchant.location, merchant.companyName)
                }}
                coordinate={merchant.location}>
    
            
                <Image
                  source={{uri: merchant.logo}}
                  style={styles(this.props).markerImage}
                /> 
    
                
              </Marker>
            );
          },
        );
      } else {
        return this.state.merchants
          .filter(
            merchant => merchant.companyName === this.state.setCurrentMerchant,
          )
          .map((merchant: Merchant, index: number) => {
            const merchantLogoImage = merchant.logo;
            //console.log('filtered merchant', merchantLogoImage)
            return (
              <Marker
                ref={ref => {
                  this.mark = ref;
                }}
                key={`coordinate_${index}`}
                title={merchant.companyName}
                tracksViewChanges={false}
                onPress={e => {
                 // this.handleOpen(), 
                  this.setState({merchant: merchant}),  actionSheetRef.current?.setModalVisible(); // this.getDirectionsToMerchant(currentPosition, merchant.location, merchant.companyName)
                }}
                coordinate={merchant.location}>
                <Image
                  source={{uri: merchantLogoImage}}
                  style={styles(this.props).markerImage}
                />
              </Marker>
            );
          });
      }
    }
  };

  render() {

    let currentPosition = {latitude: 0, longitude: 0};

    if (this.state.initialPosition.coords !== undefined) {
      currentPosition = {
        ...currentPosition,
        latitude: this.state.initialPosition.coords.latitude,
        longitude: this.state.initialPosition.coords.longitude,
      };
    }

    return (
      <React.Fragment>
        <MenuProvider>
          <MapView
            ref={map => (this.map = map)}
            style={{
              height: maxHeight,
              width: maxWidth,
              alignSelf: 'center',
            }}
            customMapStyle={this.props.theme === DARK ? mapStyle : lightMap}
            zoomEnabled={true}
            pitchEnabled={true}
            showsCompass={true}
            //showsBuildings={true}
            //showsTraffic={true}
            // showsIndoors={true}
            initialRegion={{
              latitude: 18.109581,
              longitude: -77.297508,
              latitudeDelta: LATITUD_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.showDirections ? (
              <MapViewDirections
                origin={this.state.directionCoordinates.source}
                strokeWidth={5}
                strokeColor="#2056D3"
                destination={this.state.directionCoordinates.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${
                      params.destination
                    }"`,
                  );
                }}
                onReady={data => {
                  this.setState({distanceFromMerchant: data.distance});
                  console.log('directions', data.coordinates.length);
                  const coords = {
                    latitude: data.coordinates[0],
                    longitude: data.coordinates[data.coordinates.length - 1],
                  };
                  // this.map.fitToCoordinates(coords);
                  this.animateToCoordinates(coords);
                }}
              />
            ) : null}

            {this.renderUserMarker(currentPosition)}
            {this.renderMerchantMarkers()}
          </MapView>

          <View style={{flexDirection: 'row',justifyContent: 'space-between', top: 0, position: 'absolute', padding: 20}}>
          <MaterialCommunityIcons name="filter-variant" size={30}/>
          <MaterialIcons name="settings" size={30} style={{left: Dimensions.get('window').width - 90}}/>
          </View>
         <TextInput  underlineColorAndroid="transparent" placeholder="  Search merchants" style={[styles(this.props).topView,{flex: 1}]}/>
  
          <View style={[styles(this.props).topView, {flexDirection: 'row', top: 100, width: 170, alignItems:'center'}]}>
            <Text style={{fontSize: 14, elevation: 1, zIndex: 1}}>{this.state.currentPlace.includes('Unnamed')? this.state.currentRegion: this.state.currentPlace}</Text>   
          </View>

          {this.state.showDirections ? (
            <React.Fragment>
              <View style={[styles(this.props).directionView]}>
                <TouchableOpacity
                  onPress={() => this.setState({showDirections: false})}>
                  <Text style={{fontSize: 13, alignSelf: 'center'}}>
                    Distance from merchant{' '}
                    {Math.round(this.state.distanceFromMerchant)} km
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : null}

          <Animated.ScrollView
            horizontal
            //..scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            scrollEventThrottle={200}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            style={styles(this.props).scrollView}
            contentContainerStyle={styles(this.props).endPadding}>
            {this.state.hideMerchantScroll ? null : this.merchantSlider(currentPosition)}
          </Animated.ScrollView>
          <ActionSheet extraScroll={5} initialOffsetFromBottom={true} gestureEnabled={true} containerStyle={{height: 500, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius:20}} ref={actionSheetRef} openAnimationSpeed={17} onClose={()=> null}>
          <Image source={{uri: this.state.setCurrentMerchant.logo}} style={{width:'100%', height: 200, resizeMode: 'cover'}}/>
          <Text style={{fontSize: 25}}> {}</Text>
          <TouchableOpacity onPress={this.navigateToMerchantStore} style={{height:55, width: 200, borderRadius: 5, alignSelf:'center', alignItems: 'center', justifyContent: 'center', backgroundColor:'#FF4C52'}}>
            <Text style={{fontSize: 15, color:'white'}}>View Store</Text>
          </TouchableOpacity>
          </ActionSheet>
        </MenuProvider>
      </React.Fragment>
    );
  }
}
const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
      //bottom:0,
      // backgroundColor: 'rgba(0,0,0,.5)',
      elevation: 10,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    sheet: {
      position: 'absolute',
      top: Dimensions.get('window').height,
      left: 0,
      right: 0,
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    sectionStyle: {
      position:'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      borderRadius: 5,
    },
    imageStyle: {
      padding: 10,
      margin: 5,
      height: 15,
      width: 15,
    
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    popup: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 800,
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      position: 'absolute',
      alignItems: 'center',
      alignSelf: 'center',
    },
    markerImage: {
      height: 70,
      width: 70,
      borderRadius: 200,
      borderWidth: 3,
      borderColor: '#FD5383',
      resizeMode: 'cover',
    },
    scrollView: {
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    topView: {
      // flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      top: 25,
      height: 40,
      width: 270,
      elevation: 40,
      //borderColor:'#EB3A31',
      //  / borderWidth: 2,
      backgroundColor: 'white',
      borderRadius: 25,
      paddingVertical: 10,
    },

    directionView: {
      // flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      top: 100,
      height: 45,
      width: 230,
      elevation: 40,
      //borderColor:'#EB3A31',
      //  / borderWidth: 2,
      backgroundColor: 'white',
      borderRadius: 25,
      paddingVertical: 10,
    },
    endPadding: {
      paddingRight: maxWidth - CARD_WIDTH,
    },
    card: {
      padding: 10,
      elevation: 2,
      backgroundColor: '#FFF',
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      //shadowOffset: {x: 2, y: -2},
      height: 120,
      width: 400,
      borderRadius: 15,
      overflow: 'hidden',
    },
  });
const mapDispatchToProps = (dispatch: Dispatch<SetMerchantStoreActionType>) => {
  return {
    reduxSetMerchantStore: (storeRef: string) =>
      dispatch(SetMerchantStoreAction(storeRef)),
    //reduxUpdateProfilePhoto: (updatedUser: any) => dispatch(SetUserAction(updatedUser)),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapViewScreen);
