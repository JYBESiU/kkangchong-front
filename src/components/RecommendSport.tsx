import React from 'react';
import styled from '@emotion/styled';
import RecommendHeader from './RecommendHeader';
import RecommendMid from './RecommendMid';
import RecommendBottom from './RecommendBottom';

// 전체 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 위, 중간, 아래 컴포넌트 배치 */
  width: 393px;
  height: 852px;
  gap: 20px;
  border: 1px solid black;
  box-sizing: border-box;

  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const RecommendSport: React.FC = () => {
  const handleBackClick = () => {
    alert('뒤로가기 버튼 클릭됨');
  };

  const handleBottomButtonClick = () => {
    alert('Bottom 버튼 클릭됨');
  };

  return (
    <Container>
      {/* Header */}
      <RecommendHeader onBackClick={handleBackClick} />

      {/* Mid */}
      <RecommendMid
        title="휠체어 농구"
        summary="휠체어 농구는 00님의 이러이러한 점을 보완해줄 수 있는 맞춤운동이에요."
        descriptionTitle="운동 설명"
        descriptionContent="휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명 휠체어 농구에 대한 설명"
        effectsTitle="운동 효과"
        effectsContent="휠체어 농구에 대한 운동 효과 (이미지 제작 예정)"
        stars={3}
      />

      {/* Bottom */}
      <RecommendBottom onClick={handleBottomButtonClick} />
    </Container>
  );
};

export default RecommendSport;
