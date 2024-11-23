import styled from '@emotion/styled';
import { colors } from 'utils/color';

export interface StarProps {
  isValid: boolean;
  size: number;
}

function Star(props: StarProps) {
  return <Root {...props} />;
}

export default Star;

const Root = styled.div<StarProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ isValid }) => (isValid ? colors.blue3 : colors.grey1)};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;
