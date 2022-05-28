import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function MerhantIcon(props: Props) {
  return (
    <Svg
      //xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 19 15"
    >
      <Path
        fill="#E9BE39"
        d="M9.142 10.975H3.656V6.403h-1.83v7.314a.913.913 0 00.916.915h7.314a.913.913 0 00.915-.915V6.403H9.14v4.572zm8.986-6.91L15.694.403a.92.92 0 00-.766-.4H3.352a.91.91 0 00-.76.4L.155 4.065a.915.915 0 00.76 1.424H17.37a.916.916 0 00.757-1.424zm-3.502 10.11a.459.459 0 00.457.457h.912a.458.458 0 00.457-.457V6.403h-1.824l-.002 7.772z"
      ></Path>
    </Svg>
  );
}

export default MerhantIcon;
