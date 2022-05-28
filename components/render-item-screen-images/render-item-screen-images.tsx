import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '@reducers/combined-reducers';
import { DARK, LIGHT, DEFAULT } from '@constants/theme-types';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { DarkTheme } from '@theme/dark/hunter-item-screen-dark-theme';
import { LightTheme } from '@theme/light/hunter-item-screen-light-theme.tsx';

type Props = {
    theme: any
    imageUrl: string
}

function RenderItemImages(props: Props){

    const src: object = { uri: props.imageUrl };

    return(
        <View style={styles(props).background}>
            <Image source={src} style={styles(props).imageContainer}/>
        </View>
     )
}

const styles = (props: Props) => StyleSheet.create({

    imageContainer: {
        width:'100%',
        height: 400,
        alignSelf:'center',
        resizeMode:'cover',
    },
    background:{
        width: Dimensions.get('window').width,
        height: 400,
        alignSelf:'center',
        backgroundColor:   props.theme === DARK
        ? DarkTheme.imageBackgroundColor
        : props.theme === LIGHT
        ? LightTheme.imageBackgroundColor
        : DEFAULT,
    }
})

const mapStatetoProps = (state: RootState) => {
    return {
      item: state.item.item,
      user: state.user.user,
      theme: state.theme.theme,
      isloggenIn: state.session.isloggenIn,
    };
  };
  export default connect(mapStatetoProps)(RenderItemImages);