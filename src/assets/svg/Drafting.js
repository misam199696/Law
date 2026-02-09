import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Drafting = ({ stroke = "currentColor", strokeWidth = 1.66667, ...props }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.4997 1.66602H4.99967C4.55765 1.66602 4.13372 1.84161 3.82116 2.15417C3.5086 2.46673 3.33301 2.89065 3.33301 3.33268V16.666C3.33301 17.108 3.5086 17.532 3.82116 17.8445C4.13372 18.1571 4.55765 18.3327 4.99967 18.3327H14.9997C15.4417 18.3327 15.8656 18.1571 16.1782 17.8445C16.4907 17.532 16.6663 17.108 16.6663 16.666V5.83268L12.4997 1.66602Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.667 1.66602V4.99935C11.667 5.44138 11.8426 5.8653 12.1551 6.17786C12.4677 6.49042 12.8916 6.66602 13.3337 6.66602H16.667"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.33366 7.5H6.66699"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3337 10.834H6.66699"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3337 14.166H6.66699"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Drafting;
