import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    height: number | string,
    width: number | string
}

export function PinkMenuIcon(props: Props) {
  return (
    <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 22 14"
    >
    <Path
        fill="#F85252"
        d="M17.286 0H1.57a1.571 1.571 0 100 3.143h15.715a1.571 1.571 0 100-3.143zM20.114 5.029H1.886a1.886 1.886 0 000 3.771h18.228a1.886 1.886 0 000-3.771zM17.286 10.686H1.57a1.571 1.571 0 100 3.143h15.715a1.571 1.571 0 100-3.143z"
      ></Path>
    </Svg>
  );
}

