import { Facility } from 'types';
import styled from '@emotion/styled';
import FacilityInfo from './FacilityInfo';

export interface FacilityCardProps {
  facility: Facility;
}

const FacilityFrame = styled.div`
  height: 160px;
  width: 600px;
  align-self: stretch;

  border-radius: 8px;
  border: 1px solid var(--grey0, #e9e9e9);
  background: #fff;

  padding: 30px 30px;
`;

const FacilityName = styled.div`
  color: #222325;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FacilityAddress = styled.div`
  color: #797982;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FacilityGap = styled.div`
  height: 11px;
`;

const FacilityWrap = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: 10px;
`;

const FacilityDistance = styled.div`
  color: #4a77ea;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FacilityImg = styled.div`
  width: 137px;
  height: 137px;
  flex-shrink: 0;

  border-radius: 8px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <div>
      <FacilityFrame>
        <FacilityWrap>
          <FacilityName>{facility.name}</FacilityName>
          <FacilityAddress>체육관</FacilityAddress>
        </FacilityWrap>
        <br></br>
        <FacilityWrap>
          <FacilityAddress>24시간 영업</FacilityAddress>
          <FacilityAddress>매주 월요일 휴무</FacilityAddress>
        </FacilityWrap>
        <br></br>
        <FacilityWrap>
          <FacilityDistance>100m</FacilityDistance>
          <FacilityAddress>{facility.roadAddressName}</FacilityAddress>
        </FacilityWrap>
        <FacilityGap></FacilityGap>
        <FacilityInfo></FacilityInfo>
      </FacilityFrame>
      <br></br>
    </div>
  );
}

export default FacilityCard;
