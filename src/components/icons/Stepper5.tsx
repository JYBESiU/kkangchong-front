import * as React from 'react';
import type { SVGProps } from 'react';
const SvgStepper5 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={95}
    height={10}
    fill="none"
    {...props}
  >
    <circle cx={5} cy={5} r={5} fill="#E9E9E9" />
    <circle cx={22} cy={5} r={5} fill="#E9E9E9" />
    <circle cx={39} cy={5} r={5} fill="#E9E9E9" />
    <circle cx={56} cy={5} r={5} fill="#E9E9E9" />
    <circle cx={73} cy={5} r={5} fill="#4A77EA" />
    <circle cx={90} cy={5} r={5} fill="#E9E9E9" />
  </svg>
);
export default SvgStepper5;
