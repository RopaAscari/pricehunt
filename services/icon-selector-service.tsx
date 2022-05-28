import React from 'react';
import {StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type StyleSheet<S, Styles> = any;

class IconSelectorService {
  Iconicons(name: string, size: number, style?: any, color?: string, onPress?: Function) {
    return <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />;
  }

  featherIcons(name: string, size: number, style?: any, color?: string, onPress?: Function) {
    return <Feather name={name} size={size} color={color} style={style} onPress={onPress}/>;
  }

  fontAwesomeIcons(name: string, size: number, style?: any, color?: string, onPress?: Function) {
    return <FontAwesome name={name} size={size} color={color} style={style} onPress={onPress} />;
  }

  materialIcons(name: string, size: number, style?: any, color?: string) {
    return (
      <MaterialIcons name={name} size={size} color={color} style={style} />
    );
  }

  antDesignIcons(name: string, size: number, style?: any, color?: string) {
    return <AntDesign name={name} size={size} color={color} style={style} />;
  }

  fontAwesome5Icons(name: string, size: number, style?: any, color?: string) {
    return <FontAwesome5 name={name} size={size} color={color} style={style} />;
  }

  Octicons(name: string, size: number, style?: any, color?: string) {
   return <Octicons name={name} size={size} color={color} style={style} />;
  }

  Fontisto(name: string, size: number, style?: any, color?: string, onPress?: Function) {
    return <Fontisto name={name} size={size} color={color} style={style} onPress={onPress}/>;
  }
}

export default new IconSelectorService();
