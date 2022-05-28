import * as React from "react";
import Svg, { Path,G } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MainSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={hp('13%')}
      height={hp('14%')}
      viewBox="0 0 134.461 146.479"
    >
      <G data-name="Group 157" transform="translate(-244.822 -.367)">
        <G data-name="Component 2 – 1" transform="translate(244.822 .367)">
          <Path
            fill="#fff"
            d="M624.873-20c.846 8.656-5.92 45.02 32.135 69.544s53.277 41.438 62.579 62.579 39.746 12.685 39.746 12.685V-20z"
            data-name="Path 63"
            transform="translate(-624.873 20)"
          ></Path>
        </G>
        <Path
          fill="#f85252"
          d="M718.891 16.2s28.349-28.117 45.024-14.885-5 21.5 8.338 34.733-10.005 33.08-23.346 23.152-33.351 0-38.354-13.232 8.338-29.768 8.338-29.768z"
          data-name="Path 64"
          transform="translate(-415 17)"
        ></Path>
      </G>
    </Svg>
  );
}

export default MainSvg;
