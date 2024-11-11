import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Button, Text } from 'components/shared';
import { colors } from 'utils/color';

function Home() {
  const navigate = useNavigate();

  const handleStartButton = () => {
    navigate('/measuring');
  };

  return (
    <Root>
      <Text fontSize={24} fontWeight={700}>
        AI 맞춤 운동 추천
      </Text>
      <Text textAlign={'center'}>
        총 6단계로 카메라를 이용하여
        <br />
        사용자의 신체 능력을 측정하고
        <br />
        맞춤 운동을 추천해줘요
      </Text>
      <Button
        width={'314px'}
        height={'60px'}
        label={'시작하기'}
        onClick={handleStartButton}
      />
    </Root>
  );
}

export default Home;

const Root = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.blue1};
`;
