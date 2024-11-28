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

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  height: 32px;
  border-radius: 8px;
  background-color: ${colors.blue1};
`;

interface MeasureHeaderProps {
  withArrow?: boolean;
}

const MeasureHeader = ({ withArrow }: MeasureHeaderProps) => {
  return (
    <HeaderContainer>
      <Text fontWeight={700}>측정 결과</Text>
      <Box>
        {withArrow && (
          <img
            style={{ marginRight: '4px', marginTop: '2px', width: '22px' }}
            src={'/images/back_button.svg'}
          />
        )}
        <Text fontSize={16}>{new Date().toLocaleDateString()}</Text>
        {withArrow && (
          <img
            style={{
              marginLeft: '4px',
              marginTop: '2px',
              width: '22px',
              transform: 'rotate(180deg)',
            }}
            src={'/images/back_button.svg'}
          />
        )}
      </Box>
    </HeaderContainer>
  );
};

export default MeasureHeader;
