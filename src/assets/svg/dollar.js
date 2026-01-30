import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
const Dollar = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2760_3065)">
      <Rect width={30} height={30} rx={8} fill="white" />
      <Rect width={40} height={40} fill="url(#paint0_linear_2760_3065)" />
      <Path
        d="M15 5V25"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 8H12.5C11.5717 8 10.6815 8.36875 10.0251 9.02513C9.36875 9.6815 9 10.5717 9 11.5C9 12.4283 9.36875 13.3185 10.0251 13.9749C10.6815 14.6313 11.5717 15 12.5 15H17.5C18.4283 15 19.3185 15.3687 19.9749 16.0251C20.6313 16.6815 21 17.5717 21 18.5C21 19.4283 20.6313 20.3185 19.9749 20.9749C19.3185 21.6313 18.4283 22 17.5 22H9"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_3065"
        x1={-35.5013}
        y1={20.082}
        x2={38.2385}
        y2={26.0992}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <ClipPath id="clip0_2760_3065">
        <Rect width={30} height={30} rx={8} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Dollar;
