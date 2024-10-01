import { Facility } from 'types';
import styled from '@emotion/styled';
import { grey0, grey1 } from 'utils/color';

export interface DetailTopProps {
  facility: Facility;
}

const FacilityImg1 = styled.div<{ imgUrl?: string }>`
  width: 390px;
  height: 252px;
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

  position: relative;
  margin: 30px;
`;

const FacilityImg2 = styled.div<{ imgUrl?: string }>`
  width: 180px;
  height: 116px;
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

  position: absoulte;
  margin: 20px 30px;
`;

function DetailTop({ facility }: DetailTopProps) {
  return (
    <div>
      <FacilityImg1
        imgUrl={
          facility.imgUrls && facility.imgUrls.length > 0
            ? facility.imgUrls[0]
            : undefined
        }
      >
        {!(facility.imgUrls && facility.imgUrls.length > 0) && 'No image'}
      </FacilityImg1>
      <FacilityImg2
        imgUrl={
          facility.imgUrls && facility.imgUrls.length > 0
            ? facility.imgUrls[1]
            : undefined
        }
      >
        {!(facility.imgUrls && facility.imgUrls.length > 0) && 'No image'}
      </FacilityImg2>
      <FacilityImg2
        imgUrl={
          facility.imgUrls && facility.imgUrls.length > 0
            ? facility.imgUrls[2]
            : undefined
        }
      >
        {!(facility.imgUrls && facility.imgUrls.length > 0) && 'No image'}
      </FacilityImg2>
    </div>
  );
}

export default DetailTop;
