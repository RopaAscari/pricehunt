import React from "react";
import Svg, { Path,G,Stop,LinearGradient,Defs } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function HubSVG1() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="202.651"
      height="400"
      viewBox="0 0 202.651 484.499"
    >
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor="#f85252" stopOpacity="0.341"></Stop>
          <Stop offset="1" stopColor="#7c2929" stopOpacity="0.341"></Stop>
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-2"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor="#f85252" stopOpacity="0.851"></Stop>
          <Stop offset="1" stopColor="#7c2929" stopOpacity="0.851"></Stop>
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-3"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor="#f85252"></Stop>
          <Stop offset="1" stopColor="#7c2929"></Stop>
        </LinearGradient>
      </Defs>
      <G data-name="Group 157" transform="translate(0 .173)">
        <G data-name="Group 35">
          <Path
            fill="url(#linear-gradient)"
            d="M151 0s58.27 115.945 14.212 179.477-76.745 0-108.012 168.359c-21.355 114.988-50 135.2-66.351 136.481a20.524 20.524 0 01-11.815-2.446V0z"
            data-name="Path 30"
            transform="translate(20.964 -.061)"
          ></Path>
          <Path
            fill="url(#linear-gradient-2)"
            d="M141.067 0s54.9 109.246 13.391 169.108-72.311 0-101.771 158.632C32.565 436.084 5.573 455.127-9.831 456.335a19.337 19.337 0 01-11.133-2.3V0z"
            data-name="Path 29"
            transform="translate(20.964 -.173)"
          ></Path>
          <Path
            fill="url(#linear-gradient-3)"
            d="M130.355 0s51.273 102.024 12.506 157.928-67.531 0-95.043 148.145c-18.791 101.182-44 118.966-58.385 120.094a18.059 18.059 0 01-10.4-2.152V0z"
            data-name="Path 28"
            transform="translate(20.964)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}

export default HubSVG1;
