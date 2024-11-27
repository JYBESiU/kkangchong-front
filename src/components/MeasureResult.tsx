import styled from '@emotion/styled';
import MeasureHeader from './measure/MeasureHeader';
import MeasureData from './measure/MeasureData';
import { useNavigate } from 'react-router-dom';
import { colors } from 'utils/color';
import { Button, Text } from './shared';
import { changeSportName, RecommendResult, RecommendSports } from 'types';
import RecommendCard from './measure/RecommendCard';
import {
  getFromLocalStorage,
  measureKey,
  recommendKey,
  saveToLocalStorage,
} from 'utils/storage';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
  width: 100%;
`;

const MidBar = styled.div`
  width: 100%;
  height: 10px;
  background: ${colors.grey0};
  margin: 30px 0;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  padding: 0 40px;
  margin-bottom: 10px;
`;

const MeasureHowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding: 0 40px;
  margin-bottom: 30px;
`;

interface MeasureResultProps {
  recommend: RecommendResult;
  handleCardClick: (name: RecommendSports) => VoidFunction;
}
const MeasureResult = ({ recommend, handleCardClick }: MeasureResultProps) => {
  const navigate = useNavigate();

  const {
    leftArmRotationValue,
    rightArmRotationValue,
    leftWaistRotationValue,
    rightWaistRotationValue,
    leftWaistTiltValue,
    rightWaistTiltValue,
    coreDuration,
    punchCount,
  } = getFromLocalStorage(measureKey);

  const measureDataList = [
    {
      leftText: '팔  ',
      topLeftText: '좌',
      topRightText: `${getArmRotationPercentage(leftArmRotationValue)}%`,
      bottomLeftText: '우',
      bottomRightText: `${getArmRotationPercentage(rightArmRotationValue)}%`,
    },
    {
      leftText: '허리',
      topLeftText: '좌',
      topRightText: `${getWaistRotationPercentage(leftWaistRotationValue)}%`,
      bottomLeftText: '우',
      bottomRightText: `${getWaistRotationPercentage(rightWaistRotationValue)}%`,
    },
    {
      leftText: '상체',
      topLeftText: '좌',
      topRightText: `${getWaistTiltPercentage(leftWaistTiltValue)}%`,
      bottomLeftText: '우',
      bottomRightText: `${getWaistTiltPercentage(rightWaistTiltValue)}%`,
    },
    {
      leftText: '근력',
      topLeftText: '코어',
      topRightText: `${getCorePercentage(coreDuration)}%`,
      bottomLeftText: '팔',
      bottomRightText: `${getPunchPercentage(punchCount)}%`,
    },
  ];

  const recommendResults = [
    {
      name: RecommendSports.BASKETBALL,
      score: recommend.basketball_score,
    },
    {
      name: RecommendSports.DANCING_SPORTS,
      score: recommend.dance_sports_score,
    },
    {
      name: RecommendSports.RUGBY,
      score: recommend.rugby_score,
    },
    {
      name: RecommendSports.TABLE_TENNIS,
      score: recommend.table_tennis_score,
    },
    {
      name: RecommendSports.FENCING,
      score: recommend.fencing_score,
    },
    {
      name: RecommendSports.ATHLETICS,
      score: recommend.athletics_score,
    },
  ];

  useEffect(() => {
    saveToLocalStorage(
      recommendKey,
      recommendResults
        .filter((res) => res.score != 0)
        .map((e) => changeSportName(e.name))
    );
  }, [recommend]);

  const handleTopBoxClick = () => navigate('/clubs');
  const handleBottomBoxClick = () => navigate('/measuring');

  return (
    <Container>
      <MeasureHeader />

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
      <MidBar />

      <Box>
        <Text fontWeight={700}>이런 운동은 어때요?</Text>
      </Box>

      <MeasureHowContainer>
        {recommendResults
          .filter((res) => res.score != 0)
          .map(({ name, score }) => (
            <RecommendCard
              key={name}
              name={name}
              score={score}
              handleClick={handleCardClick(name)}
            />
          ))}
      </MeasureHowContainer>

      <Button
        width={320}
        height={60}
        label="추천 동호회 구경하기"
        onClick={handleTopBoxClick}
      />
      <Button
        width={320}
        height={60}
        variant="secondary"
        label="재측정하기"
        onClick={handleBottomBoxClick}
      />
    </Container>
  );
};

export default MeasureResult;

const MAX_ARM_ROTATION = 180;

const getArmRotationPercentage = (value: number) => {
  return (
    ((value > MAX_ARM_ROTATION ? MAX_ARM_ROTATION : value) / MAX_ARM_ROTATION) *
    100
  ).toFixed(0);
};

const MAX_WAIST_ROTATION = 80;

const getWaistRotationPercentage = (value: number) => {
  return (
    ((value > MAX_WAIST_ROTATION ? MAX_WAIST_ROTATION : value) /
      MAX_WAIST_ROTATION) *
    100
  ).toFixed(0);
};

const MAX_WAIST_TILT = 50;

const getWaistTiltPercentage = (value: number) => {
  return (
    ((value > MAX_WAIST_TILT ? MAX_WAIST_TILT : value) / MAX_WAIST_TILT) *
    100
  ).toFixed(0);
};

const getCorePercentage = (value: number) => {
  return ((value / 60) * 100).toFixed(0);
};

const MAX_PUNCH = 40;
const getPunchPercentage = (value: number) => {
  return (((value > MAX_PUNCH ? MAX_PUNCH : value) / MAX_PUNCH) * 100).toFixed(
    0
  );
};
