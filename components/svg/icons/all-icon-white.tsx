import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function AllIconWhite(props: Props) {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 18 12"
    >
      <Path
        fill="white"
        d="M7.89 9.065H3.624L2.73 11.63H.74L4.902.612h1.717l4.17 11.018H8.79l-.9-2.565zM4.16 7.52h3.193l-1.596-4.57L4.16 7.52zm9.663 4.109h-1.839V.007h1.84V11.63zm3.965 0H15.95V.007h1.84V11.63z"
      ></Path>
    </Svg>
  );
}

export default AllIconWhite;
