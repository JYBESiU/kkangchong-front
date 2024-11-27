import { useEffect, useRef, useState } from 'react';
import { Button, Text } from './shared';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export interface TimerMeasuringProps {
  onComplete: (data: number) => void;
}

function TimerMeasuring({ onComplete }: TimerMeasuringProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [stage, setStage] = useState<'ready' | 'start' | 'counting'>('ready');
  const [time, setTime] = useState(0);

  const maxTime = 5999;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let stageTimer: NodeJS.Timeout;
    if (stage === 'ready') {
      stageTimer = setTimeout(() => setStage('start'), 2000);
      return () => clearTimeout(stageTimer);
    } else if (stage === 'start') {
      stageTimer = setTimeout(() => setStage('counting'), 2000);
      return () => clearTimeout(stageTimer);
    } else if (stage === 'counting') {
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
    } else {
    }
  }, [stage]);

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
        <Flex>
          <Text fontSize={80} fontWeight={700} color={'blue3'}>
            {seconds}.{milliseconds} 초
          </Text>
          <Button
            width={314}
            height={60}
            label={isFinished ? '다음' : '측정 완료'}
            onClick={
              isFinished
                ? () => onComplete(Number((time / 100).toFixed(1)))
                : handleFinish
            }
          />
          <Button
            variant={'secondary'}
            width={314}
            height={60}
            label={'다시하기'}
            onClick={handleRetry}
          />
        </Flex>
      )}
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 174px;
  width: 100%;
  text-align: center;
`;
