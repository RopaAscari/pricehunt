import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
  height: number
  width: number
}

function MerchantBackArrowIcon(props: Props) {
return (
  <Svg
    width={wp(props.width)}
    height={hp(props.height)}
      fill="none"
      viewBox="0 0 19 19"
    >
      <Circle cx="9.5" cy="9.5" r="9.5" fill="#fff"></Circle>
      <Path
        stroke="#FF4C52"
        strokeLinecap="round"
        d="M11 6L7.86 8.747a1 1 0 000 1.506L11 13"
      ></Path>
    </Svg>
  );
}

export default MerchantBackArrowIcon;
