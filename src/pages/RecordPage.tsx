import MeasureHeader from 'components/measure/MeasureHeader';
import MeasureData from 'components/measure/MeasureData';
import { MeasureStorageData } from 'types';
import { generateMeasureDataList } from 'utils/measuring';
import { getFromLocalStorage, measureKey } from 'utils/storage';
import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Button, Text } from 'components/shared';

export interface RecordPageProps {}

function RecordPage({}: RecordPageProps) {
  const measuredData = getFromLocalStorage<MeasureStorageData>(measureKey);
  const measureDataList = generateMeasureDataList(measuredData!);

  return (
    <Container>
      <MeasureHeader withArrow />

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

      <Bottom>
        <Text fontWeight={700}>측정 기록</Text>

        <Flex>
          <Text fontSize={16} fontWeight={700}>
            팔
          </Text>
          <img width={313} src={'/images/record_example.png'} />
        </Flex>

        <Flex>
          <Text fontSize={16} fontWeight={700}>
            허리
          </Text>
          <img width={313} src={'/images/record_example.png'} />
        </Flex>

        <Flex>
          <Text fontSize={16} fontWeight={700}>
            상체
          </Text>
          <img width={313} src={'/images/record_example.png'} />
        </Flex>

        <Flex>
          <Text fontSize={16} fontWeight={700}>
            근력
          </Text>
          <img width={313} src={'/images/record_example.png'} />
        </Flex>
      </Bottom>
      <Button height={60} width={313} label="결과 공유" />
    </Container>
  );
}

export default RecordPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  align-items: center;

  gap: 10px;

  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
  width: 393px;
`;

const MidBar = styled.div`
  width: 100%;
  height: 10px;
  background: ${colors.grey0};
  margin: 30px 0;
`;

const Bottom = styled.div`
  padding: 0px 40px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
