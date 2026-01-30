import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const Graph = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5"
      stroke="url(#paint0_linear_2760_3037)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 3.5H11V6.5"
      stroke="url(#paint1_linear_2760_3037)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_3037"
        x1={-7.87532}
        y1={6.01025}
        x2={10.2009}
        y2={8.96031}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2760_3037"
        x1={5.3374}
        y1={5.00615}
        x2={10.8679}
        y2={5.45744}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Graph;
