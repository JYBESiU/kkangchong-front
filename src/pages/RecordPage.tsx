import MeasureHeader from 'components/measure/MeasureHeader';
import MeasureData from 'components/measure/MeasureData';
import { MeasureStorageData } from 'types';
import { generateMeasureDataList } from 'utils/measuring';
import { getFromLocalStorage, measureKey } from 'utils/storage';
import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from 'components/shared';

export interface RecordPageProps {}

function RecordPage({}: RecordPageProps) {
  const measuredData = getFromLocalStorage<MeasureStorageData>(measureKey);
  const measureDataList = generateMeasureDataList(measuredData!);

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

      <Bottom>
        <Text fontWeight={700}>측정 기록</Text>
      </Bottom>
    </Container>
  );
}

export default RecordPage;

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

const Bottom = styled.div`
  padding: 00px 40px;
  width: 100%;
`;
