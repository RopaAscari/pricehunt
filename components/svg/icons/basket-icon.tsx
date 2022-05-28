import React from "react";
import { View,Animated } from 'react-native'
import Svg, { Path } from "react-native-svg";

type Props = {
    style?: any
    color?: any
    height: number | string,
    width: number | string
}


function BasketIcon(props: Props) {
  return (
    <Animated.View style={props.style}>
    <Svg
    //   /xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="white"
      viewBox="0 0 14 15"
    >
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M6.88.532c-.936 0-1.833.358-2.494.994a3.33 3.33 0 00-1.032 2.4v.848h-.882a.901.901 0 00-.588.216.838.838 0 00-.288.539l-.88 7.634a.818.818 0 00.218.66.91.91 0 00.657.282h10.576a.91.91 0 00.657-.283.841.841 0 00.22-.659l-.882-7.634a.838.838 0 00-.288-.539.901.901 0 00-.588-.216h-.882v-.849c0-.9-.371-1.763-1.032-2.399A3.596 3.596 0 006.879.532zm1.762 4.242v-.849c0-.45-.186-.881-.517-1.2A1.798 1.798 0 006.88 2.23c-.467 0-.916.179-1.246.497-.33.318-.517.75-.517 1.2v.848h3.526zM3.354 7.319c0-.225.093-.441.258-.6a.899.899 0 01.623-.249c.234 0 .458.09.623.249.166.159.258.375.258.6 0 .225-.092.44-.258.6a.9.9 0 01-.623.248.9.9 0 01-.623-.249.832.832 0 01-.258-.6zm6.17-.849a.899.899 0 00-.624.249.832.832 0 00-.258.6c0 .225.093.44.258.6a.9.9 0 00.623.248c.234 0 .458-.09.623-.249a.832.832 0 00.258-.6.832.832 0 00-.258-.6.899.899 0 00-.623-.248z"
        clipRule="evenodd"
      ></Path>
    </Svg>
    </Animated.View>
  );
}

export default BasketIcon;
