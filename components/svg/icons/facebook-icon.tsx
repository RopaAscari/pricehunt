import React from "react";
import Svg, { Path } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    height: number
    width: number
}

function FacebookIcon(props: Props) {
  return (
    <Svg
      width={wp(props.width)}
      height={hp(props.height)}
      fill="none"
      viewBox="0 0 9 18"
    >
      <Path
        fill="#fff"
        d="M5.008 18a.45.45 0 00.45-.45v-7.297a.45.45 0 01.45-.45h1.638a.45.45 0 00.447-.399l.266-2.31a.45.45 0 00-.447-.5H5.908a.45.45 0 01-.45-.45V4.548c0-.926.233-1.56 1.429-1.56h1.065a.45.45 0 00.45-.45V.527c0-.228-.17-.42-.397-.443A18.103 18.103 0 006.182 0c-2.2 0-3.71 1.492-3.71 4.232v1.905a.45.45 0 01-.45.45H.45a.45.45 0 00-.45.45v2.31c0 .248.201.45.45.45h1.578a.45.45 0 01.45.45v7.303c0 .248.201.45.45.45h2.08z"
      ></Path>
    </Svg>
  );
}

export default FacebookIcon;
