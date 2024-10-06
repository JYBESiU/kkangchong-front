import styled from '@emotion/styled';
import { colors } from 'utils/color';
import Text from './Text';

export interface SelectBoxProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  subLabel?: string;
  isSelected?: boolean;
}

function SelectBox({
  width = '100%',
  height,
  label,
  subLabel,
  isSelected = false,
}: SelectBoxProps) {
  return (
    <StyledBox width={width} height={height} isSelected={isSelected}>
      <Text color={isSelected ? 'blue3' : 'black'} fontSize={16}>
        {label}
      </Text>
      {subLabel && (
        <Text color={isSelected ? 'blue3' : 'black'} fontSize={12}>
          {subLabel}
        </Text>
      )}
    </StyledBox>
  );
}

export default SelectBox;

const StyledBox = styled.div<Omit<SelectBoxProps, 'label' | 'subLabel'>>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.blue2 : colors.white};
  border-radius: 8px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? colors.blue3 : colors.grey0)};
`;
