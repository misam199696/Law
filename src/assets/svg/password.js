import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const Password = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z"
      stroke="url(#paint0_linear_2176_62036)"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.83301 9.16602V5.83268C5.83301 4.72761 6.27199 3.66781 7.0534 2.8864C7.8348 2.105 8.89461 1.66602 9.99967 1.66602C11.1047 1.66602 12.1646 2.105 12.946 2.8864C13.7274 3.66781 14.1663 4.72761 14.1663 5.83268V9.16602"
      stroke="url(#paint1_linear_2176_62036)"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2176_62036"
        x1={-10.813}
        y1={13.7681}
        x2={16.5359}
        y2={17.42}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2176_62036"
        x1={-1.5631}
        y1={5.43138}
        x2={13.7756}
        y2={6.8221}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Password;
