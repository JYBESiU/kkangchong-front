import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Button, Text } from 'components/shared';
import { colors } from 'utils/color';
import { Icon } from 'components/IconContext';

function RecordStartPage() {
  const navigate = useNavigate();

  const handleStartButton = () => {
    navigate('/measuring');
  };

  return (
    <Root>
      <img src={'/images/memo.svg'} width={208} height={208} />
      <Text fontSize={24} fontWeight={700}>
        변화 기록하기
      </Text>

      <Text textAlign={'center'}>
        총 6단계로 카메라를 이용하여
        <br />
        사용자의 신체 능력을 측정하고
        <br />
        신체 변화를 기록해요.
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

export default RecordStartPage;

const Root = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 393px;
  height: 852px;
  background-color: ${colors.blue1};
`;

const IconOneElement = (
  <div
    style={{
      width: 88.7,
      height: 63.9,
      position: 'absolute',
      left: 113,
      top: 189,
    }}
  >
    <Icon icon="PageWithCurl" />
  </div>
);
const IconTwoElement = (
  <div
    style={{
      width: 33.1,
      height: 53.79,
      position: 'absolute',
      left: 77,
      top: 246,
    }}
  >
    <Icon icon="MagnifyingGlassTiltedRight" />
  </div>
);
