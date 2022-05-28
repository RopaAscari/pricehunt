import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  height: number | string,
  width: number | string
}

export function LandingMenuIcon(props: Props) {
return (
  <Svg
    //xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
      fill="none"
      viewBox="0 0 27 15"
    >
      <Path
        stroke="#FF4C52"
        strokeLinecap="round"
        strokeWidth="4"
        d="M2 2h23M2 7.351h20.738M2 13h18.475"
      ></Path>
    </Svg>
  );
}

export default LandingMenuIcon;