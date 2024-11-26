import React from 'react';
import styled from '@emotion/styled';

// MeasureData 전체 Layout
const MeasureDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  padding: 10px 40px 0 40px;
  width: 313px; /* 폭 고정 */
`;

// 왼쪽 Text 스타일
const LeftText = styled.div`
  width: 60px;
  flex-shrink: 0;
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
`;

// 오른쪽 Frame Layout
const RightFrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
`;

// Frame 스타일
const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

// 좌측 글자 스타일
const LeftFrameText = styled.div`
  width: 40px;
  color: var(--black, #222325);
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 중앙 사각형 컨테이너 스타일
const RectangleContainer = styled.div`
  display: flex;
  width: 150px; /* 고정 폭 */
  height: 8px;
  align-items: center;
  gap: 0; /* 사각형 사이 간격 없음 */
`;

// 파란색 사각형 스타일
const BlueRectangle = styled.div<{ widthPx: number }>`
  width: ${({ widthPx }) => `${widthPx}px`};
  height: 100%;
  background: var(--blue-3, #4a77ea);
`;

// 회색 사각형 스타일
const GreyRectangle = styled.div<{ widthPx: number }>`
  width: ${({ widthPx }) => `${widthPx}px`};
  height: 100%;
  background: var(--grey-2, #797982);
`;

// 흰색 사각형 스타일
const WhiteRectangle = styled.div<{ widthPx: number }>`
  width: ${({ widthPx }) => `${widthPx}px`};
  height: 100%;
  background: var(--white, #ffffff);
`;

// 우측 글자 스타일
const RightFrameText = styled.div`
  color: var(--black, #222325);
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: right; /* 오른쪽 정렬 */
  margin-left: auto; /* 사각형 오른쪽으로 밀어냄 */
`;

// MeasureData 컴포넌트
interface MeasureDataProps {
  leftText: string;
  topLeftText: string;
  topRightText: string;
  bottomLeftText: string;
  bottomRightText: string;
}

const MeasureData: React.FC<MeasureDataProps> = ({
  leftText,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
}) => {
  const parsePercentage = (text: string) => {
    const number = parseFloat(text.replace('%', ''));
    return isNaN(number) ? 0 : number;
  };

  const calculateWidth = (percentage: string) => {
    const number = parsePercentage(percentage);
    return (number / 100) * 150;
  };

  const topBlueWidthPx = calculateWidth(topRightText);
  const topWhiteWidthPx = 150 - topBlueWidthPx;

  const bottomGreyWidthPx = calculateWidth(bottomRightText);
  const bottomWhiteWidthPx = 150 - bottomGreyWidthPx;

  return (
    <MeasureDataContainer>
      {/* 왼쪽 텍스트 */}
      <LeftText>{leftText}</LeftText>

      {/* 오른쪽 프레임 */}
      <RightFrameContainer>
        {/* 첫 번째 프레임 */}
        <Frame>
          <LeftFrameText>{topLeftText}</LeftFrameText>
          <RectangleContainer>
            <BlueRectangle widthPx={topBlueWidthPx} />
            <WhiteRectangle widthPx={topWhiteWidthPx} />
          </RectangleContainer>
          <RightFrameText>{topRightText}</RightFrameText>
        </Frame>

        {/* 두 번째 프레임 */}
        <Frame>
          <LeftFrameText>{bottomLeftText}</LeftFrameText>
          <RectangleContainer>
            <GreyRectangle widthPx={bottomGreyWidthPx} />
            <WhiteRectangle widthPx={bottomWhiteWidthPx} />
          </RectangleContainer>
          <RightFrameText>{bottomRightText}</RightFrameText>
        </Frame>
      </RightFrameContainer>
    </MeasureDataContainer>
  );
};

export default MeasureData;
