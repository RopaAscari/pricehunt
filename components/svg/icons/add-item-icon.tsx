import React from "react";
import Svg,{ Path,G } from 'react-native-svg'

type Props = {
  width: string | number
  height: string | number
}

function AddIcon(props: Props) {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 28 34"
    >
      <Path
        stroke="#ED4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M17 2H5a3 3 0 00-3 3v24a3 3 0 003 3h18a3 3 0 003-3V11l-9-9z"
      ></Path>
      <Path
        stroke="#ED4E4E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M17 2v9h9M14 26v-9M9.5 21.5h9"
      ></Path>
    </Svg>
  );
}

export default AddIcon;
