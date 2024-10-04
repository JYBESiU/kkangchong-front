import { Facility } from 'types';
import styled from '@emotion/styled';
import { black, grey0 } from 'utils/color';

export interface DetailBasicProps {
  facility: Facility;
}

const BasicInfo = styled.div`
  color: ${black};

  /* big bold */
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 30px 0 20px 30px;
`;

const BasicWrapper = styled.div`
  display: flex;
  height: 95px;
  width: 540px;
  padding: 15px 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
  margin: 0 0 0 30px;
  border-radius: 8px;
  border: 1px solid ${grey0};
`;

const BasicInfoData = styled.div`
  color: ${black};

  /* normal */
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function DetailBasic({ facility }: DetailBasicProps) {
  return (
    <div>
      <BasicInfo>기본 정보</BasicInfo>
      <BasicWrapper>
        <BasicInfoData>🚩 {facility.roadAddressName}</BasicInfoData>
        <BasicInfoData>⏲ 09:00 - 12:00</BasicInfoData>
        <BasicInfoData>📞 {facility.phone}</BasicInfoData>
      </BasicWrapper>
    </div>
  );
}

export default DetailBasic;
