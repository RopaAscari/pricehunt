import React from "react";
import Svg, { Path,G,Stop,LinearGradient,Defs } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    height: number
    width: number
}

export default function PriceHuntLogo(props: Props) {
  return (
    <Svg
      width={wp(props.width)}
      height={wp(props.height)}
      fill="none"
      viewBox="0 0 93 147"
    >
      <Path
        stroke="url(#paint0_linear)"
        strokeWidth="23.25"
        d="M47.469 81.375L12.594 81.375"
      ></Path>
      <Path
        fill="#0D0F25"
        fillRule="evenodd"
        d="M46.5 69.75h.969v23.24C72.703 92.474 93 71.858 93 46.5 93 20.819 72.181 0 46.5 0S0 20.819 0 46.5v99.781h23.25V45.531h.02C23.778 33.14 33.984 23.25 46.5 23.25c12.84 0 23.25 10.41 23.25 23.25S59.34 69.75 46.5 69.75z"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="22.5"
          x2="47"
          y1="81"
          y2="81"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity="0.47"></Stop>
          <Stop offset="0.144" stopColor="#9899A2" stopOpacity="0.78"></Stop>
          <Stop offset="0.353" stopColor="#0D0F25" stopOpacity="0.72"></Stop>
          <Stop offset="0.523" stopColor="#0D0F25" stopOpacity="0.88"></Stop>
          <Stop offset="0.772" stopColor="#0D0F25"></Stop>
          <Stop offset="1" stopColor="#0D0F25"></Stop>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

