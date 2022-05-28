import React from "react";
import { View } from "react-native";
import Svg, { Path, Rect,Defs } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function HeartIconFilled(props: Props) {
    return (
        <View style={props.style}>
        <Svg
          width={props.width}
          height={props.height}
          fill="none"
          viewBox="0 0 16 14"
        >
          <Path
            fill="#fff"
            stroke="#F04F4F"
            strokeWidth="0.499"
            d="M1.995.25h11.471c.964 0 1.746.78 1.746 1.745v9.476c0 .964-.782 1.746-1.746 1.746H1.995A1.746 1.746 0 01.249 11.47V1.995c0-.964.782-1.746 1.746-1.746z"
          ></Path>
          <Path
            fill="#E94D4D"
            d="M8 10l-.435-.432C6.02 8.041 5 7.034 5 5.798a1.922 1.922 0 01.121-.69 1.8 1.8 0 01.357-.586c.154-.168.337-.3.538-.39.201-.09.417-.134.634-.132.256.002.51.064.743.182.232.117.44.288.607.5a1.82 1.82 0 01.607-.5c.233-.118.486-.18.742-.182.218-.002.433.042.635.132.2.09.384.222.537.39a1.8 1.8 0 01.358.585c.082.22.123.455.12.691C11 7.034 9.98 8.041 8.436 9.57L8 10z"
          ></Path>
        </Svg>
        </View>
  );
}

export default HeartIconFilled;
