import styled from '@emotion/styled';
import { isTimerReadyStep, MeasuringStep } from 'utils/measuringStep';
import { Button, Text } from './shared';
import { useEffect, useState } from 'react';
import SubNoticeText from './SubNoticeLineBreak';
import { Icon } from './IconContext';
import { useNavigate } from 'react-router-dom';

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
    if (!isTimerReadyStep(step)) {
      const timer = setTimeout(() => {
        onNext();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step, onNext]);

  const [isWindow, setIsWindow] = useState<boolean>(false);
  useEffect(() => {
    setIsWindow(true);
  }, []);

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate('/');
  };

  return (
    <Root>
      {step === MeasuringStep.MOVE_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '64px',
              left: '323px',
            }}
          >
            <Button
              height={60}
              label={'취소'}
              onClick={handleToHome}
              variant="text"
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper1" />
          </div>
          <video
            src="/videos/Start.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}
      {step === MeasuringStep.ARM_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '64px',
              left: '323px',
            }}
          >
            <Button
              height={60}
              label={'취소'}
              onClick={handleToHome}
              variant="text"
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper2" />
          </div>
          <video
            src="/videos/Armraise.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}
      {step === MeasuringStep.ROTATE_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper3" />
          </div>
          <video
            src="/videos/Turnwaist.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}
      {step === MeasuringStep.TILT_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper4" />
          </div>
          <video
            src="/videos/Tiltbody.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}
      {step === MeasuringStep.CORE_STRENGTH_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper5" />
          </div>
          <video
            src="/videos/Core.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}
      {step === MeasuringStep.PUNCH_READY && isWindow && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '130px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Icon icon="Stepper6" />
          </div>
          <video
            src="/videos/Armstretch.mp4"
            autoPlay
            loop
            muted
            height="376"
            width="671"
          />
        </div>
      )}

      <Text textAlign="center">{getNotice(step)}</Text>
      <SubNoticeText step={step} />

      {isTimerReadyStep(step) && (
        <Button
          width={'314px'}
          height={'60px'}
          label={'시작하기'}
          onClick={onNext}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: '323px',
        }}
      >
        <Button
          height={60}
          label={'취소'}
          onClick={handleToHome}
          variant="text"
        />
      </div>
    </Root>
  );
}

export default ReadyInformation;

const getNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.MOVE_READY:
      return `카메라에 상반신이 모두 나오도록
              선에 맞춰 뒤로 이동하세요.
              15초 후 측정이 시작됩니다.`;
    case MeasuringStep.ARM_READY:
      return `팔을 양 옆으로 들 수 있는 만큼
              최대한 들어주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.ROTATE_READY:
      return `허리를 편 후 정면을 바라보세요.
              이후 손을 어깨에 올리고
              허리를 한쪽으로 돌려주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.TILT_READY:
      return `어깨에 손을 올리고
              상체를 한쪽으로 기울여주세요.
              5초 후 촬영됩니다.`;
    case MeasuringStep.CORE_STRENGTH_READY:
      return `코어 힘을 측정합니다. (최대 1분)
              등을 등받이에서 떼고
              허리를 곧게 세운
              시간을 측정하세요.`;
    case MeasuringStep.PUNCH_READY:
      return `순발력을 측정합니다.
              영상과 같이 10초 동안
              팔을 최대한 빠르게 반복하여 뻗고
              뻗은 횟수를 직접 입력하세요.`;
  }
};

export const getSubNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.ARM_READY:
      return `어깨와 팔꿈치가 보여야 합니다.`;
    case MeasuringStep.ROTATE_READY:
      return `손을 어깨에 올리기 어려운 경우\n어깨의 방향에 따라 손을 이동해주세요.`;
    case MeasuringStep.TILT_READY:
      return `측정 중 넘어지지 않도록 주의하세요!\n손을 어깨에 올리기 어려운 경우\n어깨의 방향에 따라 손을 이동해주세요.`;
    default:
      ``;
  }
};
