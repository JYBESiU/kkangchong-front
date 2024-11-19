import React, { useEffect, useState, useCallback } from 'react';
import PoseMeasuring from 'components/PoseMeasuring';
import ReadyInformation from 'components/ReadyInformation';
import TimerMeasuring from 'components/TimerMeasuring';
import { isTimerMeasureStep, MeasuringStep } from 'utils/measuringStep';
import styled from '@emotion/styled';

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
  const [originalShoulderLength, setOriginalShoulderLength] = useState<
    number | null
  >(null);
  const [originalWristLength, setOriginalWristLength] = useState<number | null>(
    null
  );
  const [leftWaistRotationValue, setLeftWaistRotationValue] = useState<
    number | null
  >(null);
  const [rightWaistRotationValue, setRightWaistRotationValue] = useState<
    number | null
  >(null);
  const [leftTorsoRotationValue, setLeftTorsoRotationValue] = useState<
    number | null
  >(null);
  const [rightTorsoRotationValue, setRightTorsoRotationValue] = useState<
    number | null
  >(null);
  const [leftArmRotationValue, setLeftArmRotationValue] = useState<
    number | null
  >(null);
  const [rightArmRotationValue, setRightArmRotationValue] = useState<
    number | null
  >(null);

  // Function to navigate to the next step
  const goNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  /**
   * TODO: 아래 함수와 같이 스탭별로 setState 호출하기 => 데이터 변경
   */
  // Handle completion from PoseMeasuring
  // const handleComplete =  (step: MeasuringStep) => (data: number) => () => {
  //   console.log('Measurement Complete for step:', MeasuringStep[currentStep]);

  //   if (step === MeasuringStep.ROTATE_MEASURE_LEFT) {
  //     setLeftWaistRotationValue(data)
  //   }

  //   goNextStep();

  // }
  const handleComplete = () => {
    console.log('Measurement Complete for step:', MeasuringStep[currentStep]);

    goNextStep();
  };

  useEffect(() => {
    if (currentStep === MeasuringStep.FINISH) {
      /**
       * 측정한 값 한 번에 콘솔 출력하기(타이머 값 포함)
       */
    }
  }, [currentStep]);

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

  // TODO: 여기 지우기
  // useEffect(() => {
  //   // Print all measurements when all steps are complete
  //   const allStepsComplete = !stepSequence.includes(currentStep);

  //   if (allStepsComplete) {
  //     console.log('All measurements completed.');
  //     console.log('Summary of Measurements:');
  //     console.log('Original Shoulder Length:', originalShoulderLength);
  //     console.log('Original Wrist Length:', originalWristLength);
  //     console.log('Left Waist Rotation:', leftWaistRotationValue);
  //     console.log('Right Waist Rotation:', rightWaistRotationValue);
  //     console.log('Left Torso Rotation:', leftTorsoRotationValue);
  //     console.log('Right Torso Rotation:', rightTorsoRotationValue);
  //     console.log('Left Arm Rotation:', leftArmRotationValue);
  //     console.log('Right Arm Rotation:', rightArmRotationValue);
  //   }
  // }, [
  //   currentStep,
  //   originalShoulderLength,
  //   originalWristLength,
  //   leftWaistRotationValue,
  //   rightWaistRotationValue,
  //   leftTorsoRotationValue,
  //   rightTorsoRotationValue,
  //   leftArmRotationValue,
  //   rightArmRotationValue,
  // ]);

  return (
    <Root>
      {currentStep === MeasuringStep.MOVE_READY && (
        <ReadyInformation step={MeasuringStep.MOVE_READY} onNext={goNextStep} />
      )}
      {currentStep === MeasuringStep.MOVE_MEASURE && (
        <PoseMeasuring
          step={MeasuringStep.MOVE_MEASURE}
          onComplete={() => {
            console.log('Completed MOVE_MEASURE. Starting timer.');
            // After MOVE_MEASURE, start the timer
            setIsTimerActive(true);
          }}
          setOriginalShoulderLength={setOriginalShoulderLength}
        />
      )}
      {currentStep === MeasuringStep.ARM_READY && (
        <ReadyInformation step={MeasuringStep.ARM_READY} onNext={goNextStep} />
      )}
      {currentStep === MeasuringStep.ARM_MEASURE && (
        <PoseMeasuring
          step={MeasuringStep.ARM_MEASURE}
          onComplete={handleComplete}
          setLeftArmRotationValue={setLeftArmRotationValue}
          setRightArmRotationValue={setRightArmRotationValue}
        />
      )}
      {currentStep === MeasuringStep.ROTATE_READY && (
        <ReadyInformation
          step={MeasuringStep.ROTATE_READY}
          onNext={goNextStep}
        />
      )}
      {currentStep === MeasuringStep.ROTATE_MEASURE_FRONT && (
        <PoseMeasuring
          step={MeasuringStep.ROTATE_MEASURE_FRONT}
          onComplete={handleComplete}
          setOriginalWristLength={setOriginalWristLength}
        />
      )}
      {currentStep === MeasuringStep.ROTATE_MEASURE_LEFT && (
        <PoseMeasuring
          step={MeasuringStep.ROTATE_MEASURE_LEFT}
          onComplete={handleComplete}
          originalWristLength={originalWristLength}
          setLeftWaistRotationValue={setLeftWaistRotationValue}
        />
      )}
      {currentStep === MeasuringStep.ROTATE_MEASURE_RIGHT && (
        <PoseMeasuring
          step={MeasuringStep.ROTATE_MEASURE_RIGHT}
          onComplete={handleComplete}
          originalWristLength={originalWristLength}
          setRightWaistRotationValue={setRightWaistRotationValue}
        />
      )}
      {currentStep === MeasuringStep.TILT_READY && (
        <ReadyInformation step={MeasuringStep.TILT_READY} onNext={goNextStep} />
      )}
      {currentStep === MeasuringStep.TILT_MEASURE_LEFT && (
        <PoseMeasuring
          step={MeasuringStep.TILT_MEASURE_LEFT}
          onComplete={handleComplete}
          setLeftTorsoRotationValue={setLeftTorsoRotationValue}
        />
      )}
      {currentStep === MeasuringStep.TILT_MEASURE_RIGHT && (
        <PoseMeasuring
          step={MeasuringStep.TILT_MEASURE_RIGHT}
          onComplete={handleComplete}
          setRightTorsoRotationValue={setRightTorsoRotationValue}
        />
      )}
      {/**currentStep === MeasuringStep.CORE_STRENGTH_READY && <TimerMeasuring />*/}
      {/* Final Step: Display all measurements */}
      {isTimerMeasureStep(currentStep) && (
        <div>
          <h2>All measurements are complete!</h2>
          <TimerMeasuring onComplete={handleComplete} />
          <div>
            <h3>Summary of Measurements:</h3>
            <p>
              Original Shoulder Length: {originalShoulderLength?.toFixed(2)}{' '}
              pixels
            </p>
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
            <p>
              Left Torso Rotation: {leftTorsoRotationValue?.toFixed(2)} degrees
            </p>
            <p>
              Right Torso Rotation: {rightTorsoRotationValue?.toFixed(2)}{' '}
              degrees
            </p>
            <p>Left Arm Rotation: {leftArmRotationValue?.toFixed(2)} degrees</p>
            <p>
              Right Arm Rotation: {rightArmRotationValue?.toFixed(2)} degrees
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeasuringPage;


const Root = styled.div`
  height: 100vh;
  width: 100%;
`;
