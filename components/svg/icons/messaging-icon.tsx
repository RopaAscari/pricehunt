import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type Props = {
  style?: any;
  color: string;
  height: number | string;
  width: number | string;
};

export function MessagingIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 24 24">
        <Path
          fill={props.color}
          d="M23.017 7.35a11.99 11.99 0 00-2.574-3.838 11.868 11.868 0 00-3.83-2.58A11.89 11.89 0 0011.973 0h-.053A11.92 11.92 0 003.46 3.546 11.92 11.92 0 00.916 7.371 12.05 12.05 0 000 12.056a12.07 12.07 0 001.283 5.355v4.071c0 .68.552 1.232 1.23 1.232h4.066A11.992 11.992 0 0011.922 24h.057c1.602 0 3.153-.31 4.615-.919a11.872 11.872 0 003.817-2.55 11.913 11.913 0 002.58-3.803c.629-1.479.95-3.051.958-4.674a12.05 12.05 0 00-.932-4.704zm-16.39 5.936a1.285 1.285 0 010-2.572 1.285 1.285 0 010 2.572zm5.346 0a1.285 1.285 0 010-2.572 1.285 1.285 0 010 2.572zm5.347 0a1.285 1.285 0 010-2.572 1.285 1.285 0 010 2.572z"
        />
      </Svg>
    </View>
  );
}

export default MessagingIcon;
