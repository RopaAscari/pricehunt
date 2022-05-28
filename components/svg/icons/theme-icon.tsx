import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}

function ThemeIcon(props: Props) {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 19 20"
    >
      <Path
        fill="#5C5C5C"
        d="M5.153.497a6.123 6.123 0 00-2.81 5.152 6.082 6.082 0 002.838 5.153A5.153 5.153 0 115.153.496zm10.84 1.405l1.34 1.34L2.744 17.829l-1.34-1.34L15.993 1.902zm-5.79 2.276l-1.387-.87-1.349.936.393-1.593-1.302-.993 1.64-.112L8.74 0l.628 1.527 1.62.028-1.264 1.059.478 1.564zM7.11 7.561l-1.087-.684-1.05.73.32-1.236-1.022-.778 1.274-.084.422-1.209.478 1.19 1.274.028-.984.815.375 1.228zm8.816 3.71a5.153 5.153 0 01-8.207 4.15l7.205-7.205a5.141 5.141 0 011.002 3.055zm-4.122 6.164l2.595-1.077-.225 3.139-2.37-2.062zm4.056-2.53l1.078-2.594L19 14.69l-3.139.215zm1.078-4.646L15.87 7.654 19 7.88l-2.061 2.38zm-9.79 6.099l2.595 1.077-2.37 2.052-.226-3.129z"
      ></Path>
    </Svg>
  );
}

export default ThemeIcon;
