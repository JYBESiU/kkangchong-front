import { Facility } from 'types';
import styled from '@emotion/styled';
import { colors } from 'utils/color';

const InfoBg = styled.div`
  display: flex;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 24px;
  border: 1px solid ${colors.blue3};
  background: ${colors.blue2};

  color: ${colors.blue3};
  font-family: 'Noto Sans KR';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InfoWrap = styled.div`
  display: flex;
  width: 354px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const InfoGap = styled.div`
  margin-top: 11px;
`;

function FacilityInfo() {
  return (
    <div>
      <InfoGap />
      <InfoWrap>
        <InfoBg>장애인 주차장</InfoBg>
        <InfoBg>장애인 화장실</InfoBg>
        <InfoBg>엘리베이터</InfoBg>
      </InfoWrap>
      <InfoWrap>
        <InfoBg>안내시설</InfoBg>
        <InfoBg>배려 접수대</InfoBg>
        <InfoBg>안전요원</InfoBg>
      </InfoWrap>
    </div>
  );
}

export default FacilityInfo;
