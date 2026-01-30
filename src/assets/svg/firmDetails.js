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
const FirmDetails = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2760_2947)">
      <Path
        d="M5 18.3327V3.33268C5 2.89065 5.17559 2.46673 5.48816 2.15417C5.80072 1.84161 6.22464 1.66602 6.66667 1.66602H13.3333C13.7754 1.66602 14.1993 1.84161 14.5118 2.15417C14.8244 2.46673 15 2.89065 15 3.33268V18.3327H5Z"
        stroke="url(#paint0_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99996 10H3.33329C2.89127 10 2.46734 10.1756 2.15478 10.4882C1.84222 10.8007 1.66663 11.2246 1.66663 11.6667V16.6667C1.66663 17.1087 1.84222 17.5326 2.15478 17.8452C2.46734 18.1577 2.89127 18.3333 3.33329 18.3333H4.99996"
        stroke="url(#paint1_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 7.5H16.6667C17.1087 7.5 17.5326 7.6756 17.8452 7.98816C18.1577 8.30072 18.3333 8.72464 18.3333 9.16667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H15"
        stroke="url(#paint2_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.33337 5H11.6667"
        stroke="url(#paint3_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.33337 8.33398H11.6667"
        stroke="url(#paint4_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.33337 11.666H11.6667"
        stroke="url(#paint5_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.33337 15H11.6667"
        stroke="url(#paint6_linear_2760_2947)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_2947"
        x1={-3.87532}
        y1={10.0335}
        x2={14.638}
        y2={10.9399}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2760_2947"
        x1={-1.29182}
        y1={14.1837}
        x2={4.8875}
        y2={14.3854}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2760_2947"
        x1={12.0416}
        y1={12.9389}
        x2={18.2236}
        y2={13.0941}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_2760_2947"
        x1={5.37493}
        y1={5.50205}
        x2={11.1347}
        y2={7.06872}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_2760_2947"
        x1={5.37493}
        y1={8.83603}
        x2={11.1347}
        y2={10.4027}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_2760_2947"
        x1={5.37493}
        y1={12.1681}
        x2={11.1347}
        y2={13.7347}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint6_linear_2760_2947"
        x1={5.37493}
        y1={15.502}
        x2={11.1347}
        y2={17.0687}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <ClipPath id="clip0_2760_2947">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FirmDetails;
