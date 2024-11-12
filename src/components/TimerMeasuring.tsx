import { useEffect, useState } from 'react';
import { Button, Text } from './shared';
import styled from '@emotion/styled';

export interface TimerMeasuringProps {
  onComplete: VoidFunction;
}

function TimerMeasuring({ onComplete }: TimerMeasuringProps) {
  const [time, setTime] = useState(0);
  const maxTime = 5999;

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

    return () => clearInterval(timer);
  }, []);

  const handleRetry = () => {
    setTime(0);
  };

  const seconds = String(Math.floor(time / 100)).padStart(2, '0');
  const milliseconds = String(time % 100).padStart(2, '0');

  return (
    <Root>
      <Text fontSize={80} fontWeight={700} color={'blue3'}>
        {seconds}.{milliseconds}
      </Text>
      <Button
        width={314}
        height={60}
        label={'측정 완료'}
        onClick={onComplete}
      />
      <Button
        variant={'secondary'}
        width={314}
        height={60}
        label={'다시하기'}
        onClick={handleRetry}
      />
    </Root>
  );
}

export default TimerMeasuring;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
