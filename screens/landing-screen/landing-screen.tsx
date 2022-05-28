import React from 'react';
import { Dispatch } from 'redux';
import { store } from '@store/store';
import { connect } from 'react-redux';
import BookIcon from '@icons/book-icon';
import BabyIcon from '@icons/baby-icon';
import HomeIcon from '@icons/home-icon';
import InView from '@components/inview/inview'
import CategoryMenu from './categories-menu';
import Search from '@components/search/search';
import apiService from '@services/api-service';
import { Item } from '@constants/type-definitions';
import NotificationsMenu from './notifcation-menu';
import AllIcon from '@components/svg/icons/all-icon';
import { RootState } from '@reducers/combined-reducers';
import { NavigationScreenProp } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import { MenuIcon } from '@components/svg/icons/menu-icon';
import ShoesIcon from '@components/svg/icons/shoes-icon';
import SearchBar from '@components/search-bar/search-bar';
import RenderAds from '@components/render-ads/render-ads';
import BackArrowSearch from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchItemActionType } from '@constants/item-types';
import { DARK, LIGHT, DEFAULT } from '@constants/theme-types';
import { SearchItemAction } from '@actions/search-item-action';
import VehicleIcon from '@components/svg/icons/vehicle-icon';
import MenuSlider from '@components/menu-slider/menu-slider';
import { subscribeActionBefore } from 'redux-subscribe-action';
import Stories from '@components/render-stories/screens/Stories';
import FastFoodIcon from '@components/svg/icons/fast-food-icon';
import { DarkTheme } from '@theme/dark/landing-screen-dark-theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import RedPriceHuntLogo from '@svgcomponents/red-price-hunt-logo';
import Flash from '@components/flash-message/flash-message';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import ElectronicIcon from '@components/svg/icons/electronics-icon';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import LandingMenuIcon from '@components/svg/icons/landing-menu-icon';
import { LightTheme } from '@theme/light/landing-screen-light-theme.tsx';
import { LandingArrowIcon } from '@components/svg/icons/landing-arrow-icon';
import { StackRouter, DefaultRouterOptions } from '@react-navigation/native';
import TimelineIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ADDED_FAVOURITE, REMOVED_FAVOURITE } from '@constants/flash-messages';
import { manageUserOnlinePresence } from '../../firebase/functions/user-presence';
import RenderItemCategories from '@components/render-categories/render-categories';
import NotifcationActionIcon from '@components/svg/icons/notification-active-icon';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RenderPromotions } from '@components/render-promotion-items/render-promotions';
import { RenderPopularItems } from '@components/render-popular-items/render-popular-items';
import RenderPriceHuntItems from '@components/render-pricehunt-items/render-pricehunt-items';
import RenderTodayDeals from '@components/render-todays-deal-Items/render-todays-deals-items';
import RenderTopViewedItems from '@components/render-top-viewed-items/render-top-viewed-items';
import RenderSubscriptionItems from '@components/render-subscription-items/render-subscription-items';
import LandingScreenLoadingState from '@components/landing-loading-state/landing-screen-loading-state';
import VerfifyNetworkConnenction from '@components/verify-network-connection/verify-network-connection';
import {
  merchantStories,
  popularItems,
  landingItems,
  promotionalItems,
  todaysDealItems,
  topViewedItems,
  morePopularItems,
  newlyAddedItems,
  ads,
} from '@data/app-data';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  LogBox,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  RefreshControl,
  Platform,
  Button,
  BackHandler,
  Animated,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Overlay } from 'react-native-elements';
import ExpandedCard from './expand';
import HunterItemsScreen from '@screens/hunter-item-screen/hunter-item-screen';
import Video from 'react-native-video';
import Lightbox from '@components/light-house/Lightbox';
import RenderItemImages from '@components/render-item-screen-images/render-item-screen-images';
import {
  SharedElement, nodeFromRef, SharedElementTransition,
} from 'react-native-shared-element';
import Input from '@components/input/input';
//import { TextInput } from 'react-native-paper';
import MenuLandingIcon from '@components/svg/icons/menu-landing-icon';
type Props = {
  userData?: {
    _id: string;
    email: string;
    lastName: string;
    username: string;
    firstName: string;
    profilePic: string;
  };
  user: any;
  theme: any;
  session: boolean;
  network: any;
  navigationProps: any
  reduxSearchItemAction: (item: any) => void;
  navigation: NavigationScreenProp<any, any>;
};

