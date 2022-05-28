import React from 'react';
import {connect} from 'react-redux';
import AllIconWhite from '@icons/all-icon-white';
import HomeIconWhite from '@icons/home-icon-white';
import BabyIconWhite from '@icons/baby-icon-white';
import BookIconWhite from '@icons/book-icon-white';
import ShoesIconWhite from '@icons/shoes-icon-white';
import AllIcon from '@components/svg/icons/all-icon';
import HomeIcon from '@components/svg/icons/home-icon';
import BabyIcon from '@components/svg/icons/baby-icon';
import BookIcon from '@components/svg/icons/book-icon';
import { RootState } from '@reducers/combined-reducers';
import VehicleIconWhite from '@icons/vehicle-icon-white';
import ShoesIcon from '@components/svg/icons/shoes-icon'; 
import FastFoodIconWhite from '@icons/fast-food-icon-white';
import VehicleIcon from '@components/svg/icons/vehicle-icon';
import { DARK, LIGHT, DEFAULT } from '@constants/theme-types';
import ElectronicIconWhite from '@icons/electronics-icon-white';
import {DarkTheme} from '@theme/dark/landing-screen-dark-theme';
import FastFoodIcon from '@components/svg/icons/fast-food-icon';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ElectronicIcon from '@components/svg/icons/electronics-icon';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {LightTheme} from '@theme/light/landing-screen-light-theme.tsx';

type Props = {
  theme: any;
};

function RenderItemCategories(props: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const redIcons = [
    <AllIcon height={26} width={26} />,
    <FastFoodIcon height={26} width={26} />,
    <VehicleIcon height={26} width={26} />,
    <ElectronicIcon height={26} width={26} />,
    <ShoesIcon height={26} width={26} />,
    <BookIcon height={26} width={26} />,
    <BabyIcon height={26} width={26} />,
    <HomeIcon height={26} width={26} />,
  ];

  const whiteIcons = [
    <AllIconWhite height={26} width={26} />,
    <FastFoodIconWhite height={26} width={26} />,
    <VehicleIconWhite height={26} width={26} />,
    <ElectronicIconWhite height={26} width={26} />,
    <ShoesIconWhite height={26} width={26} />,
    <BookIconWhite height={26} width={26} />,
    <BabyIconWhite height={26} width={26} />,
    <HomeIconWhite height={26} width={26} />,
  ];

  const renderItemCategories = () => {
    return redIcons.map((i,k)=>{
    return (
      <View
        key={k}
        style={
          activeIndex === k
            ? styles(props).activeContainer
            : styles(props).container
        }>
        <View style={styles(props).scrollPosition}>
          <TouchableOpacity
          //  key={k}
            onPress={() => {
              setActiveIndex(k);
            }}>
            <View style={{top: 20}}>
              {activeIndex === k ? whiteIcons[k] : redIcons[k]}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
   })
  };
 
  return (
    <View style={{right: 32, marginTop:'15%'}}>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={300} //your element width
            snapToAlignment={'center'}
            pagingEnabled={true}
            style={styles(props).carousel}
            showsHorizontalScrollIndicator={false}>
            {renderItemCategories()}
          </ScrollView>
    </View>
  );
}

const styles = (props: Props) =>
  StyleSheet.create({
    activeCatergoryText: {
      //    / flexGrow:1,
      fontSize: 16,
      //fontWeight:'bold',
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#E64B30',
    },
    carousel: {
      height: 80,
      width: Dimensions.get('window').width,
    //  / marginTop: 5,
      marginLeft: 20,
      elevation: 10,
      zIndex: 10,
      marginRight: 10,
    },
    categoryText: {
      flex: 0,
      //flexGrow:1,
      fontSize: 16,
      alignItems: 'center',
      borderRadius: 5,
      borderColor: '#CCCCCC',
      borderWidth: 1.5,
      color:
        props.theme === DARK
          ? DarkTheme.categoryTextColor
          : props.theme === LIGHT
          ? LightTheme.categoryTextColor
          : DEFAULT,
    },
    scrollPosition: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    activeContainer: {
      height: 65,
      width: 55,
      marginLeft: 25,
      borderRadius: 22,
      elevation: 5,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#EB3A31',
    },
    container: {
      height: 65,
      width: 55,
      marginLeft:25,
      borderRadius: 30,
      elevation: 5,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor:
        props.theme === DARK
          ? DarkTheme.categoryBackgroundColor
          : props.theme === LIGHT
          ? LightTheme.categoryBackgroundColor
          : DEFAULT,
    },
  });

const mapStateToProps = (state: RootState) => {
  return {
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(RenderItemCategories);
