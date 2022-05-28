import React from 'react'
import Svg,{Path,G} from 'react-native-svg'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MenuBar() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={hp('48%')}
      height={hp('25.5%')}
      viewBox="0 0 423.067 173.484"
    >
      <G data-name="Group 158" transform="translate(7 -626.508)">
        <Path
          fill="rgba(248,82,82,0.85)"
          d="M422.771 504.491s-64.5 17.412-94.035 50.722-170.2-26.5-153.1 17.412c14.293 36.707-17.768 58.535-61.677 75.568S0 621.33 0 621.33v52.362h422.771z"
          data-name="Path 48"
          transform="translate(-7 122.017)"
        ></Path>
        <Path
          fill="rgba(248,82,82,0.55)"
          d="M399.99 504.491s-61.028 16.093-88.968 46.879S150 526.881 166.172 567.463c13.523 33.926-45.036 75.3-96.321 79.764S0 630.434 0 630.434v30.436h399.99z"
          data-name="Path 47"
          transform="translate(15.775 135.13)"
        ></Path>
        <G data-name="Group 157" transform="translate(41 -12)">
          <Path
            fill="#f85252"
            d="M375.446 504.491s-57.283 15.283-83.509 44.521-151.145-23.257-135.961 15.283c12.693 32.219-42.272 71.515-90.411 75.751S0 624.1 0 624.1V653h375.446z"
            data-name="Path 46"
            transform="translate(-.38 158.988)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}

export default MenuBar;