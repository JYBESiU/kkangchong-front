import { useEffect, useState, useContext } from 'react';
import PoseMeasuring from 'components/PoseMeasuring';
import ReadyInformation from 'components/ReadyInformation';
import TimerMeasuring from 'components/TimerMeasuring';
import { isCameraMeasureStep, isReadyStep } from 'utils/measuring';
import { MeasuringStep } from 'types';
import styled from '@emotion/styled';
import { MeasurementContext } from 'components/MeasurementContext';
import CountMeasuring from 'components/CountMeasuring';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { measureKey, saveToLocalStorage } from 'utils/storage';

export interface MeasuringPageProps {}

function MeasuringPage({}: MeasuringPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPage = searchParams.get('next') || 'result';

  const [currentStep, setCurrentStep] = useState<MeasuringStep>(
    MeasuringStep.MOVE_READY
  );
  const [timer, setTimer] = useState<number>(5); // 5 seconds countdown
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const context = useContext(MeasurementContext);
  if (!context) {
    throw new Error('MeasuringPage must be used within a MeasurementProvider.');
  }
  const {
    setArmRotationValue,
    setOriginalShoulderLength,
    setLeftRotationValue,
    setRightRotationValue,
    setLeftTiltValue,
    setRightTiltValue,
    setCoreDuration,
    setPunchCount,
  } = context;

  // Function to navigate to the next step
  const goNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleComplete = (data: number) => {
    switch (currentStep) {
      case MeasuringStep.ARM_MEASURE:
        setArmRotationValue(data);
        break;
      case MeasuringStep.ROTATE_MEASURE_FRONT:
        setOriginalShoulderLength(data);
        break;
      case MeasuringStep.ROTATE_MEASURE_LEFT:
        setLeftRotationValue(data);
        break;
      case MeasuringStep.ROTATE_MEASURE_RIGHT:
        setRightRotationValue(data);
        break;
      case MeasuringStep.TILT_MEASURE_LEFT:
        setLeftTiltValue(data);
        break;
      case MeasuringStep.TILT_MEASURE_RIGHT:
        setRightTiltValue(data);
        break;
      case MeasuringStep.CORE_STRENGTH_TIMER:
        setCoreDuration(data);
        break;
      case MeasuringStep.PUNCH_TIMER:
        setPunchCount(data);
        break;
      default:
        break;
    }
    goNextStep();
  };

  useEffect(() => {
    if (isTimerActive) {
      if (timer > 0) {
        console.log(`Timer active: ${timer} seconds remaining.`);
        const timeoutId = setTimeout(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timeoutId);
      } else {
        // Timer has finished, proceed to next step
        console.log('Timer finished. Proceeding to the next step.');
        setIsTimerActive(false);
        setTimer(5); // Reset timer for the next step
        //goNextStep();
      }
    }
  }, [isTimerActive, timer]);

  useEffect(() => {
    if (currentStep === MeasuringStep.FINISH) {
      const {
        leftArmRotationValue,
        rightArmRotationValue,
        leftRotationValue,
        rightRotationValue,
        leftTiltValue,
        rightTiltValue,
        coreDuration,
        punchCount,
      } = context;
      saveToLocalStorage(measureKey, {
        leftArmRotationValue,
        rightArmRotationValue,
        leftRotationValue,
        rightRotationValue,
        leftTiltValue,
        rightTiltValue,
        coreDuration,
        punchCount,
      });

      navigate(`/${nextPage}`); // next parameter에 따라 페이지 이동
    }
  }, [currentStep, nextPage]);

  return (
    <Root>
      {isReadyStep(currentStep) && (
        <ReadyInformation step={currentStep} onNext={goNextStep} />
      )}
      {isCameraMeasureStep(currentStep) && (
        <PoseMeasuring
          key={currentStep}
          step={currentStep}
          onComplete={handleComplete}
        />
      )}
      {currentStep === MeasuringStep.CORE_STRENGTH_TIMER && (
        <TimerMeasuring onComplete={handleComplete} />
      )}
      {currentStep === MeasuringStep.PUNCH_TIMER && (
        <CountMeasuring onComplete={handleComplete} />
      )}
      {currentStep === MeasuringStep.FINISH && <div>finish</div>}
    </Root>
  );
}

export default MeasuringPage;

const Root = styled.div`
  height: 100vh;
  width: 393px;
`;
