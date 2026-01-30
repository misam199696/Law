import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";
const Calender = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2760_3026)">
      <Path
        d="M4 1V3"
        stroke="url(#paint0_linear_2760_3026)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 1V3"
        stroke="url(#paint1_linear_2760_3026)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 2H2.5C1.94772 2 1.5 2.44772 1.5 3V10C1.5 10.5523 1.94772 11 2.5 11H9.5C10.0523 11 10.5 10.5523 10.5 10V3C10.5 2.44772 10.0523 2 9.5 2Z"
        stroke="url(#paint2_linear_2760_3026)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.5 5H10.5"
        stroke="url(#paint3_linear_2760_3026)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_3026"
        x1={3.11247}
        y1={2.0041}
        x2={4.96515}
        y2={2.07969}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2760_3026"
        x1={7.11247}
        y1={2.0041}
        x2={8.96515}
        y2={2.07969}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2760_3026"
        x1={-6.48779}
        y1={6.51844}
        x2={10.1037}
        y2={7.87232}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_2760_3026"
        x1={-6.48779}
        y1={5.50205}
        x2={4.36217}
        y2={13.4703}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <ClipPath id="clip0_2760_3026">
        <Rect width={12} height={12} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Calender;
