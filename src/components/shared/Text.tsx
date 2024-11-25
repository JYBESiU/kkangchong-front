import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { colors } from 'utils/color';

export interface TextProps {
  fontSize?: number;
  fontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  whiteSpace?: 'pre-line' | 'nowrap';
  fontFamily?: string;
  color?: keyof typeof colors;
  backgroundColor?: 'transparent' | 'white';
  top?: number;
}

function Text({
  fontSize = 20,
  fontWeight = 400,
  textAlign = 'left',
  color = 'black',
  whiteSpace = 'pre-line',
  backgroundColor = 'transparent',
  top = 0,
  children,
}: PropsWithChildren<TextProps>) {
  return (
    <StyledText
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      color={color}
      whiteSpace={whiteSpace}
      backgroundColor={backgroundColor}
      top={top}
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
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${({ backgroundColor }) => backgroundColor};
  top: ${({ top }) => top}px;
`;
