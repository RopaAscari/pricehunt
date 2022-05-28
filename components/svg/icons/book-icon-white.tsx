import React from "react";
import Svg, { Path, Rect,Defs } from "react-native-svg";

type Props = {
    style?: any
    height: number | string,
    width: number | string
}


function BookIconWhite(props: Props) {
    return (
        <Svg
          width={props.width}
          height={props.height}
          fill="none"
          viewBox="0 0 23 22"
        >
          <Path
            fill="white"
            d="M22.644 4.834c.368.525.45 1.119.248 1.782l-3.798 12.512c-.175.59-.527 1.084-1.056 1.485-.53.4-1.094.6-1.692.6H3.598c-.709 0-1.393-.245-2.05-.738-.66-.493-1.117-1.098-1.375-1.816-.221-.617-.23-1.202-.028-1.754 0-.037.014-.161.042-.373a9.23 9.23 0 00.055-.511.768.768 0 00-.041-.297.684.684 0 01-.042-.27.859.859 0 01.11-.29c.056-.091.132-.2.228-.324.097-.124.173-.232.228-.325.212-.35.42-.77.622-1.263.202-.493.34-.914.414-1.264.028-.092.03-.23.007-.414-.023-.184-.025-.313-.007-.387.028-.101.106-.23.235-.387.129-.156.207-.262.235-.317.193-.332.387-.755.58-1.271.193-.516.308-.93.345-1.243.01-.083-.002-.23-.034-.442-.033-.212-.03-.34.007-.387.036-.12.138-.26.303-.42.166-.162.267-.266.304-.312.175-.24.37-.628.587-1.167.217-.538.343-.983.38-1.332a1.143 1.143 0 00-.041-.353c-.037-.16-.046-.283-.028-.366a.78.78 0 01.124-.248c.065-.092.148-.198.249-.318s.18-.216.235-.29c.073-.11.15-.25.227-.421a9.53 9.53 0 00.208-.484c.06-.151.133-.317.22-.497.088-.18.178-.327.27-.442.092-.115.214-.223.366-.324a.922.922 0 01.497-.16c.18-.004.398.022.656.077l-.014.041C8.022.041 8.257 0 8.377 0h10.51c.681 0 1.206.258 1.574.773.369.516.452 1.115.249 1.796l-3.784 12.513c-.332 1.095-.66 1.802-.988 2.12-.327.317-.918.476-1.774.476H2.162c-.249 0-.424.07-.525.207-.101.148-.106.346-.014.594.221.645.884.967 1.989.967H16.36c.267 0 .524-.071.773-.214.249-.143.41-.334.483-.573L21.76 5.027c.064-.202.087-.465.069-.787.35.138.621.336.815.594zm-14.695.028c-.037.12-.028.223.027.31.055.088.148.131.276.131h8.398c.12 0 .237-.043.352-.13a.617.617 0 00.228-.311l.29-.884c.037-.12.027-.224-.028-.311-.055-.088-.147-.131-.276-.131H8.819a.578.578 0 00-.353.13.617.617 0 00-.227.312l-.29.884zM6.802 8.396c-.037.12-.027.223.028.31.055.088.147.132.276.132h8.397c.12 0 .237-.044.352-.131a.617.617 0 00.228-.31l.29-.885c.037-.12.028-.223-.027-.31-.055-.088-.148-.132-.276-.132H7.672a.578.578 0 00-.352.131.617.617 0 00-.228.311l-.29.884z"
          ></Path>
        </Svg>
      );
}

export default BookIconWhite;
