import { Facility } from 'types';
import styled from '@emotion/styled';
import { black, blue1 } from 'utils/color';

export interface DetailDataProps {}

const DataBox = styled.div`
  display: flex;
  width: 124px;
  height: 80px;
  padding: 20px 8px;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: ${blue1};
`;

const DataBigfont = styled.div`
  color: ${black};
  text-align: center;

  /* normal */
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DataSmallfont = styled.div`
  color: ${black};
  text-align: center;

  /* small */
  font-family: 'Noto Sans KR';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 0 0 0 30px;
`;

const WrapperGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function DetailData() {
  return (
    <WrapperGap>
      <DataWrapper>
        <DataBox>
          <DataBigfont>주 출입구</DataBigfont>
          <DataSmallfont>경사 20도 이하 너비 120cm 이상</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>건물내 입구</DataBigfont>
          <DataSmallfont>너비 90cm 이상 문턱 없거나 5cm 이하</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>화장실</DataBigfont>
          <DataSmallfont>장애인 전용 화장실 휠체어 폭 80cm</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>주차장</DataBigfont>
          <DataSmallfont>일반 주차구역만 있음</DataSmallfont>
        </DataBox>
      </DataWrapper>
      <DataWrapper>
        <DataBox>
          <DataBigfont>주 출입구</DataBigfont>
          <DataSmallfont>경사 20도 이하 너비 120cm 이상</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>건물내 입구</DataBigfont>
          <DataSmallfont>너비 90cm 이상 문턱 없거나 5cm 이하</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>화장실</DataBigfont>
          <DataSmallfont>장애인 전용 화장실 휠체어 폭 80cm</DataSmallfont>
        </DataBox>
        <DataBox>
          <DataBigfont>주차장</DataBigfont>
          <DataSmallfont>일반 주차구역만 있음</DataSmallfont>
        </DataBox>
      </DataWrapper>
    </WrapperGap>
  );
}

export default DetailData;
