import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Upload = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 25V8.33337"
      stroke="#14B8A6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3333 16.6667L20 8.33337L26.6667 16.6667"
      stroke="#14B8A6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M31.6667 25V31.6667C31.6667 32.5872 30.9121 33.3334 30 33.3334H10C9.08791 33.3334 8.33333 32.5872 8.33333 31.6667V25"
      stroke="#14B8A6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Upload;
