import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

type Props = {
  style: any;
  height: number | string;
  width: number | string;
};

export function LandingArrowIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        //xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 14 14">
        <Circle r="7" fill="#FF4C52" transform="matrix(-1 0 0 1 7 7)" />
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="0.737"
          d="M5.895 4.421l2.313 2.025a.737.737 0 010 1.109L5.895 9.579"
        />
      </Svg>
    </View>
  );
}

export default LandingArrowIcon;
