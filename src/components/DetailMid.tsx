import { Facility } from 'types';
import styled from '@emotion/styled';
import { blue1, grey0, white } from 'utils/color';

export interface DetailMidProps {}

const GrayBar = styled.div`
  width: 660px;
  height: 1px;
  background: ${grey0};
  margin-top: 30px;
`;

const LocationInfo = styled.div`
  width: 330px;
  height: 60px;
  flex-shrink: 0;
  background: ${white};

  color: var(--black, #222325);
  text-align: center;

  /* big */
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px;
`;

const ReviewInfo = styled.div`
  width: 330px;
  height: 60px;
  flex-shrink: 0;
  background: ${blue1};

  color: var(--grey-2, #797982);
  text-align: center;

  /* big */
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

function DetailMid() {
  return (
    <div>
      <GrayBar></GrayBar>
      <InfoWrapper>
        <LocationInfo>장소 정보</LocationInfo>
        <ReviewInfo>리뷰</ReviewInfo>
      </InfoWrapper>
    </div>
  );
}

export default DetailMid;