interface State {
  inc: number;
  newContent: boolean;
  items: any;
  key: number;
  currItem: any;
  width: number;
  found: string;
  search: string;
  reveal: boolean;
  refresh: boolean;
  visible: boolean;
  adsIndex: number;
  searching: boolean;
  apiLoaded: boolean;
  modalVisible: boolean;
  hidingContent: boolean;
  activeIndex: number;
  isBlinking: boolean;
  openMessenger: boolean;
  flashMessage: string;
  categoryIcon: boolean;
  scrollY: any;
  navHeight: number;
  isOpen: boolean;
  muted: boolean;
  stories: Array<any>;
  reRender: boolean;
  showfavouriteMessage: boolean;
  isNetworkConnected: boolean;
  categories: Array<JSX.Element>;
  yOffset: any;
  xOffset: any;
  paused: boolean;
  videoIndex: number;
  selectedCard: any;
  activeImage: any
}
const THRESHOLD = 100;

class LandingScreen extends React.PureComponent<Props, State> {
  offset: 0;
  oldPosition = {}; // for keep old element coordinate 
  position = new Animated.ValueXY(); // use for setup animation in position 
  dimensions = new Animated.ValueXY(); // use for setup animation in size

  flashMessage: React.RefObject<any> = React.createRef();


  constructor(props: Props) {
    super(props);



    this.state = {
      inc: 1,
      paused: true,
      yOffset: null,
      xOffset: null,
      selectedCard: null,
      videoIndex: 0,
      items: {
        landingItems: [],
        popularItems: [],
        topViewedItems: [],
        newlyAddedItems: [],
        todaysDealItems: [],
      },
      muted: false,
      newContent: false,
      currItem: {},
      found: '',
      search: '',
      key: 0,
      stories: [],
      navHeight: 80,
      openMessenger: false,
      width: 110,
      scrollY: new Animated.Value(0),
      adsIndex: 0,
      visible: false,
      reRender: false,
      reveal: false,
      activeImage: '',
      refresh: false,
      activeIndex: 0,
      hidingContent: false,
      apiLoaded: true,
      modalVisible: false,
      searching: false,
      isOpen: false,
      isBlinking: false,
      flashMessage: '',
      showfavouriteMessage: false,
      categoryIcon: false,
      isNetworkConnected: false,
      //carousel: Carousel<LandingScreen>,
      categories: [
        <AllIcon height={26} width={26} />,
        <FastFoodIcon height={26} width={26} />,
        <VehicleIcon height={26} width={26} />,
        <ElectronicIcon height={26} width={26} />,
        <ShoesIcon height={26} width={26} />,
        <BookIcon height={26} width={26} />,
        <BabyIcon height={26} width={26} />,
        <HomeIcon height={26} width={26} />,
      ],
    };
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    let initState = true;
    this.getItems();
    this.getStories();
    LogBox.ignoreAllLogs();
    manageUserOnlinePresence(this.props.user._id);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    const storyListener = firestore()
      .collection('STORIES')
      .onSnapshot(querySnapshot => {
        if (initState) {
          initState = false;
        } else {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified" || change.type === "removed")  { 
              console.log('change') 
              this.setState({ newContent: true })
            }
          });
        }
      });

      return ()=> {
        storyListener();
      }

    // BackHandler.addEventListener('hardwareBackPress', this.closePriceHunt);

  }

  componentWillUnmount() {

    //  this.storyListener()
    //  BackHandler.removeEventListener('hardwareBackPress', this.closePriceHunt);
  }

  objectsEqual = (o1, o2) => {
    typeof o1 === 'object' && Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every(p => this.objectsEqual(o1[p], o2[p]))
      : o1 === o2;
  };

  arraysEqual = (a1, a2) => {
    return (
      a1.length === a2.length &&
      a1.every((o, idx) => this.objectsEqual(o, a2[idx]))
    );
  };

  getStories = async () => {
    try {
      const stories = await firestore()
        .collection('STORIES')
        .get();

      const storyObj: Array<any> = [];

      if (stories.docs.length > 0) {
        stories.docs.map(doc => {
          storyObj.push(doc.data());
        });

        storyObj.sort((a, b) => {
          return this.sortStories(a, b);
        });

        this.setState({ stories: storyObj });
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  sortStories = (a: any, b: any) => {
    if (
      a.stories[a.stories.length - 1].users.includes(this.props.user._id) &&
      !b.stories[b.stories.length - 1].users.includes(this.props.user._id)
    ) {
      return 1;
    }
    if (
      b.stories[b.stories.length - 1].users.includes(this.props.user._id) &&
      !a.stories[a.stories.length - 1].users.includes(this.props.user._id)
    ) {
      return -1;
    } else {
      return 0;
    }
  };

  getItems = () => {
    apiService
      .GetAllItems()
      .then(res => res.data)
      .then(items => {
        const chunk = (arr: Array<any>, size: number) =>
          arr.reduce((acc: any, _: any, i: any) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size));
            return acc;
          }, []);
        // Usage:
        if (items.length > 0) {
          const chunked = chunk(items, 3);

          this.setState(prevState => ({
            items: {
              landingItems: chunked[0],
              popularItems: chunked[1],
            },
          }));
          this.setState({ apiLoaded: false });
        }
      });
  };

  get pagination() {
    const { adsIndex } = this.state;
    return (
      <Pagination
        dotsLength={ads.length}
        activeDotIndex={adsIndex}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  get videoPagination() {
    const { videoIndex } = this.state;
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={videoIndex}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'grey',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  onLayout(e: any) {
    if (this.state.width !== e.nativeEvent.layout.width) {
      this.setState({
        width: e.nativeEvent.layout.width,
      });
    }
  }

  _refreshListView = () => {
    this.setState({ refresh: true });
    this.setState({ apiLoaded: true }, () => {
      this.getItems();
      this.getStories();
    });
    this.setState({ refresh: false });
  };

  onButtonRefresh = () => {
    this.getItems();
    this.getStories();
    this.setState({ newContent: false });
    this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true });
  };

  showMenu = () => {
    this.setState({ reveal: true });
  };

  hideMenu = () => {
    this.setState({ reveal: false });
  };

  navigateToProfileScreen = () => {
    this.props.navigation.navigate('Profile');
  };

  navigateToPriceHub = () => {
    if (this.state.search === '') {
      Alert.alert('Enter a product');
    } else {
      this.props.reduxSearchItemAction(this.state.search);
      this.props.navigation.navigate('Price-Hub');
    }
  };

  updateSearchField = (found: any) => {
    this.setState({ search: found });
  };

  searchFocused = () => {
    this.setState({ visible: true });
  };

  showFavMessage = () => {
    this.setState({ showfavouriteMessage: true });

    setTimeout(() => {
      this.setState({ showfavouriteMessage: false });
    }, 3000);
  };

  subscribeFav = () => {
    this.showFavMessage();
    this.setState({ flashMessage: ADDED_FAVOURITE });
  };

  unsubscribeFav = () => {
    this.showFavMessage();
    this.setState({ flashMessage: REMOVED_FAVOURITE });
  };

  searchUnFocused = () => {
    console.log('Unfocused');
  };

  hideContent = () => {
    this.setState({ hidingContent: true });
  };

  showContent = () => {
    this.setState({ hidingContent: false });
  };

  cancelSearch = () => {
    this.setState({ visible: false });
    Keyboard.dismiss();
  };

  setActiveText = (index: any) => {
    this.setState({ activeIndex: index });
  };

  onChangeText = (key: string, value: any) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  };

  updateSearchParams = (searched: any) => {
    this.setState({ search: searched });
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }


  _renderItems = ({ item, index }: any) => {
    return (
      <RenderPriceHuntItems
        key={index}
        navigation={this.props.navigation}
        item={item}
      />

    );
  };

  _renderPopularItems = ({ item, index }: any) => {
    return <RenderPopularItems items={item} key={index} />;
  };

  _renderPromotions = () => {
    return promotionalItems.map((item, index) => {
      return (
        <RenderPromotions
          navigation={this.props.navigation}
          items={item}
          key={index}
        />
      );
    });
  };

  _renderTodaysDeals = ({ item, index }: any) => {
    return (
      <RenderPriceHuntItems
        navigation={this.props.navigation}
        item={item}
        key={index}
      />
    );
  };

  renderNewlyAddedItems = () => {
    return newlyAddedItems.map((item, index) => {
      return (
        <RenderPriceHuntItems
          navigation={this.props.navigation}
          item={item}
          key={index}
        />
      );
    });
  };

  renderAds = ({ item }: any) => {
    return <RenderAds color={item.color} pagination={this.pagination} />;
  };

  renderMorePopularItems = () => {
    return morePopularItems.map((item, index) => {
      return (
        <RenderPriceHuntItems
          navigation={this.props.navigation}
          item={item}
          key={index}
         // index={index}
        />
      );
    });
  };

  renderTopViewedItems = (topViewedItems: Item) => {
    return <RenderTopViewedItems navigation={this.props.navigation} item={topViewedItems} />;
  };

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refresh}
        onRefresh={() => this._refreshListView()}
      />
    );
  }

  stateSubscriptions = () => {
    const unsubscribe = subscribeActionBefore('SET_USER', action => {
      // this.setState({showfavouriteMessage: true},()=>setTimeout(1000,()=>this.setState({showfavouriteMessage: false})))
      console.log(`Before state change action ${action.type}`);
      //  return (
      //    <FlashMessage message="Added to Favourites"/>
      //  )
    });
    return unsubscribe;
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen: boolean) {
    this.setState({ isOpen });
  }

  onScroll = (event: any) => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    currentOffset > this.offset
      ? this.setState({ navHeight: 0 })
      : this.setState({ navHeight: 80 });
    this.offset = currentOffset;
    //console.log(direction);
  };

  reRenderStory = () => {
    // console.log('rendered')
    //this.getStories()
  };

  handleVideoLayout = e => {
    const { height } = Dimensions.get('window');

    this.position.start = e.nativeEvent.layout.y - height + 100;
    this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - 100;
  };

  handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const paused = this.state.paused;
    const { start, end } = this.position;

    if (scrollPosition > start && scrollPosition < end && paused) {
      this.setState({ paused: false });
    } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
      this.setState({ paused: true });
    }
  };

  renderVideos = ({ item, index }: any) => (

    <TouchableOpacity
      key={index}
      onPress={() => this.setState({ muted: !this.state.muted })}>
      <Video
        resizeMode={'cover'}
        source={{
          uri: item,
        }} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }}
        repeat
        muted={this.state.muted}
        paused={this.state.paused}
        onLayout={(e) => console.log(e.nativeEvent.layout)} // Store reference
        // onBuffer={this.onBuffer}                // Callback when remote video is buffering
        // onError={this.videoError}               // Callback when video cannot be loaded
        style={{ width: '100%', flex: 1, aspectRatio: 3 / 2 }}
      />
    </TouchableOpacity>

  );

  render() {

    const maxWidth = Dimensions.get('window').width;
    const maxHeight = Dimensions.get('window').height;
    const diffClamp = Animated.diffClamp(this.state.scrollY, 0, 100);
    const categories = <CategoryMenu closeNotifications={this.toggle} />;
    const notifications = (
      <NotificationsMenu closeNotifications={this.toggle} />
    );

    const translateY = diffClamp.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -60],
      extrapolate: 'clamp',
    });

    const marginTop = diffClamp.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -60],
      extrapolate: 'clamp',
    });

    const paddingTop = diffClamp.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 110],
      extrapolate: 'clamp',
    });

    const opacity = diffClamp.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const category = {
      width: 70,
      height: 65,
      borderRadius: 30,
      marginLeft: '5%',
    };

    const label = {
      height: 30,
      width: 170,
      marginTop: 35,
      marginLeft: '7%',
      borderRadius: 10,
      marginBottom: 20,
    };

    const carouselItem = {
      height: 290,
      width: 200,
      marginLeft: '5%',
      marginTop: '5%',
      borderRadius: 25,
    };

    const popular = {
      width: 100,
      height: 100,
      marginTop: 20,
      borderRadius: 15,
      marginLeft: '7%',
    };

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y,
    };

    const topItem = {
      width: '100%',
      height: 490,
    };

    const gridItem = {
      width: 210,
      height: 255,
      marginBottom: 20,
      borderRadius: 20,
    };

    const searchBar = {
      height: '25%',
      width: '80%',
      marginTop: '15%',
      marginBottom: '12%',
      borderRadius: 20,
    };

    const adz = {
      width: 350,
      height: 200,
      borderRadius: 25,
    };

    let startAncestor;
    let startNode;
    let endAncestor;
    let endNode;
    const position = new Animated.Value(0);

    const adLayout = [adz];
    const labelLayout = [label];
    const topItemLayout = [topItem];
    const searchBarLayout = [searchBar];
    const gridLayout = [gridItem, gridItem, gridItem, gridItem];
    const carouselLayout = [carouselItem, carouselItem, carouselItem];
    const popularLayout = [popular, popular, popular, popular, popular];
    const categoryLayout = [
      category,
      category,
      category,
      category,
      category,
      category,
      category,
    ];

    return (
      <React.Fragment>
        {this.props.network.networkConnection.isConnected ? (
          <React.Fragment>
            {this.state.showfavouriteMessage ? (
              <FlashMessage message={this.state.flashMessage} />
            ) : null}

            <Flash
              refresh={this.state.newContent}
              onRefresh={this.onButtonRefresh}
            />

            <Animated.View
              style={[
                styles(this.props).navBarContainer,
                {
                  height: 60,
                  width: '100%',
                  //transform: [
                  //  {translateY: !this.state.hidingContent ? translateY : 0},
                  //  ],
                  zIndex: 100,
                  elevation: 1
                },
              ]}>
              <View
                style={[
                  styles(this.props).navBarElementPosition,
                  { marginTop: 2, width: '100%' },
                ]}>
                {!this.state.hidingContent ? (
                  <TouchableOpacity onPress={() => this.props.navigationProps.toggleDrawer()}>
                    <MenuLandingIcon height={20} width={20} />
                  </TouchableOpacity>
                ) : (
                    <BackArrowSearch
                      color="black"
                      name="md-arrow-back-sharp"
                      //  style={{bottom: 15, right: 10}}
                      size={30}
                      onPress={() => this.cancelSearch()}
                    />
                  )}

                <TextInput
                  // mode="outlined" 
                  // underlineColor={'white'}
                  placeholder="  Search product"
                  // theme={{ roundness: 5, colors:{primary:'transparent'} }} 
                  // left={<TextInput.Icon name={() => <Icon name={'search'} style={{top: 4}} size={16} />} />}
                  // right={<TextInput.Icon name={() => <Icon name={'camera'} size={20} />} />}
                  //left={<SearchIcon size={10} color="grey" name="search"/>} 
                  style={{ width: '82%', height: 35, backgroundColor: '#F3F4F6', bottom: 5, fontSize: 13, borderWidth: 0.2, borderRadius: 8, borderColor: '#F3F4F6' }} />

                <TouchableHighlight onPress={this.toggle}>
                  <NotifcationActionIcon height={25} width={25} />
                </TouchableHighlight>

              </View>
            </Animated.View>

            <Animated.ScrollView
              ref={(ref: any) => {
                this.scrollListReftop = ref;
              }}
              style={{ marginTop, paddingTop }}
              scrollEnabled={!this.state.apiLoaded}
              contentContainerStyle={{ paddingBottom: 100 }}
              nestedScrollEnabled={!this.state.apiLoaded}
              refreshControl={this._refreshControl()}
              keyboardDismissMode="none"
              keyboardShouldPersistTaps={'always'}
              onScroll={e => {
                this.handleScroll(e);
                if (e.nativeEvent.contentOffset.y > 0)
                  this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
            // this.onScroll(e);
            //  this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
            >


              {/** HEADER CONTAINER AND STORIES */}
              <View style={styles(this.props).base}>
                {!this.state.hidingContent ? (
                  <React.Fragment>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={categoryLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={
                        styles(this.props).storySkeletonContainer
                      }>
                      {
                        <View style={{ marginLeft: 10 }}>
                          {this.state.stories.length > 0 ? (
                            <React.Fragment>
                              <Text
                                style={[
                                  styles(this.props).labelText,
                                  styles(this.props).marginLabelText,
                                  { marginTop: '5%' },
                                ]}>
                                Stories
                              </Text>
                              <Stories
                                key={this.state.key}
                                reRenderStory={this.reRenderStory}
                                navigation={this.props.navigation}
                                viewer={'hunter'}
                                stories={this.state.stories}
                              />
                            </React.Fragment>
                          ) : null}
                        </View>
                      }
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={labelLayout}
                      containerStyle={{ alignSelf: 'flex-start' }}
                      boneColor={'#F1F2F3'}>
                      <React.Fragment>
                        <View style={styles(this.props).labelContainerPosition}>
                          <Text
                            style={[
                              styles(this.props).labelText,
                              styles(this.props).marginLabelText,
                            ]}>
                            Popular Products
                          </Text>
                          <LandingArrowIcon
                            height={20}
                            width={20}
                            style={styles(this.props).rightArrowStyle}
                          />
                        </View>
                      </React.Fragment>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={carouselLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={styles(this.props).row}>
                      <View style={{ right: 20 }}>
                        {
                          <FlatList
                            data={landingItems}
                            renderItem={this._renderItems}
                            horizontal={true}
                            decelerationRate={0}
                            snapToInterval={200} //your element width
                            snapToAlignment={'center'}
                            pagingEnabled={true}
                            style={[styles(this.props).carousel]}
                            contentContainerStyle={{ paddingRight: 100 }}
                            showsHorizontalScrollIndicator={false}
                          />
                        }
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={labelLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={styles(this.props).flexStart}>
                      <View style={styles(this.props).labelContainerPosition}>
                        <Text
                          style={[
                            styles(this.props).labelText,
                            styles(this.props).marginLabelText,
                          ]}>
                          Popular Stores
                        </Text>
                        <LandingArrowIcon
                          height={20}
                          width={20}
                          style={styles(this.props).rightArrowStyle}
                        />
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={popularLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={styles(this.props).row}>
                      <FlatList
                        data={popularItems}
                        renderItem={this._renderPopularItems}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={200} //your element width
                        snapToAlignment={'center'}
                        pagingEnabled={true}
                        contentContainerStyle={{ paddingRight: 130 }}
                        style={[styles(this.props).carousel, { height: 100 }]}
                        showsHorizontalScrollIndicator={false}
                      />
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={labelLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={{ flexDirection: 'row' }}>
                      <View style={styles(this.props).labelContainerPosition}>
                        <Text
                          style={[
                            styles(this.props).labelText,
                            styles(this.props).marginLabelText,
                          ]}>
                          Top Viewed Items
                        </Text>
                        <LandingArrowIcon
                          height={20}
                          width={20}
                          style={styles(this.props).rightArrowStyle}
                        />
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={topItemLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={styles(this.props).row}>
                      {this.renderTopViewedItems(topViewedItems[0])}
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={labelLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={{ flexDirection: 'row' }}>
                      <View style={styles(this.props).labelContainerPosition}>
                        <Text
                          style={[
                            styles(this.props).labelText,
                            styles(this.props).marginLabelText,
                          ]}>
                          Newly Added Items
                        </Text>
                        <LandingArrowIcon
                          height={20}
                          width={20}
                          style={styles(this.props).rightArrowStyle}
                        />
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={gridLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={styles(this.props).todaysDealItems}>
                      <View style={styles(this.props).todaysDealItems}>
                        {
                          <FlatList
                            numColumns={2}
                            style={{ margin: 5 }}
                            data={todaysDealItems}
                            renderItem={this._renderTodaysDeals}
                          />
                        }
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={labelLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={{ flexDirection: 'row' }}>
                      <View style={styles(this.props).labelContainerPosition}>
                        <Text
                          style={[
                            styles(this.props).labelText,
                            styles(this.props).marginLabelText,
                          ]}>
                          Todays Deals
                        </Text>
                        <LandingArrowIcon
                          height={20}
                          width={20}
                          style={styles(this.props).rightArrowStyle}
                        />
                      </View>
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={topItemLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={{ flexDirection: 'row' }}>
                      {this.renderTopViewedItems(topViewedItems[1])}
                    </SkeletonContent>

                    <SkeletonContent
                      isLoading={this.state.apiLoaded}
                      layout={adLayout}
                      boneColor={'#F1F2F3'}
                      containerStyle={{}}>
                      <View style={styles(this.props).adContainer}>
                        <Carousel
                          data={ads}
                          //loop={true}
                          // autoplay={true}
                          itemWidth={350}
                          layout={'tinder'}
                          sliderHeight={200}
                          //autoplayDelay={500}
                          sliderWidth={maxWidth}
                          inactiveSlideOpacity={1}
                          renderItem={this.renderAds}
                          //activeAnimationType={'decay'}
                          activeSlideAlignment={'center'}
                          //ref={(c) => {  this.carousel = c; }}
                          onSnapToItem={index => {
                            this.setState({ adsIndex: index });
                          }}
                        />
                      </View>
                    </SkeletonContent>

                    <View style={styles(this.props).labelContainerPosition}>
                      <Text
                        style={[
                          styles(this.props).labelText,
                          styles(this.props).marginLabelText,
                        ]}>
                        Trending
                      </Text>
                    </View>

                    <Carousel
                      data={[
                        'https://pricehunt101.s3.us-east-2.amazonaws.com/2018+Range+Rover.mp4',
                        'https://pricehunt101.s3.us-east-2.amazonaws.com/2018+Range+Rover.mp4',
                        'https://pricehunt101.s3.us-east-2.amazonaws.com/2018+Range+Rover.mp4',
                      ]}
                      itemWidth={maxWidth}
                      layout={'default'}
                      sliderHeight={100}
                      sliderWidth={maxWidth}
                      inactiveSlideOpacity={1}
                      renderItem={this.renderVideos}
                      activeSlideAlignment={'center'}
                      onSnapToItem={index => {
                        this.setState({ videoIndex: index });
                      }}
                    />
                    {this.videoPagination}

                    <Modal visible={this.state.visible}>
                      <View style={{ flexDirection: 'row' }}>
                        <BackArrowSearch
                          color="#FF4C52"
                          name="md-arrow-back-sharp"
                          style={{ top: 35, left: 10 }}
                          size={30}
                          onPress={() => this.cancelSearch()}
                        />
                        <SearchBar
                          cancelSearch={this.cancelSearch}
                          showContent={this.showContent}
                          hideContent={this.hideContent}
                          navigation={this.props.navigation}
                        />
                      </View>
                    </Modal>
                  </React.Fragment>
                ) : (
                    <View>
                      <Text>Testing</Text>
                    </View>
                  )}
              </View>
            </Animated.ScrollView>
            <View style={StyleSheet.absoluteFillObject} pointerEvents={this.state.activeImage ? 'auto' : 'none'}>
              <View style={{ flex: 2 }} ref={view => (this.viewImage = view)}>
                <Animated.Image
                  source={this.state.activeImage ? this.state.activeImage.src : null}
                  style={[{ resizeMode: 'cover', top: 0, left: 0, height: null, width: null, },
                    activeImageStyle,
                  ]}>
                </Animated.Image>
              </View>

              <View style={{ flex: 1 }}></View>

            </View>
            {/*this.state.selectedCard != null ? (
              <HunterItemsScreen
                currItem={this.state.currItem}
                yOffset={this.state.yOffset}
                xOffset={this.state.xOffset}
                unselectCard={() => this.setState({selectedCard: null})}
              />
            ) : null*/}
          </React.Fragment>
        ) : (
            <VerfifyNetworkConnenction />
          )}
      </React.Fragment>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    scrollPosition: {
      left: '50%',
    },
    flexStart: {
      alignSelf: 'flex-start',
    },
    navBarContainer: {
      backgroundColor: 'white',
      //marginBottom: 20,
    },
    navBarElementPosition: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    labelContainerPosition: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '6%',
    },
    labelText: {
      // position: 'absolute',
      fontFamily: 'Roboto-Medium',
      fontSize: 17,
    },
    adContainer: {
      // marginTop: 50,
      marginBottom: 50,
    },
    rightArrowStyle: {
      top: 5,
      bottom: 3,
      right: 10,
      elevation: 1,
    },
    priceHuntText: {
      fontFamily: 'Roboto-Medium',
      fontSize: 25,
      textAlign: 'center',
    },
    storySkeletonContainer: {
      flexDirection: 'row',
      marginTop: '5%',
    },
    marginLabelText: {
      marginLeft: '5%',
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
      height: 300,
      width: '100%',
    },
    logoImageContainer: {
      // right: Dimensions.get('window').width / 2
    },
    carousel: {
      height: 300,
      width: Dimensions.get('window').width,
      marginTop: 15,
      marginLeft: 20,
      elevation: 10,
      zIndex: 10,
      marginRight: 15,
    },
    logoContainer: {
      flexDirection: 'row',
      transform: [{ rotate: '270deg' }],
      //left: 3,
    },
    row: {
      // marginTop: hp(15),
      // justifyContent: 'center',
      flexDirection: 'row',
    },
    logoTextContainer: {
      flexDirection: 'row',
      transform: [{ rotate: '270deg' }],
      left: 70,
      top: 11,
    },
    PriceText: {
      fontSize: hp(1.2),
      color: '#F71735',
      textAlignVertical: 'center',
    },
    HuntText: {
      fontSize: hp(1.2),
      color: '#F71735',
      fontWeight: 'bold',
      textAlignVertical: 'center',
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
      top: '10%',
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
      width: '80%',
      height: '85%',
      elevation: 3,
      color:
        props.theme === DARK
          ? DarkTheme.textInputTextColor
          : props.theme === LIGHT
            ? LightTheme.textInputTextColor
            : DEFAULT,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      alignSelf: 'center',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.textInputColor
          : props.theme === LIGHT
            ? LightTheme.textInputColor
            : DEFAULT,
    },
    searchButton: {
      width: '17%',
      height: '83%',
      alignItems: 'center',
      borderTopRightRadius: 10,
      backgroundColor: 'black',
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
      padding: 10,
      // elevation:5
      // backgroundColor:props.theme === DARK ? DarkTheme.textInputColor: props.theme === LIGHT? LightTheme.textInputColor: DEFAULT,
    },
    searchIconContainer: {
      width: '10%',
      height: '85%',
      elevation: 3,
      alignItems: 'center',
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.textInputColor
          : props.theme === LIGHT
            ? LightTheme.textInputColor
            : DEFAULT,
    },
    popularText: {
      padding: 10,
      fontSize: 18,
      color:
        props.theme === DARK
          ? DarkTheme.popularSearchText
          : props.theme === LIGHT
            ? LightTheme.popularSearchText
            : DEFAULT,
      fontWeight: '700',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    network: state.network,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchItemActionType>) => {
  return {
    reduxSearchItemAction: (item: string) => dispatch(SearchItemAction(item)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingScreen);
