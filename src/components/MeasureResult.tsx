import React from 'react';
import styled from '@emotion/styled';
import MeasureHeader from './MeasureHeader';
import MeasureData from './MeasureData';
import MeasureMid from './MeasureMid';

// 스타일 정의
const Container = styled.div`
  display: flex;
  width: 393px;
  height: 852px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
`;

const MeasureResult: React.FC = () => {
  const measureDataList = [
    {
      leftText: '상체',
      topLeftText: '좌',
      topRightText: '95%',
      bottomLeftText: '우',
      bottomRightText: '90%',
    },
    {
      leftText: '하체',
      topLeftText: '좌',
      topRightText: '85%',
      bottomLeftText: '우',
      bottomRightText: '80%',
    },
    {
      leftText: '팔',
      topLeftText: '좌',
      topRightText: '75%',
      bottomLeftText: '우',
      bottomRightText: '70%',
    },
    {
      leftText: '다리',
      topLeftText: '좌',
      topRightText: '65%',
      bottomLeftText: '우',
      bottomRightText: '60%',
    },
  ];

  return (
    <Container>
      {/* MeasureHeader에 값을 전달 */}
      <MeasureHeader leftText="측정 결과" rightText="2024.11.17" />

      {measureDataList.map((data, index) => (
        <MeasureData
          key={index}
          leftText={data.leftText}
          topLeftText={data.topLeftText}
          topRightText={data.topRightText}
          bottomLeftText={data.bottomLeftText}
          bottomRightText={data.bottomRightText}
        />
      ))}

      <MeasureMid />
    </Container>
  );
};

export default MeasureResult;
