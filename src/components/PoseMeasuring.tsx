import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Text } from './shared';
import { MeasuringStep } from 'utils/measuringStep';
import styled from '@emotion/styled';
import * as posenet from '@tensorflow-models/posenet';

const Root = styled.div`
  position: relative;
  text-align: center;
`;

export interface PoseMeasuringProps {
  step: MeasuringStep;
  onComplete: () => void;
  originalShoulderLength?: number | null;
  setOriginalShoulderLength?: (length: number) => void;
  originalWristLength?: number | null;
  setOriginalWristLength?: (length: number) => void;
  originalShoulderAngle?: number | null;
  setOriginalShoulderAngle?: (angle: number) => void;
  leftWaistRotationValue?: number | null;
  setLeftWaistRotationValue?: (value: number) => void;
  rightWaistRotationValue?: number | null;
  setRightWaistRotationValue?: (value: number) => void;
  leftTorsoRotationValue?: number | null;
  setLeftTorsoRotationValue?: (value: number) => void;
  rightTorsoRotationValue?: number | null;
  setRightTorsoRotationValue?: (value: number) => void;
  leftArmRotationValue?: number | null;
  setLeftArmRotationValue?: (value: number) => void;
  rightArmRotationValue?: number | null;
  setRightArmRotationValue?: (value: number) => void;
}

