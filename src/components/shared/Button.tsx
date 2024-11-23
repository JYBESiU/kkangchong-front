import styled from '@emotion/styled';
import { colors } from 'utils/color';
import Text from './Text';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  width?: number | string;
  height: number | string;
  label: string;
  onClick?: VoidFunction;
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
      <Text fontSize={20} color={variant === 'text' ? 'blue3' : 'white'}>
        {label}
      </Text>
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<Omit<ButtonProps, 'label' | 'onClick'>>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  background-color: ${({ variant }) =>
    variant === 'primary'
      ? colors.blue3
      : variant === 'text'
        ? 'white'
        : colors.grey2};
  border-radius: 8px;
  border: none;
`;
