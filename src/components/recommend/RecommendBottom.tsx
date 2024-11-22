import React from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.div`
  display: flex;
  width: 313px; /* 버튼 폭 */
  height: 59px; /* 버튼 높이 */
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--blue-3, #4a77ea);
  color: #fff;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 글꼴 높이를 명시적으로 지정 */
  cursor: pointer; /* 클릭 가능한 버튼 */
  margin: 30px 0 60px 0;
  box-sizing: border-box; /* 패딩 포함 계산 */
  overflow: hidden; /* 텍스트 넘침 방지 */
  flex-shrink: 0; /* flex 컨테이너에서 크기 줄어들지 않도록 설정 */
`;

interface RecommendBottomProps {
  onClick: () => void;
}

const RecommendBottom: React.FC<RecommendBottomProps> = ({ onClick }) => {
  return <ButtonContainer onClick={onClick}>동호회 신청하기</ButtonContainer>;
};

export default RecommendBottom;
