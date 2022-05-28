import React from "react";
import Svg, { Path } from "react-native-svg";

function UsernameIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 17.5 17.5"
    >
      <Path
        fill="#ff8d8d"
        d="M14.75 14.75a4.375 4.375 0 10-4.375-4.375 4.374 4.374 0 004.375 4.375zm0 2.188C11.83 16.938 6 18.4 6 21.312V23.5h17.5v-2.188c0-2.912-5.83-4.374-8.75-4.374z"
        data-name="Icon material-person"
        transform="translate(-6 -6)"
      ></Path>
    </Svg>
  );
}

export default UsernameIcon;