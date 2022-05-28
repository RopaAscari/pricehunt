import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}

function SettingsBackArrow(props: Props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 19 19">
      <Circle cx="9.5" cy="9.5" r="9.5" fill="#fff"></Circle>
      <Path
        stroke="#EB3A31"
        strokeLinecap="round"
        d="M11 6L7.86 8.747a1 1 0 000 1.506L11 13"
      ></Path>
    </Svg>
  );
}

export default SettingsBackArrow;
