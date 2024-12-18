import { colors } from 'utils/color';
import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export default function ClubIcon({ active }: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon" clip-path="url(#clip0_1161_923)">
        <path
          id="Vector"
          d="M20.25 3H5.25C4.15 3 3.25 3.9 3.25 5V19C3.25 20.1 4.15 21 5.25 21H20.25C21.35 21 22.25 20.1 22.25 19V5C22.25 3.9 21.35 3 20.25 3ZM20.25 5V8H5.25V5H20.25ZM15.25 19H10.25V10H15.25V19ZM5.25 10H8.25V19H5.25V10ZM17.25 19V10H20.25V19H17.25Z"
          fill={active ? colors.blue3 : colors.grey2}
        />
      </g>
    </svg>
  );
}
