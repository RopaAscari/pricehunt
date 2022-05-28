import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type Props = {
  style?: any;
  color: string;
  height: number | string;
  width: number | string;
};

export function LandingHomeIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 24 24">
        <Path
          fill={props.color}
          d="M1.19 7.952l8.894-6.645a2.963 2.963 0 013.515-.024l9.18 6.67A2.963 2.963 0 0124 10.35v10.687A2.963 2.963 0 0121.037 24h-2.691a2.963 2.963 0 01-2.963-2.963v-3.068a2.963 2.963 0 00-2.963-2.963H11.4a2.963 2.963 0 00-2.963 2.963v3.068A2.963 2.963 0 015.474 24H2.963A2.963 2.963 0 010 21.037V10.326C0 9.39.44 8.51 1.19 7.952z"
        />
      </Svg>
    </View>
  );
}

export default LandingHomeIcon;
