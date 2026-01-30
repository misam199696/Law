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
const Camera = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2760_2931)">
      <Path
        d="M15.3333 12.6667C15.3333 13.0203 15.1928 13.3594 14.9428 13.6095C14.6927 13.8595 14.3536 14 14 14H1.99996C1.64634 14 1.3072 13.8595 1.05715 13.6095C0.807102 13.3594 0.666626 13.0203 0.666626 12.6667V5.33333C0.666626 4.97971 0.807102 4.64057 1.05715 4.39052C1.3072 4.14048 1.64634 4 1.99996 4H4.66663L5.99996 2H9.99996L11.3333 4H14C14.3536 4 14.6927 4.14048 14.9428 4.39052C15.1928 4.64057 15.3333 4.97971 15.3333 5.33333V12.6667Z"
        stroke="url(#paint0_linear_2760_2931)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.00004 11.3333C9.4728 11.3333 10.6667 10.1394 10.6667 8.66667C10.6667 7.19391 9.4728 6 8.00004 6C6.52728 6 5.33337 7.19391 5.33337 8.66667C5.33337 10.1394 6.52728 11.3333 8.00004 11.3333Z"
        stroke="url(#paint1_linear_2760_2931)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_2931"
        x1={-12.3505}
        y1={8.02459}
        x2={14.5994}
        y2={10.7124}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2760_2931"
        x1={0.599867}
        y1={8.6776}
        x2={10.4318}
        y2={9.47989}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <ClipPath id="clip0_2760_2931">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Camera;
