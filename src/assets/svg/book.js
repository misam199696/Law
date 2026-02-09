import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Book = ({ stroke = "currentColor", strokeWidth = 1.66667, ...props }) => (
  <Svg
    width={19}
    height={17}
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.833008 0.833984H5.83301C6.71706 0.833984 7.56491 1.18517 8.19003 1.81029C8.81515 2.43542 9.16634 3.28326 9.16634 4.16732V15.834C9.16634 15.1709 8.90295 14.5351 8.43411 14.0662C7.96527 13.5974 7.32938 13.334 6.66634 13.334H0.833008V0.833984Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.4984 0.833984H12.4984C11.6143 0.833984 10.7665 1.18517 10.1413 1.81029C9.51623 2.43542 9.16504 3.28326 9.16504 4.16732V15.834C9.16504 15.1709 9.42843 14.5351 9.89727 14.0662C10.3661 13.5974 11.002 13.334 11.665 13.334H17.4984V0.833984Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Book;
