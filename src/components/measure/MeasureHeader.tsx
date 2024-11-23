import React from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/shared';
import { colors } from 'utils/color';

const HeaderContainer = styled.div`
  padding: 20px 40px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

// 우측 텍스트 스타일
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 32px;
  border-radius: 8px;
  background-color: ${colors.blue1};
`;

interface MeasureHeaderProps {}

const MeasureHeader: React.FC<MeasureHeaderProps> = ({}) => {
  return (
    <HeaderContainer>
      <Text fontWeight={700}>측정 결과</Text>
      <Box>
        <Text fontSize={16}>{new Date().toLocaleDateString()}</Text>
      </Box>
    </HeaderContainer>
  );
};

export default MeasureHeader;
