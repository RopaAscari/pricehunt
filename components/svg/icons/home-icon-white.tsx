import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    height: number | string,
    width: number | string
}

export function HomeIconWhite(props: Props) {
  return (
    <Svg
      //xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <Path
        fill="white"
        d="M24.771 10.773l-9.716-9.716a3.618 3.618 0 00-5.11 0L.229 10.773a.781.781 0 001.104 1.105l.62-.62v9.932a2.246 2.246 0 002.246 2.246h3.906c.27 0 .489-.218.489-.488V15.72a2.441 2.441 0 012.441-2.441h2.93a2.441 2.441 0 012.441 2.441v7.227c0 .27.219.488.489.488H20.8a2.246 2.246 0 002.246-2.246v-9.932l.62.62a.78.78 0 001.104 0 .781.781 0 000-1.105z"
      ></Path>
    </Svg>
  );
}

export default HomeIconWhite;
