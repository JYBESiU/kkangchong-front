import React from 'react';
import styled from '@emotion/styled';
import MeasureHeader from './measure/MeasureHeader';
import MeasureData from './measure/MeasureData';
import MeasureMid from './measure/MeasureMid';
import MeasureHow from './measure/MeasureHow';
import MeasureBottom from './measure/MeasureBottom';
import { useNavigate } from 'react-router-dom';

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: flex-start;
  width: 393px;
  height: 852px;
  gap: 20px;
  border: 1px solid black;
  box-sizing: border-box;

  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const MeasureResult: React.FC = () => {
  const navigate = useNavigate();

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
      leftText: '허리',
      topLeftText: '좌',
      topRightText: '75%',
      bottomLeftText: '우',
      bottomRightText: '70%',
    },
    {
      leftText: '근력',
      topLeftText: '좌',
      topRightText: '65%',
      bottomLeftText: '우',
      bottomRightText: '60%',
    },
  ];

  const measureHowData = [
    {
      topText: '휠체어 농구',
      middleText: '휠체어 농구에 대한 짧은 설명',
      stars: 5,
      onClick: () => navigate('/result/basketball'),
    },
    {
      topText: '댄스 스포츠',
      middleText: '댄스 스포츠에 대한 짧은 설명',
      stars: 4,
      onClick: () => navigate('/result/dance'),
    },
    {
      topText: '휠체어 럭비',
      middleText: '휠체어 럭비에 대한 짧은 설명',
      stars: 3,
      onClick: () => navigate('/result/rugby'),
    },
    {
      topText: '휠체어 탁구',
      middleText: '휠체어 탁구에 대한 짧은 설명',
      stars: 5,
      onClick: () => navigate('/result/pingpong'),
    },
    {
      topText: '휠체어 펜싱',
      middleText: '휠체어 펜싱에 대한 짧은 설명',
      stars: 2,
      onClick: () => navigate('/result/fencing'),
    },
    {
      topText: '육상',
      middleText: '육상에 대한 짧은 설명',
      stars: 4,
      onClick: () => navigate('/result/athletics'),
    },
  ];

  const handleTopBoxClick = () => navigate('/clubs');
  const handleBottomBoxClick = () => navigate('/measuring');

  return (
    <Container>
      <MeasureHeader
        leftText="측정 결과"
        rightText={new Date().toLocaleDateString()}
      />

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

      <MeasureHow data={measureHowData} />

      <MeasureBottom
        onTopBoxClick={handleTopBoxClick}
        onBottomBoxClick={handleBottomBoxClick}
      />
    </Container>
  );
};

export default MeasureResult;
