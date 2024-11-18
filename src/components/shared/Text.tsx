import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { colors } from 'utils/color';

export interface TextProps {
  fontSize?: number;
  fontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  whiteSpace?: 'pre-line' | 'nowrap';
  color?: keyof typeof colors;
}

function Text({
  fontSize = 20,
  fontWeight = 400,
  textAlign = 'left',
  color = 'black',
  whiteSpace = 'pre-line',
  children,
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      color={color}
      whiteSpace={whiteSpace}
    >
      {children}
    </StyledText>
  );
}

export default Text;

const StyledText = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => colors[color!]};
  text-align: ${({ textAlign }) => textAlign};
  white-space: ${({ whiteSpace }) => whiteSpace};
`;
