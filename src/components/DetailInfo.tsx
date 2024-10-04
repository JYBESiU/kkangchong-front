import { Facility } from 'types';
import styled from '@emotion/styled';
import { black } from 'utils/color';

export interface DetailInfoProps {
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

function DetailInfo({ facility }: DetailInfoProps) {
  return (
    <div>
      <BasicInfo>상세 정보</BasicInfo>
    </div>
  );
}

export default DetailInfo;
