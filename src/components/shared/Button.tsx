import styled from '@emotion/styled';
import { blue3, grey2 } from 'utils/color';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  width?: number | string;
  height: number | string;
  label: string;
  onClick?: () => {};
}

function Button({
  variant = 'primary',
  width = '100%',
  height,
  label,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      width={width}
      height={height}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<Omit<ButtonProps, 'label' | 'onClick'>>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  background-color: ${({ variant }) => (variant === 'primary' ? blue3 : grey2)};
  border-radius: 8px;
  border: none;

  color: white;
`;
