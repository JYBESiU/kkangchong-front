import React from 'react';
import styled from '@emotion/styled';

// 헤더 프레임 스타일
const HeaderFrame = styled.div`
  display: flex;
  flex-direction: column; /* 수직 배치 */
  position: fixed; /* 화면에서 고정 */
  top: 61px;
  left: 32px; /* 좌측 간격 조정 */
`;

// 상단 버튼과 텍스트 컨테이너
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 화살표와 텍스트 사이 간격 */
`;

// 이전 버튼 스타일 (텍스트 사용)
const BackButton = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--black, #222325);
  cursor: pointer; /* 클릭 가능 */
  user-select: none; /* 선택 불가 */
`;

// 헤더 텍스트 스타일
const HeaderText = styled.div`
  color: var(--black, #222325);
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 직사각형 스타일
const GreyRectangle = styled.div`
  width: 329px;
  height: 215px;
  margin-top: 27px; /* 제목에서 27px 아래 */
  background: var(--grey-1, #e9e9e9); /* grey1 색상 */
`;

const RecommendHeader: React.FC = () => {
  const handleBackClick = () => {
    console.log('Back button clicked'); // 이전 동작 추가
    // window.history.back(); // 브라우저 뒤로가기
  };

  return (
    <HeaderFrame>
      {/* 헤더 버튼과 텍스트 */}
      <HeaderContent>
        <BackButton onClick={handleBackClick}>{'<'}</BackButton>
        <HeaderText>종목별 추천</HeaderText>
      </HeaderContent>

      {/* 직사각형 */}
      <GreyRectangle />
    </HeaderFrame>
  );
};

export default RecommendHeader;
