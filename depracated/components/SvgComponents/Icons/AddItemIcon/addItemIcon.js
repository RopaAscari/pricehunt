import React from "react";
import Svg,{Path,G} from 'react-native-svg'
function AddIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="49"
      viewBox="0 0 27 33"
    >
      <G
        fill="none"
        stroke="#ed4e4e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        data-name="Icon feather-file-plus"
        transform="translate(-4.5 -1.5)"
      >
        <Path
          d="M21 3H9a3 3 0 00-3 3v24a3 3 0 003 3h18a3 3 0 003-3V12z"
          data-name="Path 74"
        ></Path>
        <Path d="M21 3v9h9" data-name="Path 75"></Path>
        <Path d="M18 27v-9" data-name="Path 76"></Path>
        <Path d="M13.5 22.5h9" data-name="Path 77"></Path>
      </G>
    </Svg>
  );
}

export default AddIcon;
