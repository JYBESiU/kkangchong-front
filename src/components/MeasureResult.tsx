import styled from '@emotion/styled';
import MeasureHeader from './measure/MeasureHeader';
import MeasureData from './measure/MeasureData';
import MeasureHow from './measure/MeasureHow';
import { useNavigate } from 'react-router-dom';
import { colors } from 'utils/color';
import { Button, Text } from './shared';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */

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

  const measureHowData = [
    {
      name: '휠체어 농구',
      stars: 5,
      onClick: () => navigate('/result/basketball'),
    },
    {
      name: '댄스 스포츠',
      stars: 4,
      onClick: () => navigate('/result/dance'),
    },
    {
      name: '휠체어 럭비',
      stars: 3,
      onClick: () => navigate('/result/rugby'),
    },
    {
      name: '휠체어 탁구',
      stars: 5,
      onClick: () => navigate('/result/pingpong'),
    },
    {
      name: '휠체어 펜싱',
      stars: 2,
      onClick: () => navigate('/result/fencing'),
    },
    {
      name: '육상',
      stars: 4,
      onClick: () => navigate('/result/athletics'),
    },
  ];

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

      <MeasureHow data={measureHowData} />

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
