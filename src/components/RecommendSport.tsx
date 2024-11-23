import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Star, { Button, Text } from './shared';
import { colors } from 'utils/color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;

  gap: 20px;
  box-sizing: border-box;

  overflow-y: auto;
  overflow-x: hidden;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Header = styled.div`
  padding: 8px 12px;
  display: flex;
  gap: 4px;
  width: 100%;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 22px;
  gap: 20px;
`;

const GreyBox = styled.div`
  width: 100%;
  height: 215px;
  flex-shrink: 0;
  background: var(--grey-1, #e9e9e9);
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Flex2 = styled(Flex)`
  gap: 4px;
`;

const Reason = styled.div`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.blue1};
`;

interface RecommendSportProps {
  sports: string;
  score?: number;
  reason?: string;
  explanation?: string;
  handleBackClick: VoidFunction;
}
const RecommendSport = ({
  sports,
  score = 3,
  reason,
  explanation,
  handleBackClick,
}: RecommendSportProps) => {
  const navigate = useNavigate();

  const handleBottomButtonClick = () => {
    navigate('/clubs');
  };

  return (
    <Container>
      <Header>
        <img src="/images/back_button.svg" onClick={handleBackClick} />
        <Text>종목별 추천</Text>
      </Header>

      <Contents>
        <GreyBox />
        <Text fontSize={24} fontWeight={700}>
          {sports}
        </Text>
        <Flex2>
          <Text fontSize={16}>추천도</Text>
          <Flex>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} isValid={index < score} size={20} />
            ))}
          </Flex>
        </Flex2>
        <Reason>
          <Text fontSize={16}>{reason}</Text>
        </Reason>

        <Text fontWeight={700}>운동 설명</Text>
        <Text fontSize={16}>{explanation}</Text>
      </Contents>

      <Button
        width={312}
        height={60}
        label={'이전으로'}
        onClick={handleBottomButtonClick}
      />
    </Container>
  );
};

export default RecommendSport;
