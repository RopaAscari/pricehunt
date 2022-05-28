import React from "react";
import {DARK, LIGHT} from '../../../constants/theme-types'
import Svg, { Path,G,Stop,LinearGradient,Defs } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View } from "react-native";

type Props = {

    width: number
    height: number  
    style?: any
}

function RedPriceHuntLogo(props: Props) {
  return (
      <View style={props.style}>
    <Svg
      width={wp(props.width)}
      height={wp(props.height)}
      fill="none"
      viewBox="0 0 93 147"
    >
      <Path
        stroke="url(#paint0_linear)"
        strokeWidth="23.25"
        d="M47.593 81.374H24"
      ></Path>
      <Path
        fill="#F71735"
        fillRule="evenodd"
        d="M46.5 69.75h.969v23.24C72.703 92.474 93 71.858 93 46.5 93 20.819 72.181 0 46.5 0S0 20.819 0 46.5v99.781h23.25V45.531h.02C23.778 33.14 33.984 23.25 46.5 23.25c12.84 0 23.25 10.41 23.25 23.25S59.34 69.75 46.5 69.75z"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="15.5"
          x2="47.273"
          y1="81"
          y2="81.003"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#EB3A31"></Stop>
          <Stop offset="0.439" stopColor="#F71735"></Stop>
          <Stop offset="1" stopColor="#F71735"></Stop>
        </LinearGradient>
      </Defs>
    </Svg>
    </View>
  );
}

export default RedPriceHuntLogo;