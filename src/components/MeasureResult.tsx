import styled from '@emotion/styled';
import MeasureHeader from './measure/MeasureHeader';
import MeasureData from './measure/MeasureData';
import MeasureHow from './measure/RecommendCard';
import { useNavigate } from 'react-router-dom';
import { colors } from 'utils/color';
import { Button, Text } from './shared';
import { RecommendResult } from 'types';
import RecommendCard from './measure/RecommendCard';

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

const MeasureResult = () => {
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

  const recommendResults = getRecommendResults(recommendDummy);

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
            <RecommendCard name={name} score={score} />
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

const recommendDummy = {
  basketball_score: 5,
  basketball_reason:
    '사용자의 팔을 양옆으로 드는 능력이 약간 제한적이지만, 팔 근력이 양호하고 코어 힘이 안정적입니다. 허리 회전이 균형적이나 각도가 조금 낮아 몸통의 회전 속도에 약간의 제한이 있을 수 있습니다.',
  table_tennis_score: 4,
  table_tennis_reason:
    '몸통 회전 각도와 기울임이 적절하나, 빠른 회전 동작에서 다소 부족할 수 있습니다. 코어 힘이 비교적 안정적이어서 기본적인 탁구 동작 수행에는 문제가 없습니다.',
  rugby_score: 3,
  rugby_reason:
    '강한 몸통 조절과 다방향 움직임이 필요한 럭비에 비해 허리 회전 각도가 낮고 코어 힘이 다소 부족합니다. 상체의 안정성은 어느 정도 유지되지만, 격한 움직임에서 어려움이 예상됩니다.',
  fencing_score: 2,
  fencing_reason:
    '팔 근력은 적절하고 허리 회전도 가능하지만, 앉은 자세에서의 빠른 균형 조절 능력이 약간 부족할 수 있습니다. 방향 전환 시 안정성을 유지하는 데 약간의 제한이 있을 것입니다.',
  dance_sports_score: 1,
  dance_sports_reason:
    '골반과 몸통의 움직임이 적절하며, 기본적인 코어 힘이 안정적입니다. 빠른 회전 동작에서 약간의 제한이 있을 수 있지만, 대부분의 동작을 수행하는 데 무리가 없습니다.',
  athletics_score: 0,
  athletics_reason:
    '상지 기능과 코어 힘이 적절하여 휠체어 조작에 유리합니다. 직선 주행에서 안정성이 있으며, 몸통의 회전이 자유롭지는 않지만 기본적인 추진력 생성에 무리가 없습니다.',
};

const getRecommendResults = (result: RecommendResult) => [
  {
    name: '휠체어 농구',
    score: result.basketball_score,
  },
  {
    name: '댄스 스포츠',
    score: result.dance_sports_score,
  },
  {
    name: '휠체어 럭비',
    score: result.rugby_score,
  },
  {
    name: '휠체어 탁구',
    score: result.table_tennis_score,
  },
  {
    name: '휠체어 펜싱',
    score: result.fencing_score,
  },
  {
    name: '육상',
    score: result.athletics_score,
  },
];
