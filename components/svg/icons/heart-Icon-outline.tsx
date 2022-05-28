import React from "react";
import { View } from "react-native";
import Svg, { Path, Rect, } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function HeartIconOutline(props: Props) {
    return (
        <View style={props.style}>
        <Svg
          width={props.width}
          height={props.height}
      fill="none"
      viewBox="0 0 17 14"
    >
      <Rect
        width="14.962"
        height="12.967"
        x="0.986"
        y="0.302"
        fill="#fff"
        stroke="#F04F4F"
        strokeWidth="0.499"
        rx="1.746"
      ></Rect>
      <Path
        fill="#F04F4F"
        d="M8.288 8.715l-.03.03-.032-.03c-1.39-1.27-2.308-2.109-2.308-2.96 0-.59.44-1.031 1.024-1.031.45 0 .89.294 1.044.695h.544c.156-.4.594-.695 1.045-.695.585 0 1.024.442 1.024 1.03 0 .852-.919 1.692-2.311 2.961zm1.287-4.58c-.51 0-.998.238-1.317.612a1.754 1.754 0 00-1.316-.612c-.9 0-1.609.71-1.609 1.62 0 1.11.995 2.02 2.501 3.396l.424.389.425-.389c1.506-1.376 2.5-2.286 2.5-3.396 0-.91-.707-1.62-1.608-1.62z"
      ></Path>
    </Svg>
    </View>
  );
}

export default HeartIconOutline;
