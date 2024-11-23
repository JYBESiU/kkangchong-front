import styled from '@emotion/styled';
import { colors } from 'utils/color';
import Star, { Text } from 'components/shared';

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

interface RecommendCardProps {
  name: string;
  score: number;
  handleClick: VoidFunction;
}

const RecommendCard = ({ name, score, handleClick }: RecommendCardProps) => {
  return (
    <SmallFrame onClick={handleClick}>
      <Text fontSize={14}>{name}</Text>
      <BottomContainer>
        <Text fontSize={8}>추천도</Text>
        <StarContainer>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} isValid={index < score} size={10} />
          ))}
        </StarContainer>
      </BottomContainer>
    </SmallFrame>
  );
};

export default RecommendCard;
