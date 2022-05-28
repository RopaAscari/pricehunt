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

function LockIcon(props: Props) {
  return (
    <View style={props.style}>
        <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={wp(props.width)}
        height={hp(props.height)}
        fill="none"
        viewBox="0 0 17 17"
        >
        <Path
            fill={props.color}
            d="M12.75 5.667h-.708V4.25A3.543 3.543 0 008.5.708 3.543 3.543 0 004.958 4.25v1.417H4.25a1.42 1.42 0 00-1.417 1.416v7.084c0 .779.638 1.416 1.417 1.416h8.5a1.42 1.42 0 001.417-1.416V7.083a1.42 1.42 0 00-1.417-1.416zM6.375 4.25c0-1.176.95-2.125 2.125-2.125 1.176 0 2.125.95 2.125 2.125v1.417h-4.25V4.25zm6.375 9.917h-8.5V7.083h8.5v7.084zM8.5 12.042a1.42 1.42 0 001.417-1.417A1.42 1.42 0 008.5 9.208a1.42 1.42 0 00-1.417 1.417c0 .78.638 1.417 1.417 1.417z"
        ></Path>
        </Svg>
    </View>
  );
}

export default LockIcon;
