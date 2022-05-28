import React from "react";
import { View } from 'react-native'
import Svg, { Path, Rect, Circle } from "react-native-svg";

type Props = {
    style?: any
    iconColor?: any
    height: number | string,
    width: number | string
}


function DownArrowIcon(props: Props) {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 15 15"
    >
      <Circle
        r="7.5"
        fill="#F85252"
        transform="matrix(1 0 0 -1 7.5 7.5)"
      ></Circle>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="0.789"
        d="M3.947 6.316L7.5 9.474l3.553-3.158"
      ></Path>
    </Svg>
  );
}

export default DownArrowIcon;
