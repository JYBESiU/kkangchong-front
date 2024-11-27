import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button, Text } from './shared';
import { colors } from 'utils/color';
import { useNavigate } from 'react-router-dom';

export interface CountMeasuringProps {
  onComplete: (data: number) => void;
}

function CountMeasuring({ onComplete }: CountMeasuringProps) {
  const [stage, setStage] = useState<
    'ready' | 'start' | 'counting' | 'end' | 'input'
  >('ready');
  const [time, setTime] = useState(0);
  const [count, setCount] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    switch (stage) {
      case 'ready':
        timer = setTimeout(() => setStage('start'), 2000);
        break;

      case 'start':
        timer = setTimeout(() => setStage('counting'), 2000);
        break;

      case 'counting':
        timer = setInterval(() => {
          setTime((prev) => {
            if (prev >= 10) {
              clearInterval(timer);
              setStage('end');
              return prev;
            }
            return +(prev + 0.01).toFixed(2); // 소수점 1자리 고정
          });
        }, 10);
        break;

      case 'end':
        timer = setTimeout(() => setStage('input'), 2000);
        break;

      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [stage]);

  const handleKeyPress = (value: string) => {
    if (value === 'submit') {
      onComplete(Number(count));
      return;
    }
    setCount((prev) => prev + value);
  };

  const handleRemove = () => {
    setCount((prev) => prev.slice(0, -1));
  };

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate('/');
  };

  return (
    <Root>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '323px',
        }}
      >
        <Button
          height={60}
          label={'취소'}
          onClick={handleToHome}
          variant="text"
          labelSize={16}
        />
      </div>
      {stage === 'ready' && (
        <Text fontSize={80} fontWeight={700} color="blue3">
          준비
        </Text>
      )}
      {stage === 'start' && (
        <Text fontSize={80} fontWeight={700} color="blue3">
          시작
        </Text>
      )}
      {stage === 'counting' && (
        <Text fontSize={80} fontWeight={700} color="blue3">
          {time.toFixed(2)}초
        </Text>
      )}
      {stage === 'end' && (
        <Text fontSize={80} fontWeight={700} color="blue3">
          종료
        </Text>
      )}
      {stage === 'input' && (
        <Wrapper>
          <Top>
            <Text>10초간 몇 번 팔을 뻗었나요?</Text>
            <Text fontSize={80} fontWeight={700} color="blue3">
              {count || '0'}회
            </Text>
          </Top>
          <Bottom>
            <Submit onClick={() => handleKeyPress('submit')}>
              <Text color="white">결과보기</Text>
            </Submit>
            <KeyPad>
              {[...Array(9)].map((_, i) => (
                <Key key={i + 1} onClick={() => handleKeyPress(String(i + 1))}>
                  <Text fontSize={24}>{i + 1}</Text>
                </Key>
              ))}
              <Key></Key>
              <Key onClick={() => handleKeyPress('0')}>
                <Text fontSize={24}>0</Text>
              </Key>
              <Key onClick={handleRemove}>
                <Text fontSize={24}>지움</Text>
              </Key>
            </KeyPad>
          </Bottom>
        </Wrapper>
      )}
    </Root>
  );
}

export default CountMeasuring;

const Root = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const Top = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Bottom = styled.div`
  width: 100%;
`;

const Submit = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${colors.blue3};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KeyPad = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  padding: 36px 36px 20px 36px;
`;

const Key = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;
