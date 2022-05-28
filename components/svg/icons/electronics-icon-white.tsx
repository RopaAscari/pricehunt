import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}

function ElectronicIconWhite(props: Props) {
  return (
    <Svg
  //    xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 23 23"
    >
      <Path
        fill="white"
        d="M14.465 20.305v1.123c0 .867.705 1.572 1.572 1.572h5.39c.868 0 1.573-.705 1.573-1.572v-1.123h-8.535zM23 18.957v-8.31c0-.868-.705-1.573-1.572-1.573h-5.39c-.868 0-1.573.705-1.573 1.572v8.311H23z"
      ></Path>
      <Path
        fill="white"
        d="M16.037 7.727s5.541-.006 5.615 0v-.764c0-.867-.705-1.572-1.572-1.572h-8.086c-.867 0-1.572.705-1.572 1.572v11.006h2.695v-7.323c0-1.61 1.31-2.92 2.92-2.92zM13.117 19.316h-2.695v1.123c0 .867.705 1.573 1.572 1.573h1.182a2.92 2.92 0 01-.059-.584v-2.112z"
      ></Path>
      <Path
        fill="white"
        d="M11.994 4.043h8.086c.398 0 .777.08 1.123.225V2.47A2.473 2.473 0 0018.733 0H2.47A2.473 2.473 0 000 2.47v7.862h9.074v-3.37c0-1.61 1.31-2.919 2.92-2.919zM0 11.68v.224a2.473 2.473 0 002.47 2.471h6.604V11.68H0zM9.074 15.723H7.421l-.9 2.696c-1.099.02-1.984.916-1.984 2.02 0 .373.302.674.674.674h3.863"
      ></Path>
    </Svg>
  );
}

export default ElectronicIconWhite;
