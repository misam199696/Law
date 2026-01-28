import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LeftArrowBlack = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="black"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LeftArrowBlack;
