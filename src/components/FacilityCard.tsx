import { Facility } from 'types';
import styled from '@emotion/styled';
import FacilityInfo from './FacilityInfo';
import { black, blue3, grey0, grey1 } from 'utils/color';

export interface FacilityCardProps {
  facility: Facility;
}

const FacilityFrame = styled.div`
  height: 160px;
  width: 600px;
  align-self: stretch;

  border-radius: 8px;
  border: 1px solid ${grey0};
  background: #fff;

  padding: 30px 30px;
  position: relative;
<<<<<<< HEAD
  margin: 20px;
=======
>>>>>>> c868777 (img working)
`;

const FacilityName = styled.div`
  color: ${black};
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FacilityAddress = styled.div`
  color: ${grey1};
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FacilityWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 5px;
`;

const FacilityDistance = styled.div`
  color: ${blue3};
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FacilityImg = styled.div<{ imgUrl?: string }>`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  background: ${({ imgUrl }) =>
    imgUrl ? `url(${imgUrl}) lightgray 50% / cover no-repeat` : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${grey1};
  font-size: 14px;
  font-family: 'Noto Sans KR';
  border: 1px solid ${grey0};

  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
`;

function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <FacilityFrame>
      <FacilityWrap>
        <FacilityName>{facility.name}</FacilityName>
        <FacilityAddress>체육관</FacilityAddress>
      </FacilityWrap>
      <FacilityWrap>
        <FacilityAddress>24시간 영업</FacilityAddress>
        <FacilityAddress>매주 월요일 휴무</FacilityAddress>
      </FacilityWrap>
      <FacilityWrap>
        <FacilityDistance>100m</FacilityDistance>
        <FacilityAddress>{facility.roadAddressName}</FacilityAddress>
      </FacilityWrap>
      <FacilityInfo></FacilityInfo>
      <FacilityImg
        imgUrl={
          facility.imgUrls && facility.imgUrls.length > 0
            ? facility.imgUrls[0]
            : undefined
        }
      >
        {!(facility.imgUrls && facility.imgUrls.length > 0) && 'No image'}
      </FacilityImg>
    </FacilityFrame>
  );
}

export default FacilityCard;
