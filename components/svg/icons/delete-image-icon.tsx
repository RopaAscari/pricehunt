import React from 'react';
import { View } from 'react-native';
import Svg, { Path , Circle} from 'react-native-svg';

type Props = {
  style?: any;
  height: number | string;
  width: number | string;
};

function DeleteImageIcon(props: Props) {
  return (
      <View style={props.style}>
   <Svg
     // xmlns="http://www.w3.org/2000/svg"
     width={props.width}
     height={props.height}
      fill="none"
      viewBox="0 0 16 16"
    >
      <Circle cx="8" cy="8" r="8" fill="red"></Circle>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
        d="M6 6l4 4M10 6l-4 4"
      ></Path>
    </Svg>
    </View>
  );
}

export default DeleteImageIcon;
