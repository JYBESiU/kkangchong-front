import { useEffect, useRef, useState } from 'react';
import { Button, Text } from './shared';
import styled from '@emotion/styled';

export interface TimerMeasuringProps {
  onComplete: VoidFunction;
}

function TimerMeasuring({ onComplete }: TimerMeasuringProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
<<<<<<< HEAD
  // Number((time/100).toFixed(1)) 이 값으로 설정하기
=======
>>>>>>> f535302 (Screen flow (#11))
  const maxTime = 5999;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= maxTime) {
          clearInterval(timer);
          return prevTime;
        }
        return prevTime + 1;
      });
    }, 10);
    timerRef.current = timer;

    return () => clearInterval(timer);
  }, []);

  const handleFinish = () => {
    setIsFinished(true);
    clearInterval(timerRef.current!);
  };

  const handleRetry = () => {
    setTime(0);
    setIsFinished(false);
    clearInterval(timerRef.current!);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= maxTime) {
          clearInterval(timer);
          return prevTime;
        }
        return prevTime + 1;
      });
    }, 10);
    timerRef.current = timer;
  };

  const seconds = String(Math.floor(time / 100)).padStart(1, '0');
  const milliseconds = Math.floor((time % 100) / 10);

  return (
    <Root>
      <Flex>
        <Text fontSize={80} fontWeight={700} color={'blue3'}>
          {seconds}.{milliseconds} 초
        </Text>
        <Button
          width={314}
          height={60}
          label={isFinished ? '다음' : '측정 완료'}
          onClick={isFinished ? onComplete : handleFinish}
        />
        <Button
          variant={'secondary'}
          width={314}
          height={60}
          label={'다시하기'}
          onClick={handleRetry}
        />
      </Flex>
      {isFinished && (
        <Wrapper>
          <Text>코어 힘 측정이 {'\n'}완료되었습니다</Text>
        </Wrapper>
      )}
    </Root>
  );
}

export default TimerMeasuring;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const Root = styled.div`
  position: relative;
  height: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 174px;
  width: 100%;
  text-align: center;
`;
