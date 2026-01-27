import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const Logo = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8C0 3.58172 3.58172 0 8 0H32Z"
      fill="url(#paint0_linear_2347_8720)"
    />
    <Path
      d="M24 24L27 16L30 24C29.13 24.65 28.08 25 27 25C25.92 25 24.87 24.65 24 24Z"
      stroke="#E2E8F0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 24L13 16L16 24C15.13 24.65 14.08 25 13 25C11.92 25 10.87 24.65 10 24Z"
      stroke="#E2E8F0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 29H25"
      stroke="#E2E8F0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 11V29"
      stroke="#E2E8F0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 15H13C15 15 18 14 20 13C22 14 25 15 27 15H29"
      stroke="#E2E8F0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2347_8720"
        x1={-35.5013}
        y1={20.082}
        x2={38.2385}
        y2={26.0992}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Logo;
