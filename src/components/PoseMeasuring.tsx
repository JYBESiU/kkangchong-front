import { useEffect, useState } from 'react';
import { Button, Text } from './shared';
import { MeasuringStep } from 'utils/measuringStep';
import styled from '@emotion/styled';

const Root = styled.div`
  display: relative;
`;

export interface PoseMeasuringProps {
  step: MeasuringStep;
  onComplete: VoidFunction;
}

function PoseMeasuring({ step, onComplete }: PoseMeasuringProps) {
  const [count, setCount] = useState(
    step === MeasuringStep.MOVE_MEASURE ? 15 : 5
  );
  const [isChecking, setIsChecking] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    if (count > 1) {
      const countdownTimer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }

    if (count === 1) {
      setIsChecking(true);
    }
  }, [count]);

  useEffect(() => {
    if (isChecking && checkCount < 10) {
      /**
       * TODO: 0.1초 마다 pose로부터 각도 측정
       */
      const checkTimer = setInterval(() => {
        console.log('데이터 체크 중...');
        setCheckCount((prev) => prev + 1);
      }, 100);

      return () => clearInterval(checkTimer);
    }

    if (checkCount === 10) {
      /**
       * TODO: 10번 측정 후에는 평균 낸 후에 값 저장하기
       */
      setCount(5);
      setIsChecking(false);
      setCheckCount(0);
      onComplete();
    }
  }, [isChecking, checkCount]);

  return (
    <Root>
      <Text fontWeight={700}>{getNotice(step)}</Text>
      <Text fontSize={80} fontWeight={700}>
        {count}
      </Text>
    </Root>
  );
}

export default PoseMeasuring;

const getNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.MOVE_MEASURE:
      return `선에 맞춰
              뒤로 이동하세요`;
    case MeasuringStep.ARM_MEASURE:
      return `팔을 양 옆으로
              최대한 드세요`;
    case MeasuringStep.ROTATE_MEASURE_LEFT:
      return `허리를 왼쪽으로
              돌리세요`;
    case MeasuringStep.ROTATE_MEASURE_RIGHT:
      return `허리를 오른쪽으로
              돌리세요`;
    case MeasuringStep.TILT_MEASURE_LEFT:
      return `상체를 왼쪽으로
              돌리세요`;
    case MeasuringStep.TILT_MEASURE_RIGHT:
      return `상체를 오른쪽으로
              돌리세요`;
  }
};
