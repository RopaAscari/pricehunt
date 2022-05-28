import * as React from "react";
import {Dimensions} from "react-native"
import Svg, { Path } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function SignInSVG(props) {

  console.log(wp('90%'))
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={wp('90%')}
      height={hp('43%')}
      viewBox="0 0 350.901 291.563"
    >
        <Path
          fill="#fff"
          d="M-.041-35.611s-6 11.422 32.821 21.828 122.476 7.1 122.476 7.1c24.616 0 74.473-1.189 95.191 6.017 47.715 16.6 74.627 56.138 74.627 95.012 0 35.769-23.484 73.485-65.526 91.372-22.772 9.689-75.065 8.423-104.292 8.423 0 0-77.21-.362-116.035 6.869s-41.048 30.942-41.048 30.942l1.786-51.614V-35.611z"
          data-name="Path 60"
          transform="translate(5.83 39.61)"
        ></Path>

    </Svg>
  );
}

export default SignInSVG;
