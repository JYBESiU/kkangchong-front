import { colors } from 'utils/color';
import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export default function RecordIcon({ active }: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon" clip-path="url(#clip0_1161_928)">
        <path
          id="Vector"
          d="M20.5 2H4.5C3.4 2 2.51 2.9 2.51 4L2.5 22L6.5 18H20.5C21.6 18 22.5 17.1 22.5 16V4C22.5 2.9 21.6 2 20.5 2ZM20.5 16H5.67L5.08 16.59L4.5 17.17V4H20.5V16ZM11 14H18.5V12H13L11 14ZM14.86 8.13C15.06 7.93 15.06 7.62 14.86 7.42L13.09 5.65C12.89 5.45 12.58 5.45 12.38 5.65L6.5 11.53V14H8.97L14.86 8.13Z"
          fill={active ? colors.blue3 : colors.grey2}
        />
      </g>
    </svg>
  );
}
