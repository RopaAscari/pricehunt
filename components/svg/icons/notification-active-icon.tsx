import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  height: number | string,
  width: number | string
}

export function NotifcationActionIcon(props: Props) {
return (
  <Svg
    width={props.width}
    height={props.height}
      fill="none"
      viewBox="0 0 30 30"
    >
      <Path
        fill="#FF4C52"
        d="M22.5 10a7.5 7.5 0 00-15 0c0 8.75-3.75 11.25-3.75 11.25h22.5S22.5 18.75 22.5 10z"
      ></Path>
      <Path
        stroke="#E3E3E3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.162 26.25a2.5 2.5 0 01-4.325 0"
      ></Path>
      <Path
        fill="#FFD03F"
        stroke="#fff"
        d="M26.592 5.873a4.465 4.465 0 11-8.93 0 4.465 4.465 0 018.93 0z"
      ></Path>
    </Svg>
  );
}

export default NotifcationActionIcon;
