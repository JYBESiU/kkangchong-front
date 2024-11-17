import React from 'react';
import styled from '@emotion/styled';
import RecommendHeader from './RecommendHeader';

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: flex-start;
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
  return (
    <Container>
      <RecommendHeader />
    </Container>
  );
};

export default RecommendSport;
