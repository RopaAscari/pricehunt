import {connect} from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "@reducers/combined-reducers";
import { NavigationScreenProp } from 'react-navigation';
import { DARK, LIGHT, DEFAULT} from "@constants/theme-types";
import { DarkTheme } from '@theme/dark/menu-slider-dark-mode';
import MenuContent from '@components/menu contents/menu-content';
import { LightTheme } from '@theme/light/menu-slider-light-mode.tsx';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from "react-native";

type Props = {
  theme: any
  hideMenu: () => void
  navigation: NavigationScreenProp<any,any>
}

 function MenuSlider(props: Props) {
 
  const animation = new Animated.Value(0)
  const screenHeight = Dimensions.get("window").height;

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * screenHeight],
          extrapolate: "clamp",
        }),
      },
    ],
  };

useEffect(() => {
    handleOpen()
  })

  const handleOpen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };
  const handleClose = () => {
   // props.hideMenu();
    Animated.timing(animation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

    return (
        <Animated.View style={[StyleSheet.absoluteFill, styles(props).cover, backdrop]}>
          <View style={[styles(props).sheet]}>
            <Animated.View  style={[styles(props).popup, slideUp]}>
              <TouchableOpacity onPress={handleClose} style={{alignItems:'center'}}>
                <Text>{"\n"} Close</Text>
             {/* <SettingsBarIcon/>*/}
              </TouchableOpacity>
                  <MenuContent navigation={props.navigation}/>
            </Animated.View>
          </View>
        </Animated.View>
    );
}

const styles = (props: Props) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    //bottom:0,
    backgroundColor: "rgba(0,0,0,.5)",
    elevation:10,
    height: "100%",
    position: "absolute"
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",

  },
  popup: {
    flex:1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 300,
    backgroundColor: props.theme === DARK ? DarkTheme.backgroundColor : props.theme === LIGHT? LightTheme.backgroundColor: DEFAULT,
    marginHorizontal: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position:'absolute',
   alignItems:'center',
   alignSelf:'center'
  },
});
const mapStateToProps = (state: RootState) => {
  return {
      theme: state.theme.theme
  }
}

export default connect(mapStateToProps)(MenuSlider);
