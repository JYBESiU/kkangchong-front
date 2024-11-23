import React from 'react';
import styled from '@emotion/styled';

// 전체 컨테이너 스타일
const RecommendMidContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 요소 간 간격 */
  align-items: center; /* 가로 중앙 정렬 */
  width: 329px; /* 폭 고정 */
  margin: 0 auto; /* 수평 중앙 */
`;

const GreyBox = styled.div`
  width: 329px;
  height: 215px;
  flex-shrink: 0;
  background: var(--grey-1, #e9e9e9);
`;

const Title = styled.div`
  align-self: stretch;
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const RecommendationRow = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 추천도 텍스트와 별 사이 간격 */
  align-self: stretch; /* 프레임 왼쪽에 붙이기 */
`;

const RecommendationTitle = styled.div`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 5px; /* 별 사이 간격 */
  align-items: center;
`;

const Star = styled.div`
  width: 20px; /* 별 크기 */
  height: 20px;
  background: var(--blue3, #4a77ea);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

const Summary = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--blue-1, #f7f8fc);
  flex: 1 0 0;
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SectionTitle = styled.div`
  align-self: stretch;
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SectionContent = styled.div`
  align-self: stretch;
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// Props 정의
export interface RecommendMidProps {
  title: string;
  summary: string;
  descriptionTitle: string;
  descriptionContent: string;
  effectsTitle: string;
  effectsContent: string;
  stars: number; // 별 개수 추가
}

const RecommendMid: React.FC<RecommendMidProps> = ({
  title,
  summary,
  descriptionTitle,
  descriptionContent,
  effectsTitle,
  effectsContent,
  stars,
}: RecommendMidProps) => {
  return (
    <RecommendMidContainer>
      {/* 직사각형 박스 */}
      <GreyBox />

      {/* 운동 제목 */}
      <Title>{title}</Title>

      {/* 추천도와 별 */}
      <RecommendationRow>
        <RecommendationTitle>추천도</RecommendationTitle>
        <StarsContainer>
          {[...Array(stars)].map((_, index) => (
            <Star key={index} />
          ))}
        </StarsContainer>
      </RecommendationRow>

      {/* 요약 */}
      <Summary>{summary}</Summary>

      {/* 운동 설명 */}
      <SectionTitle>{descriptionTitle}</SectionTitle>
      <SectionContent>{descriptionContent}</SectionContent>

      {/* 운동 효과 */}
      <SectionTitle>{effectsTitle}</SectionTitle>
      <SectionContent>{effectsContent}</SectionContent>
    </RecommendMidContainer>
  );
};

export default RecommendMid;
