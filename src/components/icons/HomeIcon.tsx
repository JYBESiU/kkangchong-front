import { colors } from 'utils/color';
import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export default function HomeIcon({ active }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon" clip-path="url(#clip0_1161_918)">
        <path
          id="Vector"
          d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
          fill={active ? colors.blue3 : colors.grey2}
        />
      </g>
    </svg>
  );
}
