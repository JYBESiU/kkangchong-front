import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from './shared';

export interface TagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tag({ label, isActive, onClick }: TagProps) {
  return (
    <Root isActive={isActive} onClick={onClick}>
      <Text
        color={isActive ? 'white' : 'black'}
        fontSize={16}
        whiteSpace={'nowrap'}
      >
        {label}
      </Text>
    </Root>
  );
}

export default Tag;

const Root = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-width: 72px; */
  height: 42px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ isActive }) =>
    isActive ? colors.blue3 : colors.grey0};
`;
