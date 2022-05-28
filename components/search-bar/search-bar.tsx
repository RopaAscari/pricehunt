import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {allItems, landingItems} from '@data/app-data';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootState} from '@reducers/combined-reducers';
import {NavigationScreenProp} from 'react-navigation';
import {SearchItemActionType} from '@constants/item-types';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK, LIGHT, DEFAULT} from '@constants/theme-types';
import {SearchItemAction} from '@actions/search-item-action';
import BlackPriceHuntLogo from '@svgcomponents/black-price-hunt-logo';
import WhitePriceHuntLogo from '@svgcomponents/white-price-hunt-logo';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';
import QRScanner from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuLandingIcon from '@icons/menu-landing-icon';
import {
  View,
  Text,
  // TextInput,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Keyboard,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
//import RedPriceHuntLogo from '@components/svg/components/red-price-hunt-logo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  theme: any;
  hideContent: () => void;
  showContent: () => void;
  cancelSearch: () => void;
  navigation: NavigationScreenProp<any, any>;
  reduxSearchItemAction: (item: string) => void;
};

function SearcBar(props: Props) {
  const maxWidth = Dimensions.get('window').width;
  const maxHeight = Dimensions.get('window').height;
  const [visible, toggleVisibility] = React.useState(false);
  const [searchParam, getSearchParam] = React.useState('');
  const width = React.useRef(new Animated.Value(400)).current;
  const [searching, startedSearching] = React.useState(false);
  const TextField = Animated.createAnimatedComponent(TextInput);

  const animateTextInput = () => {
    return Animated.timing(width, {
      toValue: 300,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const unanimateTextInput = () => {
    return Animated.timing(width, {
      toValue: 400,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const searchFocused = () => {
    // animateTextInput();
   // props.hideContent();
    startedSearching(true);
  };

  const cancelSearch = () => {
    Keyboard.dismiss();
    props.cancelSearch();
    startedSearching(false);
  };

  const navigateToPriceHub = (param: string) => {
    
    if (searchParam === '') {
      Alert.alert('Enter a product');
    } else {
      cancelSearch()
      // Alert.alert(param);
      props.reduxSearchItemAction(param);
      props.navigation.navigate('Price-Hub');
    }
  };

  const searchResults = () => {
    return allItems
 /*     .filter(item => {
        if (searchParam === '') {
         return ''
        }
        if(item.name.toLowerCase().includes(searchParam.toLowerCase())){
          return true
        }
        
      })*/
      .map((item, index) => {
        return (
          <View key={index} style={[styles(props).resultContainer]}>
            <TouchableWithoutFeedback
              onPress={() => navigateToPriceHub(item.name)}>
              <Text key={index} style={styles(props).resultText}>
                {' '}
                {'item.name'}{' '}
              </Text>
            </TouchableWithoutFeedback>
            <Icon
              name="arrow-top-left"
              size={20}
              color={
                props.theme === DARK
                  ? 'white'
                  : props.theme === LIGHT
                  ? 'black'
                  : ''
              }
              onPress={() => getSearchParam(item.name)}
            />
          </View>
        );
      });
  };

  return (
    <View
      style={{backgroundColor: 'white', height: '100%', elevation: 0, bottom: 20, marginTop: 25}}>
      <View style={styles(props).rowContainer}>
        <TextInput
          //textStyle={}
          right={
            <TextInput.Icon
              name={() => (
                <Icon
                  onPress={() => navigateToPriceHub(searchParam)}
                  name="md-search-sharp"
                  color="#FF4C52"
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    top: 4,
                  }}
                  size={20}
                />
              )}
            />
          }
          // labelProps={}
          // hasActiveOutline={false}
          mode={'outlined'}
          underlineColorAndroid="transparent"
          theme={{roundness: 30, colors: {primary: 'transparent'}}}
          value={searchParam}
          style={[styles(props).searchBar]}
          placeholder="  Search Product"
          onFocus={() => searchFocused()}
          onChangeText={val => {
            getSearchParam(val);
          }}
          onSubmitEditing={() => navigateToPriceHub(searchParam)}
        />
      </View>
     
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    searchIconContainer: {
      width: '10%',
      height: '40%',
      elevation: 3,
      marginTop: '7%',
      alignItems: 'center',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.textInputColor
          : props.theme === LIGHT
          ? LightTheme.textInputColor
          : DEFAULT,
    },
    searchIcon: {
      padding: 10,
    },
    row: {
      alignSelf: 'center',
      //marginTop: hp(15),
      justifyContent: 'center',
      flexDirection: 'row',
    },
    logoTextContainer: {
      flexDirection: 'row',
      transform: [{rotate: '270deg'}],
      left: 70,
      // top: 11,
    },
    logoImageContainer: {
      // right: Dimensions.get('window').width / 2
    },
    body: {
      //flex: 1,
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.backgroundColor
          : props.theme === LIGHT
          ? LightTheme.backgroundColor
          : DEFAULT,
      width: Dimensions.get('window').width,
      height: 100,
    },
    modalContainer: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
    },
    searchBar: {
      height: 50,
      fontSize: 17,
      width: 350,
      borderColor: 'black',
     // borderRadius: 20
      // borderWidth:0,
      marginTop: 10,
      //bottom: 10,
      //elevation: 3,
      //position:'absolute',
      backgroundColor: '#F3F4F6',
      color:
        props.theme === DARK
          ? DarkTheme.textInputTextColor
          : props.theme === LIGHT
          ? 'black' ///LightTheme.textInputTextColor
          : DEFAULT,

      borderRadius: 2,
      alignSelf: 'center',
    },
    rowContainer: {
      marginTop: '1%',
      width: '100%',
      //position: 'absolute',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // height: 50,
    },
    resultContainer: {
      height: '100%',
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      marginLeft: 15,
    },
    resultText: {
      fontSize: 18,
      color:
        props.theme === DARK
          ? 'white'
          : props.theme === LIGHT
          ? 'black'
          : DEFAULT,
    },
    logoContainer: {
      flexDirection: 'row',
      // transform: [{rotate: '270deg'}],
      //left: 3,
    },
    PriceText: {
      fontSize: hp(2.4),
      color: '#F71735',
      textAlignVertical: 'center',
    },
    HuntText: {
      fontSize: hp(2.4),
      color: '#203B54',
      fontWeight: 'bold',
      textAlignVertical: 'center',
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    theme: state.theme.theme,
    session: state.session.isloggenIn,
    isNetworkConnected: state.network,
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
)(SearcBar);
