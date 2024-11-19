import React, { useEffect, useState, useCallback } from 'react';
import PoseMeasuring from 'components/PoseMeasuring';
import ReadyInformation from 'components/ReadyInformation';
import TimerMeasuring from 'components/TimerMeasuring';
import { MeasuringStep } from 'utils/measuringStep';

const stepSequence: MeasuringStep[] = [
  MeasuringStep.MOVE_READY,
  MeasuringStep.MOVE_MEASURE,
  MeasuringStep.ARM_READY,
  MeasuringStep.ARM_MEASURE,
  MeasuringStep.ROTATE_READY,
  MeasuringStep.ROTATE_MEASURE_FRONT,
  MeasuringStep.ROTATE_MEASURE_LEFT,
  MeasuringStep.ROTATE_MEASURE_RIGHT,
  MeasuringStep.TILT_READY,
  MeasuringStep.TILT_MEASURE_LEFT,
  //MeasuringStep.TILT_MEASURE_RIGHT,
];

export interface MeasuringPageProps {}

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

  const [onTimeStop] = useState<number | null>(null);

  // Function to navigate to the next step
  const goNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const currentIndex = stepSequence.indexOf(prevStep);
      if (currentIndex === -1 || currentIndex === stepSequence.length - 1) {
        console.log('Reached the end of the measurement sequence.');
        return prevStep; // Stay on the current step if not found or at the end
      }
      const nextStep = stepSequence[currentIndex + 1];
      console.log(`Transitioning to next step: ${MeasuringStep[nextStep]}`);
      return nextStep;
    });
  }, []);

  // Handle completion from PoseMeasuring
  const handleComplete = useCallback(() => {
    console.log('Measurement Complete for step:', MeasuringStep[currentStep]);
    goNextStep();
  }, [goNextStep, currentStep]);

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
  }, [isTimerActive, timer, goNextStep]);

  useEffect(() => {
    // Print all measurements when all steps are complete
    const allStepsComplete = !stepSequence.includes(currentStep);

    if (allStepsComplete) {
      console.log('All measurements completed.');
      console.log('Summary of Measurements:');
      console.log('Original Shoulder Length:', originalShoulderLength);
      console.log('Original Wrist Length:', originalWristLength);
      console.log('Left Waist Rotation:', leftWaistRotationValue);
      console.log('Right Waist Rotation:', rightWaistRotationValue);
      console.log('Left Torso Rotation:', leftTorsoRotationValue);
      console.log('Right Torso Rotation:', rightTorsoRotationValue);
      console.log('Left Arm Rotation:', leftArmRotationValue);
      console.log('Right Arm Rotation:', rightArmRotationValue);
    }
  }, [
    currentStep,
    originalShoulderLength,
    originalWristLength,
    leftWaistRotationValue,
    rightWaistRotationValue,
    leftTorsoRotationValue,
    rightTorsoRotationValue,
    leftArmRotationValue,
    rightArmRotationValue,
  ]);

  return (
    <div>
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
      {!stepSequence.includes(currentStep) && (
        <div>
          <h2>All measurements are complete!</h2>
          <TimerMeasuring />
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
