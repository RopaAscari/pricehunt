import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import BookIcon from '@icons/book-icon';
import BabyIcon from '@icons/baby-icon';
import HomeIcon from '@icons/home-icon';
import {allItems} from '@data/app-data';
import SearchBar from '@components/search-bar/search-bar'
import FlashMessage from '@components/flash-message/flash-message'
import AllIcon from '@components/svg/icons/all-icon';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '@reducers/combined-reducers';
import ShoesIcon from '@components/svg/icons/shoes-icon';
import {SetItemAction} from '@actions/set-item-action';
import {SetItemActionType} from '@constants/item-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VehicleIcon from '@components/svg/icons/vehicle-icon';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import FastFoodIcon from '@components/svg/icons/fast-food-icon';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ElectronicIcon from '@components/svg/icons/electronics-icon';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import RenderItemCategories from '@components/render-categories/render-categories';
import RenderPriceHubItems from '@components/render-price-hub-items/render-price-hub-items';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';

type Props = {
  theme: any;
  searched: string;
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  page: number;
  search: string;
  visible: boolean;
  searching: boolean;
  activeIndex: number;
  itemsPerPage: number;
  paginated: Array<any>;
  searchedItems: Array<any>;
  categories: Array<JSX.Element>;
};

const paginationMax = 4;

class PriceHubScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 1,
      search: '',
      visible: false,
      activeIndex: 0,
      itemsPerPage: 4,
      searching: false,
      paginated: [],
      searchedItems: [],
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
  }

  componentDidMount() {
    const searched = allItems.filter(item =>
      item.name.toLowerCase().includes(this.props.searched.toLowerCase()),
    );
    this.setState({searchedItems: searched});
  }

  searchFocused = () => {
    this.setState({searching: true});
    this.setState({visible: true});
  };

  searchUnFocused = () => {
    console.log('Unfocused');
  };

  noSearch = () => {
    this.setState({searching: false});
    this.setState({visible: false});
  };

  onChangeText = (key: string, value: any) => {
    this.setState({[key]: value} as Pick<State, keyof State>);
  };

  paginate = (array: Array<any>, index: number, size: number) => {
    // transform values
    index = Math.abs((index));
    index = index > 0 ? index - 1 : index;
    size = (size);
    size = size < 1 ? 1 : size;
    // filter
    return [
      ...array.filter((value, n) => {
        return n >= index * size && n < (index + 1) * size;
      }),
    ];
  };

  renderPriceHubItems = () => {
    const transform = this.paginate(
      this.state.searchedItems,
      this.state.page,
      paginationMax,
    );
    return transform.map((item, index) => {
      return (
        <RenderPriceHubItems
          navigation={this.props.navigation}
          items={item}
          key={index}
        />
      );
    });
  };

  render() {
    const maxWidth = Dimensions.get('window').width;
    const maxHeight = Dimensions.get('window').height;
    let singlePage =   this.state.searchedItems.length / paginationMax;
    const pages = Number.isInteger(singlePage) ? singlePage : Math.trunc(singlePage) + 1;
  
    return (
      <ScrollView style={styles(this.props).body}>
        
        <View
          style={[
            styles(this.props).headerContainer,
            {height: maxHeight * 0.14, width: maxWidth},
          ]}>
                 <SearchBar
            //  selectedItem={this.state.search}            
              navigation={this.props.navigation}
            //  hideSearchModal={this.cancelSearch}
            //  showSearchModal={this.searchFocused}
             // retrieveSearchParams={this.updateSearchParams}
            />
        </View>
        <View style={{left: 15}}>
        <RenderItemCategories/>
        </View>
        <View style={styles(this.props).priceHubItems}>
          {this.renderPriceHubItems()}
        </View>

        <View style={{marginBottom: '15%', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{right: 15}}>
              <Text>
                {this.state.page} of {pages}
              </Text>
            </View>

            {this.state.page === 1 ? (
              <Icon name="arrow-back-ios" size={18} color={'grey'} />
            ) : ( 
              <Icon
                name="arrow-back-ios"
                size={18}
                color={'black'}
                onPress={() => this.setState({page: this.state.page - 1})}
              />
            )}
            {this.state.page === pages ? (
              <Icon name="arrow-forward-ios" size={18} color={'grey'} />
            ) : (
              <Icon
                name="arrow-forward-ios"
                size={18}
                color={'black'}
                onPress={() => this.setState({page: this.state.page + 1})}
              />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = (props: Props) =>
  StyleSheet.create({
    body: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
    },
    headerIconsContainer: {
      padding: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowContainer: {
      top: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBar: {
      width: '70%',
      height: '100%',
      elevation: 3,
      color:
        props.theme === DARK
          ? DarkTheme.textInputTextColor
          : props.theme === LIGHT
          ? LightTheme.textInputTextColor
          : DEFAULT,
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
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
          ? DarkTheme.textInputColor
          : props.theme === LIGHT
          ? LightTheme.textInputColor
          : DEFAULT,
    },
    priceHubItems: {
      marginTop: '10%',
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
  });

const mapStateToProps = (state: RootState) => {
  return {
    searched: state.searched.searched,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SetItemActionType>) => {
  return {
    reduxItemAction: (item: any) => dispatch(SetItemAction(item)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PriceHubScreen);
