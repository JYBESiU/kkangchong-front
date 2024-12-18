import styled from '@emotion/styled';
import MeasureHeader from './measure/MeasureHeader';
import MeasureData from './measure/MeasureData';
import { useNavigate } from 'react-router-dom';
import { colors } from 'utils/color';
import { Button, Text } from './shared';
import {
  changeSportName,
  MeasureStorageData,
  RecommendResult,
  RecommendSports,
} from 'types';
import RecommendCard from './measure/RecommendCard';
import {
  getFromLocalStorage,
  measureKey,
  recommendKey,
  saveToLocalStorage,
} from 'utils/storage';
import { useEffect } from 'react';
import { generateMeasureDataList } from 'utils/measuring';

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

  const measuredData = getFromLocalStorage<MeasureStorageData>(measureKey);
  const measureDataList = generateMeasureDataList(measuredData!);

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
