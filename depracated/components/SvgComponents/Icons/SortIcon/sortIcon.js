import React from "react";
import Svg,{Path,G,Rect,Text,TSpan} from 'react-native-svg'

function SortIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="9"
      viewBox="0 0 26 9"
    >
      <G data-name="Group 106" transform="translate(-311 -181)">
        <Rect
          width="26"
          height="9"
          fill="#efb926"
          data-name="Rectangle 46"
          rx="4.5"
          transform="translate(311 181)"
        ></Rect>
        <Text
          fill="#343434"
          fontFamily="SegoeUI-SemiboldItalic, Segoe UI"
          fontSize="5"
          fontStyle="italic"
          fontWeight="600"
          transform="translate(327 187)"
        >
          <TSpan x="0" y="0">
            off
          </TSpan>
        </Text>
        <Text
          fill="#343434"
          fontFamily="SegoeUI-SemiboldItalic, Segoe UI"
          fontSize="5"
          fontStyle="italic"
          fontWeight="600"
          transform="translate(315 187)"
        >
          <TSpan x="0" y="0">
            on
          </TSpan>
        </Text>
        <G fill="#fff" data-name="Path 77">
          <Path
            d="M11 8.5H4C2.07 8.5.5 6.93.5 5V4C.5 2.07 2.07.5 4 .5h7c1.93 0 3.5 1.57 3.5 3.5v1c0 1.93-1.57 3.5-3.5 3.5z"
            transform="translate(311 181)"
          ></Path>
          <Path
            fill="#efb926"
            d="M4 1C2.346 1 1 2.346 1 4v1c0 1.654 1.346 3 3 3h7c1.654 0 3-1.346 3-3V4c0-1.654-1.346-3-3-3H4m0-1h7a4 4 0 014 4v1a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4z"
            transform="translate(311 181)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}

export default SortIcon;