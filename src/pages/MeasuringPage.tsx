import styled from '@emotion/styled';
import PoseMeasuring from 'components/PoseMeasuring';
import ReadyInformation from 'components/ReadyInformation';
import TimerMeasuring from 'components/TimerMeasuring';
import { useState } from 'react';
import {
  isCameraMeasureStep,
  isReadyStep,
  isTimerMeasureStep,
  MeasuringStep,
} from 'utils/measuringStep';

export interface MeasuringPageProps {}

function MeasuringPage({}: MeasuringPageProps) {
  const [currentStep, setCurrentStep] = useState(MeasuringStep.MOVE_READY);
  const goNextStep = () => setCurrentStep((prev) => prev + 1);

  const handleComplete = () => {
    goNextStep();
  };

  return (
    <Root>
      {isReadyStep(currentStep) ? (
        <ReadyInformation step={currentStep} onNext={goNextStep} />
      ) : isCameraMeasureStep(currentStep) ? (
        <PoseMeasuring step={currentStep} onComplete={handleComplete} />
      ) : isTimerMeasureStep(currentStep) ? (
        <TimerMeasuring onComplete={handleComplete} />
      ) : (
        <></>
      )}
    </Root>
  );
}

export default MeasuringPage;

const Root = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
`;