function PoseMeasuring({
  step,
  onComplete,
  originalShoulderLength,
  setOriginalShoulderLength,
  originalWristLength,
  setOriginalWristLength,
  originalShoulderAngle,
  setOriginalShoulderAngle,
  leftWaistRotationValue,
  setLeftWaistRotationValue,
  rightWaistRotationValue,
  setRightWaistRotationValue,
  leftTorsoRotationValue,
  setLeftTorsoRotationValue,
  rightTorsoRotationValue,
  setRightTorsoRotationValue,
  leftArmRotationValue,
  setLeftArmRotationValue,
  rightArmRotationValue,
  setRightArmRotationValue,
}: PoseMeasuringProps) {
  const [count, setCount] = useState(
    step === MeasuringStep.MOVE_MEASURE ? 15 : 5
  );
  const [isChecking, setIsChecking] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const latestPoseRef = useRef<posenet.Pose | null>(null);

  const wristLengthsRef = useRef<number[]>([]);
  const torsoAnglesRef = useRef<number[]>([]);
  const leftArmRotationsRef = useRef<number[]>([]);
  const rightArmRotationsRef = useRef<number[]>([]);

  // Maximum number of attempts to prevent infinite loops
  const MAX_ATTEMPTS = 30;

  useEffect(() => {
    console.log(`Current step: ${MeasuringStep[step]}`);

    if (count > 1) {
      const countdownTimer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }

    if (count === 1) {
      console.log('Countdown finished. Starting measurement.');
      setIsChecking(true);
    }
  }, [count, step]);

  useEffect(() => {
    let net: posenet.PoseNet | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!isChecking) {
      return;
    }

    // Define measuring steps
    const measuringSteps = [
      MeasuringStep.ARM_MEASURE,
      MeasuringStep.ROTATE_MEASURE_FRONT,
      MeasuringStep.ROTATE_MEASURE_LEFT,
      MeasuringStep.ROTATE_MEASURE_RIGHT,
      MeasuringStep.TILT_MEASURE_LEFT,
      MeasuringStep.TILT_MEASURE_RIGHT,
    ];

    if (!measuringSteps.includes(step)) {
      console.log(`Step ${MeasuringStep[step]} is not a measuring step.`);
      onComplete();
      return;
    }

    // Remove dependencies on original measurements for tilt steps
    // No longer checking for originalShoulderAngle or originalWristLength for tilt measurements

    // Initialize measurement counters and data arrays
    let checkCounter = 0;
    wristLengthsRef.current = [];
    torsoAnglesRef.current = [];
    leftArmRotationsRef.current = [];
    rightArmRotationsRef.current = [];

    // Function to start webcam stream
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          if (!videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play(); // Start playing once the stream is set
            console.log('Webcam stream started.');
          }
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
        onComplete(); // Exit if webcam access fails
      }
    };

    // Load PoseNet model
    const loadModel = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow backend set to WebGL.');
      } catch (error) {
        console.warn('WebGL failed, falling back to CPU.', error);
        try {
          await tf.setBackend('cpu');
          await tf.ready();
          console.log('TensorFlow backend set to CPU.');
        } catch (cpuError) {
          console.error('Failed to set TensorFlow backend to CPU.', cpuError);
          onComplete(); // Exit if backend setup fails
        }
      }
      try {
        net = await posenet.load();
        console.log('PoseNet model loaded.');
      } catch (modelError) {
        console.error('Failed to load PoseNet model:', modelError);
        onComplete(); // Exit if model fails to load
      }
    };

    const startPoseEstimation = () => {
      if (videoRef.current && net) {
        videoRef.current.width = 640;
        videoRef.current.height = 480;

        const detectPose = async () => {
          if (videoRef.current && net) {
            try {
              const pose = await net.estimateSinglePose(videoRef.current, {
                flipHorizontal: false,
              });
              latestPoseRef.current = pose;
            } catch (poseError) {
              console.error('Error estimating pose:', poseError);
            }
          }
          requestAnimationFrame(detectPose);
        };
        detectPose();
        console.log('Pose estimation started.');
      }
    };

    const init = async () => {
      await startWebcam();
      await loadModel();
      startPoseEstimation();
    };

    init();

    // Measurement interval setup (adjusted to 500ms for better responsiveness)
    intervalId = setInterval(() => {
      const pose = latestPoseRef.current;
      if (pose) {
        const keypoints = pose.keypoints.reduce(
          (acc, keypoint) => {
            acc[keypoint.part] = keypoint;
            return acc;
          },
          {} as { [key: string]: posenet.Keypoint }
        );

        const minConfidence = 0.2; // Adjusted to increase keypoint detection

        const leftShoulder = keypoints['leftShoulder'];
        const rightShoulder = keypoints['rightShoulder'];
        const leftElbow = keypoints['leftElbow'];
        const rightElbow = keypoints['rightElbow'];
        const leftWrist = keypoints['leftWrist'];
        const rightWrist = keypoints['rightWrist'];

        // Measurement based on the current step
        if (step === MeasuringStep.ARM_MEASURE) {
          if (
            leftShoulder?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence &&
            leftElbow?.score >= minConfidence &&
            rightElbow?.score >= minConfidence
          ) {
            const leftArmVector = {
              x: Math.abs(leftElbow.position.x - leftShoulder.position.x),
              y: Math.abs(leftElbow.position.y - leftShoulder.position.y),
            };
            const rightArmVector = {
              x: Math.abs(rightElbow.position.x - rightShoulder.position.x),
              y: Math.abs(rightElbow.position.y - rightShoulder.position.y),
            };

            const leftArmAngle =
              (Math.atan2(leftArmVector.y, leftArmVector.x) * 180) / Math.PI;
            const rightArmAngle =
              (Math.atan2(rightArmVector.y, rightArmVector.x) * 180) / Math.PI;

            leftArmRotationsRef.current.push(Math.abs(leftArmAngle));
            rightArmRotationsRef.current.push(Math.abs(rightArmAngle));

            console.log(
              `ARM_MEASURE - Left Arm Angle: ${leftArmAngle.toFixed(2)} degrees`
            );
            console.log(
              `ARM_MEASURE - Right Arm Angle: ${rightArmAngle.toFixed(2)} degrees`
            );
          } else {
            console.log('ARM_MEASURE - Keypoints not detected.');
          }
        } else if (step === MeasuringStep.ROTATE_MEASURE_FRONT) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            const wristLength = Math.hypot(
              leftWrist.position.x - rightWrist.position.x,
              leftWrist.position.y - rightWrist.position.y
            );
            wristLengthsRef.current.push(wristLength);
            console.log(
              `ROTATE_MEASURE_FRONT - Wrist Length: ${wristLength.toFixed(2)} pixels`
            );
          } else {
            console.log('ROTATE_MEASURE_FRONT - Wrist keypoints not detected.');
          }
        } else if (step === MeasuringStep.ROTATE_MEASURE_LEFT) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            const wristLength = Math.hypot(
              leftWrist.position.x - rightWrist.position.x,
              leftWrist.position.y - rightWrist.position.y
            );
            wristLengthsRef.current.push(wristLength);
            console.log(
              `ROTATE_MEASURE_LEFT - Wrist Length: ${wristLength.toFixed(2)} pixels`
            );
          } else {
            console.log('ROTATE_MEASURE_LEFT - Wrist keypoints not detected.');
          }
        } else if (step === MeasuringStep.ROTATE_MEASURE_RIGHT) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            const wristLength = Math.hypot(
              leftWrist.position.x - rightWrist.position.x,
              leftWrist.position.y - rightWrist.position.y
            );
            wristLengthsRef.current.push(wristLength);
            console.log(
              `ROTATE_MEASURE_RIGHT - Wrist Length: ${wristLength.toFixed(2)} pixels`
            );
          } else {
            console.log('ROTATE_MEASURE_RIGHT - Wrist keypoints not detected.');
          }
        } else if (
          step === MeasuringStep.TILT_MEASURE_LEFT ||
          step === MeasuringStep.TILT_MEASURE_RIGHT
        ) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            const wristVector = {
              x: rightWrist.position.x - leftWrist.position.x,
              y: rightWrist.position.y - leftWrist.position.y,
            };

            const wristAngle =
              (Math.atan2(Math.abs(wristVector.y), Math.abs(wristVector.x)) *
                180) /
              Math.PI;
            torsoAnglesRef.current.push(Math.abs(wristAngle));

            console.log(
              `TILT_MEASURE_${step === MeasuringStep.TILT_MEASURE_LEFT ? 'LEFT' : 'RIGHT'} - Wrist Angle: ${Math.abs(wristAngle).toFixed(2)} degrees`
            );
          } else {
            console.log(
              `TILT_MEASURE_${step === MeasuringStep.TILT_MEASURE_LEFT ? 'LEFT' : 'RIGHT'} - Wrist keypoints not detected.`
            );
          }
        }

        // Determine if any valid measurement was taken
        let anyMeasurementTaken = false;
        if (
          step === MeasuringStep.ARM_MEASURE &&
          leftArmRotationsRef.current.length > checkCounter
        ) {
          anyMeasurementTaken = true;
        } else if (
          [
            MeasuringStep.ROTATE_MEASURE_FRONT,
            MeasuringStep.ROTATE_MEASURE_LEFT,
            MeasuringStep.ROTATE_MEASURE_RIGHT,
          ].includes(step) &&
          wristLengthsRef.current.length > checkCounter
        ) {
          anyMeasurementTaken = true;
        } else if (
          (step === MeasuringStep.TILT_MEASURE_LEFT ||
            step === MeasuringStep.TILT_MEASURE_RIGHT) &&
          torsoAnglesRef.current.length > checkCounter
        ) {
          anyMeasurementTaken = true;
        }

        if (anyMeasurementTaken) {
          checkCounter += 1;
          setCheckCount((prev) => prev + 1);
          console.log(`Measurement count: ${checkCounter}`);
        } else {
          console.log('No valid measurements taken in this interval.');
        }

        // After collecting 10 measurements or reaching max attempts, calculate averages
        if (checkCounter >= 10 || checkCount >= MAX_ATTEMPTS) {
          console.log(
            'Reached 10 measurements or max attempts. Calculating averages...'
          );
          if (intervalId) {
            clearInterval(intervalId);
          }
          setIsChecking(false);
          setCheckCount(0);

          const handleMeasure = () => {
            // Handle ARM_MEASURE
            if (step === MeasuringStep.ARM_MEASURE) {
              const validLeftArmAngles = leftArmRotationsRef.current.filter(
                (angle) => !isNaN(angle)
              );
              const validRightArmAngles = rightArmRotationsRef.current.filter(
                (angle) => !isNaN(angle)
              );

              if (validLeftArmAngles.length > 0 && setLeftArmRotationValue) {
                const avgLeftArmAngle =
                  validLeftArmAngles.reduce((a, b) => a + b, 0) /
                  validLeftArmAngles.length;
                setLeftArmRotationValue(avgLeftArmAngle);
                console.log(
                  `Average Left Arm Rotation Angle: ${avgLeftArmAngle.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log('No valid left arm angles recorded.');
              }

              if (validRightArmAngles.length > 0 && setRightArmRotationValue) {
                const avgRightArmAngle =
                  validRightArmAngles.reduce((a, b) => a + b, 0) /
                  validRightArmAngles.length;
                setRightArmRotationValue(avgRightArmAngle);
                console.log(
                  `Average Right Arm Rotation Angle: ${avgRightArmAngle.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log('No valid right arm angles recorded.');
              }
            }

            // Handle ROTATE_MEASURE_FRONT
            if (step === MeasuringStep.ROTATE_MEASURE_FRONT) {
              const validWristLengths = wristLengthsRef.current.filter(
                (len) => !isNaN(len)
              );
              if (validWristLengths.length > 0 && setOriginalWristLength) {
                const avgWristLength =
                  validWristLengths.reduce((a, b) => a + b, 0) /
                  validWristLengths.length;
                setOriginalWristLength(avgWristLength);
                console.log(
                  `Average Original Wrist Length: ${avgWristLength.toFixed(
                    2
                  )} pixels`
                );
              } else {
                console.log(
                  'No valid wrist lengths recorded for ROTATE_MEASURE_FRONT.'
                );
              }
            }

            // Handle ROTATE_MEASURE_LEFT
            if (step === MeasuringStep.ROTATE_MEASURE_LEFT) {
              const validWristLengths = wristLengthsRef.current.filter(
                (len) => !isNaN(len)
              );
              if (validWristLengths.length > 0 && setLeftWaistRotationValue) {
                const avgWristLength =
                  validWristLengths.reduce((a, b) => a + b, 0) /
                  validWristLengths.length;
                // Directly set the wrist angle without ratio comparison
                setLeftWaistRotationValue(avgWristLength);
                console.log(
                  `Average Left Waist Rotation Angle (Wrist Angle): ${avgWristLength.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log(
                  'No valid wrist lengths recorded for ROTATE_MEASURE_LEFT.'
                );
              }
            }

            // Handle ROTATE_MEASURE_RIGHT
            if (step === MeasuringStep.ROTATE_MEASURE_RIGHT) {
              const validWristLengths = wristLengthsRef.current.filter(
                (len) => !isNaN(len)
              );
              if (validWristLengths.length > 0 && setRightWaistRotationValue) {
                const avgWristLength =
                  validWristLengths.reduce((a, b) => a + b, 0) /
                  validWristLengths.length;
                // Directly set the wrist angle without ratio comparison
                setRightWaistRotationValue(avgWristLength);
                console.log(
                  `Average Right Waist Rotation Angle (Wrist Angle): ${avgWristLength.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log(
                  'No valid wrist lengths recorded for ROTATE_MEASURE_RIGHT.'
                );
              }
            }

            // Handle TILT_MEASURE_LEFT
            if (step === MeasuringStep.TILT_MEASURE_LEFT) {
              const validTorsoAngles = torsoAnglesRef.current.filter(
                (angle) => !isNaN(angle)
              );
              if (validTorsoAngles.length > 0 && setLeftTorsoRotationValue) {
                const avgTorsoAngle =
                  validTorsoAngles.reduce((a, b) => a + b, 0) /
                  validTorsoAngles.length;
                setLeftTorsoRotationValue(avgTorsoAngle);
                console.log(
                  `Average Left Torso Tilt Angle: ${avgTorsoAngle.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log(
                  'No valid torso angles recorded for TILT_MEASURE_LEFT.'
                );
              }
            }

            // Handle TILT_MEASURE_RIGHT
            if (step === MeasuringStep.TILT_MEASURE_RIGHT) {
              const validTorsoAngles = torsoAnglesRef.current.filter(
                (angle) => !isNaN(angle)
              );
              if (validTorsoAngles.length > 0 && setRightTorsoRotationValue) {
                const avgTorsoAngle =
                  validTorsoAngles.reduce((a, b) => a + b, 0) /
                  validTorsoAngles.length;
                setRightTorsoRotationValue(avgTorsoAngle);
                console.log(
                  `Average Right Torso Tilt Angle: ${avgTorsoAngle.toFixed(
                    2
                  )} degrees`
                );
              } else {
                console.log(
                  'No valid torso angles recorded for TILT_MEASURE_RIGHT.'
                );
              }
            }
          };

          const handleComplete = () => {
            console.log('Measurement complete for step:', MeasuringStep[step]);
            onComplete();
          };

          handleMeasure();
          handleComplete();
        }
      }
    }, 500); // Adjusted interval time for better responsiveness

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
      net = null;
    };
  }, [
    isChecking,
    step,
    onComplete,
    setOriginalShoulderLength,
    setOriginalWristLength,
    originalWristLength,
    setLeftWaistRotationValue,
    setRightWaistRotationValue,
    setLeftTorsoRotationValue,
    setRightTorsoRotationValue,
    setLeftArmRotationValue,
    setRightArmRotationValue,
  ]);

  return (
    <Root>
      <Text fontWeight={700}>{getNotice(step)}</Text>
      <Text fontSize={80} fontWeight={700}>
        {count}
      </Text>
      {/* Video Element for Debugging */}
      <video
        ref={videoRef}
        style={{
          display: 'block',
          margin: '20px auto',
          width: '640px',
          height: '480px',
          border: '2px solid #000',
        }}
      />
    </Root>
  );
}

export default PoseMeasuring;

const getNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.MOVE_MEASURE:
      return `선에 맞춰 뒤로 이동하세요`;
    case MeasuringStep.ARM_MEASURE:
      return `팔을 양 옆으로 최대한 드세요`;
    case MeasuringStep.ROTATE_MEASURE_FRONT:
      return `앞을 향해 서세요`;
    case MeasuringStep.ROTATE_MEASURE_LEFT:
      return `허리를 왼쪽으로 돌리세요`;
    case MeasuringStep.ROTATE_MEASURE_RIGHT:
      return `허리를 오른쪽으로 돌리세요`;
    case MeasuringStep.TILT_MEASURE_LEFT:
      return `왼쪽과 오른쪽 손목 사이의 각도를 유지하세요`;
    case MeasuringStep.TILT_MEASURE_RIGHT:
      return `왼쪽과 오른쪽 손목 사이의 각도를 유지하세요`;
    default:
      return `지시에 따라 주세요`;
  }
};
