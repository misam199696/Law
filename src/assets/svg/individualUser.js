import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const IndividualUser = (props) => (
  <Svg
    width={15}
    height={14}
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.0003 12.666V1.99935C10.0003 1.64573 9.85985 1.30659 9.6098 1.05654C9.35975 0.806491 9.02061 0.666016 8.66699 0.666016H6.00033C5.6467 0.666016 5.30757 0.806491 5.05752 1.05654C4.80747 1.30659 4.66699 1.64573 4.66699 1.99935V12.666"
      stroke="url(#paint0_linear_2674_13768)"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.667 3.33203H2.00033C1.26395 3.33203 0.666992 3.92898 0.666992 4.66536V11.332C0.666992 12.0684 1.26395 12.6654 2.00033 12.6654H12.667C13.4034 12.6654 14.0003 12.0684 14.0003 11.332V4.66536C14.0003 3.92898 13.4034 3.33203 12.667 3.33203Z"
      stroke="url(#paint1_linear_2674_13768)"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2674_13768"
        x1={-0.0665144}
        y1={6.69061}
        x2={9.81792}
        y2={7.04908}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2674_13768"
        x1={-11.1668}
        y1={8.01782}
        x2={13.2451}
        y2={10.8636}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default IndividualUser;
