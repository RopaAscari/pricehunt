import React from 'react'
import Svg,{Path,G} from 'react-native-svg'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {
  height: number | string,
  width: number | string
}

function MenuBar() {
  return (
    <Svg
     // xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="7"
      viewBox="0 0 56 7"
    >
      <G fill="#d4d4d4" data-name="Path 111">
        <Path d="M53 6.5H3A2.503 2.503 0 01.5 4V3C.5 1.622 1.622.5 3 .5h50c1.379 0 2.5 1.122 2.5 2.5v1c0 1.378-1.121 2.5-2.5 2.5z"></Path>
        <Path d="M3 1c-1.103 0-2 .897-2 2v1c0 1.103.897 2 2 2h50c1.103 0 2-.897 2-2V3c0-1.103-.897-2-2-2H3m0-1h50a3 3 0 013 3v1a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3z"></Path>
      </G>
    </Svg>
  );
}

export default MenuBar;