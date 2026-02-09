import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Voice = ({ stroke = "currentColor", strokeWidth = 1.66667, ...props }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 1.66602C9.33696 1.66602 8.70107 1.92941 8.23223 2.39825C7.76339 2.86709 7.5 3.50297 7.5 4.16602V9.99935C7.5 10.6624 7.76339 11.2983 8.23223 11.7671C8.70107 12.236 9.33696 12.4993 10 12.4993C10.663 12.4993 11.2989 12.236 11.7678 11.7671C12.2366 11.2983 12.5 10.6624 12.5 9.99935V4.16602C12.5 3.50297 12.2366 2.86709 11.7678 2.39825C11.2989 1.92941 10.663 1.66602 10 1.66602Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8337 8.33398V10.0007C15.8337 11.5477 15.2191 13.0315 14.1251 14.1254C13.0312 15.2194 11.5474 15.834 10.0003 15.834C8.45323 15.834 6.9695 15.2194 5.87554 14.1254C4.78157 13.0315 4.16699 11.5477 4.16699 10.0007V8.33398"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 15.834V18.334"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Voice;
