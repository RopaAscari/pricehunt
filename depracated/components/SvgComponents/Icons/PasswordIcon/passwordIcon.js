import React from "react";
import Svg, { Path } from "react-native-svg";

function PasswordIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 15 15"
    >
      <Path
        fill="#ff8d8d"
        d="M15 5.156a5.159 5.159 0 01-6.118 5.066l-.7.791a.7.7 0 01-.526.236H6.563v1.172a.7.7 0 01-.7.7H4.688V14.3a.7.7 0 01-.7.7H.7a.7.7 0 01-.7-.7v-2.29a.7.7 0 01.206-.5l4.74-4.74A5.157 5.157 0 1115 5.156zM9.844 3.75a1.406 1.406 0 101.406-1.406A1.406 1.406 0 009.844 3.75z"
        data-name="Icon awesome-key"
      ></Path>
    </Svg>
  );
}

export default PasswordIcon;
