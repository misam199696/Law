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
const Peoples = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2760_3079)">
      <Path
        d="M11.3333 14V12.6667C11.3333 11.9594 11.0523 11.2811 10.5522 10.781C10.0521 10.281 9.37387 10 8.66663 10H3.33329C2.62605 10 1.94777 10.281 1.44767 10.781C0.947578 11.2811 0.666626 11.9594 0.666626 12.6667V14"
        stroke="url(#paint0_linear_2760_3079)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.00004 7.33333C7.4728 7.33333 8.66671 6.13943 8.66671 4.66667C8.66671 3.19391 7.4728 2 6.00004 2C4.52728 2 3.33337 3.19391 3.33337 4.66667C3.33337 6.13943 4.52728 7.33333 6.00004 7.33333Z"
        stroke="url(#paint1_linear_2760_3079)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.3334 13.9993V12.6659C15.3329 12.0751 15.1363 11.5011 14.7743 11.0341C14.4123 10.5672 13.9055 10.2336 13.3334 10.0859"
        stroke="url(#paint2_linear_2760_3079)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6666 2.08594C11.2402 2.2328 11.7487 2.5664 12.1117 3.03414C12.4748 3.50188 12.6719 4.07716 12.6719 4.66927C12.6719 5.26138 12.4748 5.83666 12.1117 6.3044C11.7487 6.77214 11.2402 7.10574 10.6666 7.2526"
        stroke="url(#paint3_linear_2760_3079)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_2760_3079"
        x1={-8.80039}
        y1={12.0082}
        x2={10.0996}
        y2={16.1209}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2760_3079"
        x1={-1.40013}
        y1={4.6776}
        x2={8.43184}
        y2={5.47989}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2760_3079"
        x1={11.5583}
        y1={12.0506}
        x2={15.2634}
        y2={12.2051}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_2760_3079"
        x1={8.88692}
        y1={4.67986}
        x2={12.6044}
        y2={4.79759}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#14B8A6" />
        <Stop offset={1} stopColor="#06B6D4" />
      </LinearGradient>
      <ClipPath id="clip0_2760_3079">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Peoples;
