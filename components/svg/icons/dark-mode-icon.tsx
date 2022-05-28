import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  style?: any;
  width: number;
  height: number;
  color?: string;
};

function DarkModeIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={wp(props.width)}
        height={hp(props.height)}
        fill="none"
        viewBox="0 0 16 15">
        <Path
          fill="#5C5C5C"
          d="M7.155.69a8.502 8.502 0 00-3.903 7.155A8.446 8.446 0 007.194 15C3.2 15 0 11.8 0 7.845A7.155 7.155 0 017.155.69zm7.012 5.112l-1.925-1.21-1.873 1.301.546-2.211-1.808-1.38 2.276-.155L12.138 0l.871 2.12 2.251.04-1.756 1.47.663 2.172zM9.874 10.5l-1.509-.95-1.457 1.015.442-1.718-1.418-1.08 1.77-.116.585-1.679.664 1.653 1.769.039-1.366 1.131.52 1.705z"
        />
      </Svg>
    </View>
  );
}

export default DarkModeIcon;
