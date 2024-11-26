import React, { useEffect, useState, useCallback, useContext } from 'react';
import PoseMeasuring from 'components/PoseMeasuring';
import ReadyInformation from 'components/ReadyInformation';
import TimerMeasuring from 'components/TimerMeasuring';
import {
  isCameraMeasureStep,
  isReadyStep,
  isTimerMeasureStep,
  MeasuringStep,
} from 'utils/measuringStep';
import styled from '@emotion/styled';
import { MeasurementContext } from 'components/MeasurementContext';
import CountMeasuring from 'components/CountMeasuring';

export interface MeasuringPageProps {}

/**
 * TODO
 * 3. 5 -> 4 3 2 -> (1 -> 0 -> )화면전환 0.2초 간격으로 10번 측정해서 평균내기
 * 4. PoseMeasuring&TimerMeasuring 컴포넌트에서 setState prop은 다 지우고 onComplete 함수로 처리
 * 7. timer 측정 값 state 추가
 */

function MeasuringPage({}: MeasuringPageProps) {
  const [currentStep, setCurrentStep] = useState<MeasuringStep>(
    MeasuringStep.MOVE_READY
  );
  const [timer, setTimer] = useState<number>(5); // 5 seconds countdown
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // State for measurements
  const context = useContext(MeasurementContext);
  if (!context) {
    throw new Error('MeasuringPage must be used within a MeasurementProvider.');
  }
  const {
    armRotationValue,
    originalWristLength,
    leftWaistRotationValue,
    rightWaistRotationValue,
    leftWaistTiltValue,
    rightWaistTiltValue,
    setArmRotationValue,
    setOriginalWristLength,
    setLeftWaistRotationValue,
    setRightWaistRotationValue,
    setLeftWaistTiltValue,
    setRightWaistTiltValue,
    coreDuration,
    setCoreDuration,
    punchCount,
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
        setOriginalWristLength(data);
        break;
      case MeasuringStep.ROTATE_MEASURE_LEFT:
        setLeftWaistRotationValue(data);
        break;
      case MeasuringStep.ROTATE_MEASURE_RIGHT:
        setRightWaistRotationValue(data);
        break;
      case MeasuringStep.TILT_MEASURE_LEFT:
        setLeftWaistTiltValue(data);
        break;
      case MeasuringStep.TILT_MEASURE_RIGHT:
        setRightWaistTiltValue(data);
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
    }
  }, [currentStep]);

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
  width: 100%;
`;
