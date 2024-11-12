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
    <div>
      {isReadyStep(currentStep) ? (
        <ReadyInformation step={currentStep} onNext={goNextStep} />
      ) : isCameraMeasureStep(currentStep) ? (
        <PoseMeasuring step={currentStep} onComplete={handleComplete} />
      ) : isTimerMeasureStep(currentStep) ? (
        <TimerMeasuring onComplete={handleComplete} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default MeasuringPage;
