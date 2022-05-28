import React from "react";
import { View } from "react-native";
import Svg, { Path, Ellipse, Circle } from "react-native-svg";

type Props = {
  style: any
  height: number | string,
  width: number | string,
}

export function OfflineIcon(props: Props) {
  return (
    <View style={props.style}>
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 52 50"
    >
      <Ellipse cx="26" cy="25" fill="#fff" rx="26" ry="25"></Ellipse>
      <Circle cx="26" cy="25" r="18" fill="#FFBF00"></Circle>
    </Svg>
    </View>
  );
}

export default OfflineIcon;