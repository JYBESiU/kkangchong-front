import React from 'react';
import styled from '@emotion/styled';

// Header 컨테이너 스타일 정의
const HeaderContainer = styled.div`
  margin: 74px 40px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 313px; /* 내부 요소를 정렬하기 위한 고정 폭 */
`;

// 좌측 텍스트 스타일
const LeftText = styled.div`
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

// 우측 텍스트 스타일
const RightText = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: var(--blue-1, #f7f8fc);
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--black, #222325);
`;

interface MeasureHeaderProps {
  leftText: string;
  rightText: string;
}

const MeasureHeader: React.FC<MeasureHeaderProps> = ({
  leftText,
  rightText,
}) => {
  return (
    <HeaderContainer>
      <LeftText>{leftText}</LeftText>
      <RightText>{rightText}</RightText>
    </HeaderContainer>
  );
};

export default MeasureHeader;
