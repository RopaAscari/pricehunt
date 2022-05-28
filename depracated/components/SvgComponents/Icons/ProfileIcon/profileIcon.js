import React from "react";
import Svg, { Path,G,Stop,LinearGradient,Defs,Circle } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function ProfleIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 19 19"
    >
      <G data-name="Group 113" transform="translate(-10 -12)">
        <Circle
          cx="9.5"
          cy="9.5"
          r="9.5"
          fill="#fff"
          data-name="Ellipse 21"
          transform="translate(10 12)"
        ></Circle>
        <Path
          fill="#f85252"
          d="M11.424 11.424a2.712 2.712 0 10-2.712-2.712 2.711 2.711 0 002.712 2.712zm0 1.356c-1.81 0-5.424.908-5.424 2.712v1.356h10.848v-1.356c0-1.804-3.614-2.712-5.424-2.712z"
          data-name="Icon material-person"
          transform="translate(7.973 9.409)"
        ></Path>
      </G>
    </Svg>
  );
}

export default ProfleIcon;
