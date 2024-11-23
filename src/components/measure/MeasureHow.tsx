import React from 'react';
import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from 'components/shared';

const MeasureHowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding: 0 40px;
  margin-bottom: 30px;
`;

const SmallFrame = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: ${colors.blue1};
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 4px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.div<{ isValid: boolean }>`
  width: 10px;
  height: 10px;
  background: ${({ isValid }) => (isValid ? colors.blue3 : colors.grey1)};
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

interface SmallFrameData {
  name: string;
  stars: number;
  onClick: () => void;
}

interface MeasureHowProps {
  data: SmallFrameData[];
}

const MeasureHow: React.FC<MeasureHowProps> = ({ data }) => {
  return (
    <MeasureHowContainer>
      {data.map((frame, index) => (
        <SmallFrame key={index} onClick={frame.onClick}>
          <Text fontSize={14}>{frame.name}</Text>
          <BottomContainer>
            <Text fontSize={8}>추천도</Text>
            <StarContainer>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} isValid={index < frame.stars} />
              ))}
            </StarContainer>
          </BottomContainer>
        </SmallFrame>
      ))}
    </MeasureHowContainer>
  );
};

export default MeasureHow;
