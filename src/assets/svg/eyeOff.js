import * as React from "react";
import Svg, { Path } from "react-native-svg";
const EyeOff = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.66699 9.99935C1.66699 9.99935 4.16699 4.16602 10.0003 4.16602C15.8337 4.16602 18.3337 9.99935 18.3337 9.99935C18.3337 9.99935 15.8337 15.8327 10.0003 15.8327C4.16699 15.8327 1.66699 9.99935 1.66699 9.99935Z"
      stroke="currentColor"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 2.5L17.5 17.5"
      stroke="currentColor"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EyeOff;
