import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}

function SecurityIcon(props: Props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 20 23"
    >
      <Path
        stroke="#5C5C5C"
        strokeWidth="2"
        d="M7.65 12.45l-1.9 1.9M9.55 21S1 17.2 1 10.55v-5.7L9.55 2l8.55 2.85v5.7C18.1 17.2 9.55 21 9.55 21zm0-7.6a2.85 2.85 0 100-5.7 2.85 2.85 0 000 5.7v0zm0-5.7V4.85 7.7zm0 8.55V13.4v2.85zm-5.7-5.7H6.7 3.85zm8.55 0h2.85-2.85zm-6.65-3.8l1.9 1.9-1.9-1.9zm5.7 5.7l1.9 1.9-1.9-1.9zm1.9-5.7l-1.9 1.9 1.9-1.9z"
      ></Path>
    </Svg>
  );
}

export default SecurityIcon;
