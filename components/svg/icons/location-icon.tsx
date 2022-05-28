import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type Props = {
  style?: any;
  color: string;
  height: number | string;
  width: number | string;
};

export function LocationIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 20 24">
        <Path
          fill={props.color}
          d="M9.6 0C4.307 0 0 4.307 0 9.594-.035 17.328 9.235 23.741 9.6 24c0 0 9.635-6.672 9.6-14.4 0-5.293-4.307-9.6-9.6-9.6zm0 14.4a4.799 4.799 0 01-4.8-4.8c0-2.652 2.148-4.8 4.8-4.8 2.652 0 4.8 2.148 4.8 4.8 0 2.652-2.148 4.8-4.8 4.8z"
        />
      </Svg>
    </View>
  );
}

export default LocationIcon;
