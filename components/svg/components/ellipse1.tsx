import React from "react";
import {View} from 'react-native';
import Svg, { Path , Circle} from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
    //style: any
   // width: number
   // height: number
  //  color?: string
  }

function Ellipse1(props: Props) {
  return (
    <Svg
      //xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="183"
      fill="none"
      viewBox="0 0 212 183"
    >
      <Circle cy="212" r="212" fill="#C4C4C4" fillOpacity="0.1"></Circle>
    </Svg>
  );
}

export default Ellipse1;
