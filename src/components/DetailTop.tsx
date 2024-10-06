import { Facility } from 'types';
import styled from '@emotion/styled';
import { black, grey0, grey1 } from 'utils/color';

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
  margin: 0 0 20px 0;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img2Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 0;
`;

const FacilityTitle = styled.div`
  color: ${black};

  /* display big bold */
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FacilitySubtitle = styled.div`
  color: ${grey1};

  /* big */
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin: 0 0 5px 30px;
`;

function DetailTop({ facility }: DetailTopProps) {
  return (
    <div>
      <ImgWrapper>
        <FacilityImg1 imgUrl={facility.imgUrls?.[0]}>
          {!facility.imgUrls?.[0] && 'No image'}
        </FacilityImg1>
        <Img2Wrapper>
          <FacilityImg2 imgUrl={facility.imgUrls?.[1]}>
            {!facility.imgUrls?.[1] && 'No image'}
          </FacilityImg2>
          <FacilityImg2 imgUrl={facility.imgUrls?.[2]}>
            {!facility.imgUrls?.[2] && 'No image'}
          </FacilityImg2>
        </Img2Wrapper>
      </ImgWrapper>
      <TitleWrapper>
        <FacilityTitle>{facility.name}</FacilityTitle>
        <FacilitySubtitle>체육관</FacilitySubtitle>
      </TitleWrapper>
      <TitleWrapper>
        <FacilitySubtitle>★5.0</FacilitySubtitle>
        <FacilitySubtitle>후기 100개</FacilitySubtitle>
      </TitleWrapper>
    </div>
  );
}

export default DetailTop;
