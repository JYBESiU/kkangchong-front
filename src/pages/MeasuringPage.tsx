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

export interface MeasuringPageProps {}

/**
 * TODO
 * 1. console 지우기
 * 2. isReadyStep으로 바꾸기 => ready step 일 때 컴포넌트 호출 코드 중복되지 않게 하기
 * 3. 5 -> 4 3 2 -> (1 -> 0 -> )화면전환 0.2초 간격으로 10번 측정해서 평균내기
 * 4. PoseMeasuring&TimerMeasuring 컴포넌트에서 setState prop은 다 지우고 onComplete 함수로 처리
 * 5. PoseMeasuring 컴포넌트에서 torsoRotation -> tilt 로 변경
 * 6. 길이 측정 부분 각도로 변경
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
        return () => clearTimeout(timeoutId); // Cleanup timeout
      } else {
        // Timer has finished, proceed to next step
        console.log('Timer finished. Proceeding to next step.');
        setIsTimerActive(false);
        setTimer(5); // Reset timer for the next step
        goNextStep();
      }
    }
  }, [isTimerActive, timer]);

  useEffect(() => {
    if (currentStep === MeasuringStep.FINISH) {
      console.log('All measurements completed.');
      console.log('Summary of Measurements:');
      console.log('Arm Rotation Value:', armRotationValue);
      console.log('Original Wrist Length:', originalWristLength);
      console.log('Left Waist Rotation:', leftWaistRotationValue);
      console.log('Right Waist Rotation:', rightWaistRotationValue);
      console.log('Left Waist Tilt:', leftWaistTiltValue);
      console.log('Right Waist Tilt:', rightWaistTiltValue);
      // Add Timer measurement value
      // Add navigation to last page
    }
  }, [
    currentStep,
    armRotationValue,
    originalWristLength,
    leftWaistRotationValue,
    rightWaistRotationValue,
    leftWaistTiltValue,
    rightWaistTiltValue,
  ]);

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

  return (
    <Root>
      {isReadyStep(currentStep) && (
        <ReadyInformation step={currentStep} onNext={goNextStep} />
      )}
      {currentStep === MeasuringStep.MOVE_MEASURE && (
        <ReadyInformation step={currentStep} onNext={goNextStep} />
      )}
      {isCameraMeasureStep(currentStep) &&
        currentStep !== MeasuringStep.MOVE_MEASURE && (
          <PoseMeasuring
            key={currentStep}
            step={currentStep}
            onComplete={handleComplete}
          />
        )}
      {/**currentStep === MeasuringStep.CORE_STRENGTH_READY && <TimerMeasuring />*/}
      {/* Final Step: Display all measurements */}
      {isTimerMeasureStep(currentStep) && (
        <div>
          <h2>All measurements are complete!</h2>
          <TimerMeasuring onComplete={() => handleComplete} />
          <div>
            <h3>Summary of Measurements:</h3>
            <p>
              Original Wrist Length: {originalWristLength?.toFixed(2)} pixels
            </p>
            <p>
              Left Waist Rotation: {leftWaistRotationValue?.toFixed(2)} degrees
            </p>
            <p>
              Right Waist Rotation: {rightWaistRotationValue?.toFixed(2)}{' '}
              degrees
            </p>
            <p>Left Torso Rotation: {leftWaistTiltValue?.toFixed(2)} degrees</p>
            <p>
              Right Torso Rotation: {rightWaistTiltValue?.toFixed(2)} degrees
            </p>
          </div>
        </div>
      )}
      {currentStep === MeasuringStep.FINISH && <div>finish</div>}
    </Root>
  );
}

export default MeasuringPage;

const Root = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
`;
