import React from "react";
import Svg, { Path, Rect, } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function CartIcon(props: Props) {
    return (
        <Svg
          width={props.width}
          height={props.height}
      fill="none"
      viewBox="0 0 17 14"
    >
      <Rect
        width="14.962"
        height="12.967"
        x="1.039"
        y="0.302"
        fill="#fff"
        stroke="#F04F4F"
        strokeWidth="0.499"
        rx="1.746"
      ></Rect>
      <Path
        stroke="#F04F4F"
        strokeWidth="0.399"
        d="M10.349 7.097h0a.631.631 0 01-.556.33H6.562l-.057.103-.459.842-.161.295h5.15v.442H6.22c-.48 0-.79-.52-.556-.954 0 0 0 0 0 0l.564-1.026.049-.09-.044-.091-1.503-3.193-.054-.115h-.763v-.442h1.04l.339.726.053.115h6.31a.214.214 0 01.186.108.222.222 0 01.003.219h0l-1.496 2.73zM5.87 4.482h-.314l.134.284.99 2.104.054.114H9.91l.057-.104 1.153-2.103.162-.295H5.87zm-.28 6.089c0-.355.284-.642.631-.642a.641.641 0 010 1.284.638.638 0 01-.632-.642zm4.177 0c0-.355.285-.642.632-.642a.641.641 0 010 1.284.638.638 0 01-.632-.642z"
      ></Path>
    </Svg>
  );
}

export default CartIcon;
