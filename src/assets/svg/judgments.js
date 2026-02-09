import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Judgment = ({ stroke = "currentColor", strokeWidth = 1.66667, ...props }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.0829 10.416L5.4162 17.0827C5.08468 17.4142 4.63505 17.6004 4.1662 17.6004C3.69736 17.6004 3.24772 17.4142 2.9162 17.0827C2.58468 16.7512 2.39844 16.3015 2.39844 15.8327C2.39844 15.3638 2.58468 14.9142 2.9162 14.5827L9.58287 7.91602"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.333 13.334L18.333 8.33398"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.66699 6.66602L11.667 1.66602"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 5.83398L14.1667 12.5007"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.4997 9.16667L10.833 2.5"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Judgment;
