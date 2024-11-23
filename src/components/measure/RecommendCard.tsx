import React from 'react';
import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from 'components/shared';
import { useNavigate } from 'react-router-dom';

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

interface RecommendCardProps {
  name: string;
  score: number;
}

const RecommendCard = ({ name, score }: RecommendCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recommend/${name}`);
  };

  return (
    <SmallFrame onClick={handleClick}>
      <Text fontSize={14}>{name}</Text>
      <BottomContainer>
        <Text fontSize={8}>추천도</Text>
        <StarContainer>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} isValid={index < score} />
          ))}
        </StarContainer>
      </BottomContainer>
    </SmallFrame>
  );
};

export default RecommendCard;
