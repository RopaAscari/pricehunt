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

function LightModeIcon(props: Props) {
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
          d="M11.12 4.58A6.527 6.527 0 01.723 9.839L9.85.712a6.512 6.512 0 011.27 3.869zm-5.222 7.81l3.287-1.366L8.9 15l-3.002-2.61zm5.138-3.205l1.365-3.287 2.61 3.014-3.975.273zM12.401 3.3L11.048 0l3.964.285-2.61 3.014zM0 11.025l3.287 1.364-3.002 2.6L0 11.023z"
        />
      </Svg>
    </View>
  );
}

export default LightModeIcon;
