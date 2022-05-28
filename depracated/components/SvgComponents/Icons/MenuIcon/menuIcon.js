import React from "react";
import Svg, { Path,G,Stop,LinearGradient,Defs,Rect } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MenuIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="22"
      viewBox="0 0 34 22"
    >
      <G fill="#3e3e3e" data-name="Group 3" transform="translate(76 132)">
        <Rect
          width="34"
          height="5"
          data-name="Rectangle 33"
          rx="2.5"
          transform="translate(-76 -132)"
        ></Rect>
        <Rect
          width="30"
          height="6"
          data-name="Rectangle 34"
          rx="3"
          transform="translate(-72 -124)"
        ></Rect>
        <Rect
          width="34"
          height="5"
          data-name="Rectangle 35"
          rx="2.5"
          transform="translate(-76 -115)"
        ></Rect>
      </G>
    </Svg>
  );
}

export default MenuIcon;
