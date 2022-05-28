import * as React from "react";
import Svg, { Path,G,Stop,LinearGradient,Defs } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function HubSVG2() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="125.283"
        height="335.32"
        viewBox="0 0 125.283 335.32"
      >
        <Defs>
          <LinearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor="#f85252" stopOpacity="0.561"></Stop>
            <Stop offset="1" stopColor="#7c2929" stopOpacity="0.561"></Stop>
          </LinearGradient>
          <LinearGradient
            id="linear-gradient-2"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor="#f85252" stopOpacity="0.859"></Stop>
            <Stop offset="1" stopColor="#7c2929" stopOpacity="0.859"></Stop>
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
        <G data-name="Group 157" transform="translate(-223.741 -405.8)">
          <Path
            fill="url(#linear-gradient)"
            d="M398.952 438.935s-167.145 62.926-115.231 143.944c32.55 50.8 69.659 82.472 92.827 130.206 6.411 13.208 10.6 19.557 16.1 34.108a104.788 104.788 0 016.333 27.062V732.6z"
            data-name="Path 35"
            transform="translate(-49.981 -33.134)"
          ></Path>
          <Path
            fill="url(#linear-gradient-2)"
            d="M392.783 438.935s-158.911 59.826-109.554 136.853c30.947 48.3 66.227 78.409 88.254 123.792 6.1 12.558 10.076 18.594 15.307 32.428a99.626 99.626 0 016.021 25.729v-39.6z"
            data-name="Path 34"
            transform="translate(-43.981 -28.616)"
          ></Path>
          <Path
            fill="url(#linear-gradient-3)"
            d="M385.979 438.935s-149.83 56.408-103.294 129.033C311.863 613.5 345.128 641.9 365.9 684.685c5.747 11.84 9.5 17.531 14.433 30.574a93.933 93.933 0 015.677 24.258v-37.34z"
            data-name="Path 32"
            transform="translate(-36.981 -23.397)"
          ></Path>
        </G>
      </Svg>
    );
  }
  
  export default HubSVG2;
  