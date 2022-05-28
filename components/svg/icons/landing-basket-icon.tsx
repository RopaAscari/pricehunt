import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type Props = {
  style?: any;
  color: string;
  height: number | string;
  width: number | string;
};

export function LandingBasketIcon(props: Props) {
  return (
    <View style={props.style}>
      <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 22 24">
        <Path
          fill={props.color}
          fillRule="evenodd"
          d="M10.88 0C9.231 0 7.65.632 6.484 1.757A5.896 5.896 0 004.663 6v1.5H3.109c-.383 0-.752.136-1.037.382a1.483 1.483 0 00-.508.953l-1.555 13.5a1.45 1.45 0 00.065.623c.067.2.177.386.322.543.146.157.325.282.524.368.2.087.416.131.634.131h18.652c.218 0 .434-.044.634-.13.2-.087.378-.212.524-.37a1.49 1.49 0 00.322-.542c.067-.201.089-.413.065-.623l-1.555-13.5a1.483 1.483 0 00-.508-.953 1.587 1.587 0 00-1.037-.382h-1.554V6a5.896 5.896 0 00-1.82-4.243A6.333 6.333 0 0010.88 0zm3.109 7.5V6c0-.796-.328-1.559-.91-2.121A3.167 3.167 0 0010.88 3c-.824 0-1.615.316-2.198.879A2.948 2.948 0 007.772 6v1.5h6.217zM4.663 12c0-.398.164-.78.455-1.06.292-.282.687-.44 1.1-.44.411 0 .807.158 1.098.44.292.28.456.662.456 1.06s-.164.78-.456 1.06c-.291.282-.687.44-1.099.44-.412 0-.807-.158-1.099-.44A1.474 1.474 0 014.663 12zm10.88-1.5c-.412 0-.808.158-1.1.44A1.474 1.474 0 0013.99 12c0 .398.163.78.455 1.06.291.282.687.44 1.099.44.412 0 .808-.158 1.099-.44.291-.28.455-.662.455-1.06s-.164-.78-.455-1.06a1.583 1.583 0 00-1.1-.44z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  );
}

export default LandingBasketIcon;
