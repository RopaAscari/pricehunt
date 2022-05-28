import React from "react";
import {View} from 'react-native';
import Svg, { Path , Circle} from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Ellipse2() {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width="242"
      height="240"
      fill="none"
      viewBox="0 0 242 240"
    >
      <Circle
        cx="30"
        cy="212"
        r="212"
        fill="#C4C4C4"
        fillOpacity="0.05"
      ></Circle>
    </Svg>
  );
}

export default Ellipse2;
