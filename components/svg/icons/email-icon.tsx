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

function EmailIcon(props: Props) {
  return (
      <View style={props.style}>
        <Svg
        //xmlns="http://www.w3.org/2000/svg"
        width={wp(props.width)}
        height={hp(props.height)}
        fill="none"
        viewBox="0 0 17 17"
        >
        <Path
            fill={props.color}
            d="M14.167 2.833H2.833c-.779 0-1.41.638-1.41 1.417l-.006 8.5c0 .78.637 1.417 1.416 1.417h11.334a1.42 1.42 0 001.416-1.417v-8.5a1.42 1.42 0 00-1.416-1.417zm0 9.917H2.833V5.667L8.5 9.208l5.667-3.541v7.083zM8.5 7.792L2.833 4.25h11.334L8.5 7.792z"
        ></Path>
        </Svg>
    </View>
  );
}

export default EmailIcon;
