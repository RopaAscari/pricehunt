import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}

function HelpIcon(props: Props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 19 19"
    >
      <Path
        fill="#5C5C5C"
        d="M9.5 3.8a3.742 3.742 0 00-3.737 3.737h1.9A1.84 1.84 0 019.5 5.7a1.84 1.84 0 011.837 1.837c0 .568-.457.98-1.155 1.545a8.744 8.744 0 00-.656.57c-.948.946-.976 1.952-.976 2.064v.634h1.9l-.001-.601c.001-.016.031-.367.419-.754.143-.142.322-.285.508-.435.74-.6 1.86-1.505 1.86-3.023A3.74 3.74 0 009.5 3.8zm-.95 9.5h1.9v1.9h-1.9v-1.9z"
      ></Path>
      <Path
        fill="#5C5C5C"
        d="M9.5 0C4.262 0 0 4.262 0 9.5S4.262 19 9.5 19 19 14.738 19 9.5 14.738 0 9.5 0zm0 17.1c-4.19 0-7.6-3.41-7.6-7.6 0-4.19 3.41-7.6 7.6-7.6 4.19 0 7.6 3.41 7.6 7.6 0 4.19-3.41 7.6-7.6 7.6z"
      ></Path>
    </Svg>
  );
}

export default HelpIcon;
