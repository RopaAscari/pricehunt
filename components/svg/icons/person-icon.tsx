import React from "react";
import {View} from 'react-native';
import Svg, { Path } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    style: any
    width: number
    height: number
    color?: string
  }

function PersonIcon(props: Props) {
  return (
    <Svg
      //xmlns="http://www.w3.org/2000/svg"
      width={wp(props.width)}
      height={hp(props.height)}
      fill="none"
      viewBox="0 0 13 13"
    >
      <Path
        fill="#5A5A5A"
        fillRule="evenodd"
        d="M1.188 12.875s-1.063 0-1.063-1.063c0-1.062 1.063-4.25 6.375-4.25 5.313 0 6.375 3.188 6.375 4.25 0 1.063-1.063 1.063-1.063 1.063H1.188zM6.5 6.5a3.187 3.187 0 100-6.375 3.187 3.187 0 000 6.375z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default PersonIcon;
