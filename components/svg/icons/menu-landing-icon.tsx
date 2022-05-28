import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type Props = {
    height: number | string,
    width: number | string
}

export function MenuLandingIcon(props: Props) {
    return(
        <Svg
        width={props.width}
        height={props.height}
      data-name="Group 3"
      viewBox="0 0 37 22"
    >
      <Rect
        width="37"
        height="5"
        fill="#FF4C52"
        data-name="Rectangle 33"
        rx="2.5"
      ></Rect>
      <Rect
        width="31"
        height="6"
        fill="#FF4C52"
        data-name="Rectangle 34"
        rx="3"
        transform="translate(0 8)"
      ></Rect>
      <Path
        fill="#FF4C52"
        d="M2.082 0H22.9a2.32 2.32 0 012.082 2.5A2.32 2.32 0 0122.9 5H2.082A2.32 2.32 0 010 2.5 2.32 2.32 0 012.082 0z"
        data-name="Path 111"
        transform="translate(0 17)"
      ></Path>
    </Svg>
  );
}

export default MenuLandingIcon;