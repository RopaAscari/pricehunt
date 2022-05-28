import React from "react";
import Svg, { Path } from "react-native-svg";


type Props = {
    height: number | string,
    width: number | string,
}

function DynamicContent(props: Props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 205 130"
    >
      <Path
        fill="#005BA6"
        d="M216 0H61c83 44 13.5 107.874-61 147.5l216-8.874V0z"
      ></Path>
    </Svg>
  );
}

export default DynamicContent;