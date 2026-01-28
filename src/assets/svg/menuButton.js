import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const MenuButton = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21 10H3"
      stroke="url(#paint0_linear_1729_16399)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 6H3"
      stroke="url(#paint1_linear_1729_16399)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 14H3"
      stroke="url(#paint2_linear_1729_16399)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 18H3"
      stroke="url(#paint3_linear_1729_16399)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1729_16399"
        x1={-12.9756}
        y1={10.502}
        x2={-2.39608}
        y2={26.0414}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_1729_16399"
        x1={-12.9756}
        y1={6.50205}
        x2={-2.39608}
        y2={22.0414}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_1729_16399"
        x1={-12.9756}
        y1={14.502}
        x2={-2.39608}
        y2={30.0414}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_1729_16399"
        x1={-12.9756}
        y1={18.502}
        x2={-2.39608}
        y2={34.0414}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default MenuButton;
