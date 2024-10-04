import { Facility } from 'types';
import styled from '@emotion/styled';
import { black, blue3, grey0 } from 'utils/color';
import DetailData from './DetailData';

export interface DetailBottomProps {
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
  margin: 40px 0 20px 30px;
`;

const ModifyInfo = styled.div`
  color: ${blue3};
  text-align: right;

  /* normal */
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 43px 0 20px;
`;

const ModifyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 470px;
`;

const HowtoUse = styled.div`
  display: flex;
  width: 540px;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${grey0};
  margin: 0 0 40px 30px;
  color: #000;

  /* normal */
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FacilityComfirm = styled.div`
  width: 600px;
  height: 90px;
  border-radius: 8px;
  background: ${blue3};
  color: #fff;
  text-align: center;

  /* big */
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 30px 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function DetailBottom({ facility }: DetailBottomProps) {
  return (
    <div>
      <ModifyWrapper>
        <BasicInfo>상세 정보</BasicInfo>
        <ModifyInfo>수정제안</ModifyInfo>
      </ModifyWrapper>
      <DetailData></DetailData>
      <BasicInfo>사용 안내</BasicInfo>
      <HowtoUse>
        여기에는 사용 안내에 대한 내용이 들어갑니다.여기에는 사용 안내에 대한
        내용이 들어갑니다.여기에는 사용 안내에 대한 내용이 들어갑니다.
      </HowtoUse>
      <FacilityComfirm>장소 확정</FacilityComfirm>
    </div>
  );
}

export default DetailBottom;
