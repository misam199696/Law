import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SwitchSVG = (props) => (
  <Svg
    width={14}
    height={17}
    viewBox="0 0 14 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 1L13 3.5L11 6"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 16L1 13.5L4 11"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 8V6.66667C1 5.95942 1.28095 5.28115 1.78105 4.78105C2.28115 4.28095 2.95942 4 3.66667 4H13"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 9V10.3333C13 11.0406 12.719 11.7189 12.219 12.219C11.7189 12.719 11.0406 13 10.3333 13H1"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SwitchSVG;
