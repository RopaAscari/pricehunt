import React from "react";
import Svg, { Path,G } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function SignUpSvg() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={hp('43%')}
      height={hp('60%')}
      viewBox="0 0 366.376 467.881"
    >
      <G
        data-name="Group 53"
        filter="url(#Path_60)"
        transform="translate(4.376 -155.163) translate(-4.38 155.16)"
      >
        <Path
          fill="#fff"
          d="M0-47.837S-6.746-29.2 36.879-11.847 174.5 0 174.5 0a167.5 167.5 0 010 335s-86.758-.6-130.383 11.458S0 396.044 0 396.044V-47.837z"
          data-name="Path 60"
          transform="translate(4.38 51.84)"
        ></Path>
      </G>
    </Svg>
  );
}

export default SignUpSvg;
