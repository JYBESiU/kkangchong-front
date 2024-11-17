import React from 'react';
import styled from '@emotion/styled';

// 큰 프레임 컨테이너
const MeasureHowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px; /* 텍스트와 프레임 사이 간격 */
  margin: 0 40px; /* 좌우 마진 40px */
`;

// 상단 텍스트 스타일 (고정된 텍스트)
const Title = styled.div`
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

// 프레임 컨테이너
const FrameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 작은 프레임 사이 간격 */
  width: 313px; /* 3개 프레임이 한 줄에 들어가는 너비 */
`;

// 작은 프레임
const SmallFrame = styled.div`
  display: flex;
  width: 97.6px;
  height: 97.6px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 8px;
  background: var(--blue-1, #f7f8fc);
`;

// 상단 텍스트
const SmallFrameTopText = styled.div`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 중간 텍스트
const SmallFrameMiddleText = styled.div`
  align-self: stretch;
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 하단 텍스트와 별점 컨테이너
const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 텍스트와 별 왼쪽 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  align-self: stretch;
  width: 100%; /* 하단 텍스트와 별점 전체를 채움 */
  gap: 4px; /* 텍스트와 별 사이 간격 */
`;

// 하단 텍스트
const BottomText = styled.div`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 별점 컨테이너
const StarContainer = styled.div`
  display: flex;
  gap: 1px; /* 별 사이 간격 */
  align-items: center;
`;

// 별 모양
const Star = styled.div`
  width: 10px;
  height: 10px;
  background: var(--blue3, #4a77ea); /* 색상을 blue3으로 설정 */
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
  ); /* 별 모양 */
`;

interface SmallFrameData {
  topText: string;
  middleText: string;
  stars: number /* 별 개수 */;
}

interface MeasureHowProps {
  data: SmallFrameData[];
}

const MeasureHow: React.FC<MeasureHowProps> = ({ data }) => {
  return (
    <MeasureHowContainer>
      {/* 고정된 상단 텍스트 */}
      <Title>이런 운동은 어때요?</Title>

      {/* 3x2 프레임 */}
      <FrameContainer>
        {data.map((frame, index) => (
          <SmallFrame key={index}>
            <SmallFrameTopText>{frame.topText}</SmallFrameTopText>
            <SmallFrameMiddleText>{frame.middleText}</SmallFrameMiddleText>
            <BottomContainer>
              <BottomText>추천</BottomText>
              <StarContainer>
                {Array.from({ length: frame.stars }, (_, index) => (
                  <Star key={index} />
                ))}
              </StarContainer>
            </BottomContainer>
          </SmallFrame>
        ))}
      </FrameContainer>
    </MeasureHowContainer>
  );
};

export default MeasureHow;