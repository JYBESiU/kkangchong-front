import styled from '@emotion/styled';
import { MeasuringStep } from 'utils/measuringStep';
import { Button, Text } from './shared';
import { useEffect } from 'react';

const Root = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export interface ReadyInformationProps {
  step: MeasuringStep;
  onNext: VoidFunction;
}

function ReadyInformation({ step, onNext }: ReadyInformationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTimerReady(step)) onNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Root>
      <Text textAlign="center">{getNotice(step)}</Text>
      {step === MeasuringStep.TILT_READY && (
        <Text fontSize={16} color={'blue3'}>
          측정 중 넘어지지 않도록 주의하세요
        </Text>
      )}
      {isTimerReady(step) && (
        <Button
          width={'314px'}
          height={'60px'}
          label={'측정시작'}
          onClick={onNext}
        />
      )}
    </Root>
  );
}

export default ReadyInformation;

const isTimerReady = (step: MeasuringStep) =>
  [
    MeasuringStep.CORE_STRENGTH_READY,
    MeasuringStep.ARM_STRENGTH_READY,
  ].includes(step);

const getNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.MOVE_READY:
      return `카메라에 상반신이 모두 나오도록
              선에 맞춰 뒤로 이동하세요.
              15초 후 측정을 시작할게요.`;
    case MeasuringStep.ARM_READY:
      return `팔을 양 옆으로 들 수 있는 만큼
              최대한 들어주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.ROTATE_READY:
      return `허리를 좌우로
              돌려주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.TILT_READY:
      return `상체를 좌우로
              기울여주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.CORE_STRENGTH_READY:
      return `코어 힘을 측정합니다. (최대 1분)
              등을 등받이에서 떼고
              허리를 곧게 세운 시간을 측정하세요.
              측정 시작을 누르면 타이머가 시작됩니다.`;
    case MeasuringStep.ARM_STRENGTH_READY:
      return `팔의 근력을 측정합니다. (최대 1분)
              팔을 정면으로 뻗고
              기다릴 수 있는 시간을 측정하세요.
              측정 시작을 누르면 타이머가 시작됩니다.`;
  }
};
