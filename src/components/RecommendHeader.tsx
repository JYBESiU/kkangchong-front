import React from 'react';
import styled from '@emotion/styled';

// 헤더 프레임 스타일
const HeaderFrame = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: flex-start; /* 가로 정렬: 왼쪽 배치 */
  gap: 10px; /* 화살표와 텍스트 사이 간격 */
  margin: 61px 0 20px 32px; /* 화면 상단 61px, 좌측 32px */
  width: 100%; /* 전체 폭 사용 */
`;

const BackButton = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--black, #222325);
  cursor: pointer; /* 클릭 가능한 스타일 */
  user-select: none; /* 선택 불가 */
`;

const HeaderText = styled.div`
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

interface RecommendHeaderProps {
  onBackClick: () => void;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ onBackClick }) => {
  return (
    <HeaderFrame>
      <BackButton onClick={onBackClick}>{'<'}</BackButton>
      <HeaderText>종목별 추천</HeaderText>
    </HeaderFrame>
  );
};

export default RecommendHeader;
