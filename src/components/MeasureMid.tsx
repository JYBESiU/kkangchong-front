import React from 'react';
import styled from '@emotion/styled';

// 전체 컨테이너 스타일
const MeasureMidContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 43px 0; /* 바 위아래 간격 */
`;

// 바(bar) 스타일
const MidBar = styled.div`
  width: 393px;
  height: 10px;
  background: var(--grey0, #e9e9e9);
`;

const MeasureMid: React.FC = () => {
  return (
    <MeasureMidContainer>
      <MidBar />
    </MeasureMidContainer>
  );
};

export default MeasureMid;
