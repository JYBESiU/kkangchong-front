import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { colors } from 'utils/color';

export interface TextProps {
  fontSize?: number;
  fontWeight?: number;
  color?: keyof typeof colors;
}

function Text({
  fontSize = 14,
  fontWeight = 400,
  color = 'black',
  children,
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {children}
    </StyledText>
  );
}

export default Text;

const StyledText = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => colors[color!]};
`;
