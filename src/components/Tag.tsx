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
      <Text color={isActive ? 'white' : 'black'} fontSize={16}>
        {label}
      </Text>
    </Root>
  );
}

export default Tag;

const Root = styled.div<{ isActive: boolean }>`
  min-width: 72px;
  height: 42px;
  padding: 8px 16px;
  margin: 0 4px;
  border: none;
  border-radius: 8px;
  background-color: ${({ isActive }) =>
    isActive ? colors.blue1 : colors.grey0};
`;
