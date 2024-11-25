import React, { type SVGProps } from 'react';
import type { IconType } from '../types/icon-type';
import * as Icons from './icons';

export type IconProps = SVGProps<SVGSVGElement> & {
  icon: IconType;
};

export const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const Component = React.createElement(Icons[icon], props);

  return <span className="custom-icon">{Component}</span>;
};
