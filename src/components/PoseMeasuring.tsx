import { useContext, useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { isCameraMeasureStep } from 'utils/measuring';
import { MeasuringStep } from 'types';
import styled from '@emotion/styled';
import * as posenet from '@tensorflow-models/posenet';
import { MeasurementContext } from './MeasurementContext';
import NoticeText from './NoticeLineBreak';
import { Icon } from './IconContext';

const VideoElement = styled.video`
  display: flex;
  flex-shrink: 0.5;
  flex-direction: column;
  object-fit: cover;
  align-items: center;
  top: 0;
  height: 100vh;
  transform: scaleX(-1);
`;
const CameraMeasureText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position: absolute;
  top: 211px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 700;
  color: white;
  z-index: 2;
  text-align: center;
  white-space: nowrap;
`;
const TimerText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position: absolute;
  top: 211;
  left: 50%;
  transform: translate(-50%, 190px);
  font-size: 80px;
  font-weight: 700;
  color: white;
  z-index: 2;
  text-align: center;
`;

export interface PoseMeasuringProps {
  step: MeasuringStep;
  onComplete: (data: number) => void;
}

function PoseMeasuring({ step, onComplete }: PoseMeasuringProps) {
  const context = useContext(MeasurementContext);

  if (!context) {
    throw new Error('MeasuringPage must be used within a MeasurementProvider.');
  }
  const {
    setLeftArmRotationValue,
    setRightArmRotationValue,
    setArmRotationValue,
    originalShoulderLength,
    setOriginalShoulderLength,
    setLeftRotationValue,
    setRightRotationValue,
    setLeftTiltValue,
    setRightTiltValue,
  } = context;
  const [timerCount, setTimerCount] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const measuredDataRef = useRef<number[]>([]);
  const measuredSecondRef = useRef<number[]>([]);

  // Maximum number of attempts to prevent infinite loops
  const MAX_ATTEMPTS = 30;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const latestPoseRef = useRef<posenet.Pose | null>(null);

  // Maximum number of attempts to prevent infinite loops

  useEffect(() => {
    setTimerCount(step === MeasuringStep.MOVE_MEASURE ? 15 : 5);
    setIsChecking(false);
    measuredDataRef.current = [];
    measuredSecondRef.current = [];
  }, [step]);

  useEffect(() => {
    setTimerCount(step === MeasuringStep.MOVE_MEASURE ? 15 : 5);
    setIsChecking(false);
    measuredDataRef.current = [];
    measuredSecondRef.current = [];
  }, [step]);

  useEffect(() => {
    console.log(`Current step: ${MeasuringStep[step]}`);

    if (timerCount !== null && timerCount > 0) {
      const countdownTimer = setTimeout(() => {
        setTimerCount((prevCount) =>
          prevCount !== null ? prevCount - 1 : null
        );
      }, 1000);
      return () => clearTimeout(countdownTimer);
    } else if (timerCount === 0) {
      console.log('Countdown finished. Starting measurement.');
      setIsChecking(true);
    }
  }, [timerCount, step]);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          if (!videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.error('Webcam error:', error);
      }
    };
    startWebcam();
  }, []);

  useEffect(() => {
    let net: posenet.PoseNet | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!isChecking) {
      return;
    }

    let checkCounter = 0;
    let validDataCount = 0;
    measuredDataRef.current = [];
    measuredSecondRef.current = [];

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
          onComplete(0); // Exit if backend setup fails
        }
      }
      try {
        net = await posenet.load();
        console.log('PoseNet model loaded.');
      } catch (modelError) {
        console.error('Failed to load PoseNet model:', modelError);
        onComplete(0); // Exit if model fails to load
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
                flipHorizontal: true,
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
      await loadModel();
      startPoseEstimation();
    };

    init();

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

        const minConfidence = 0.6; // Adjusted to increase keypoint detection

        const leftShoulder = keypoints['leftShoulder'];
        const rightShoulder = keypoints['rightShoulder'];
        const leftElbow = keypoints['leftElbow'];
        const rightElbow = keypoints['rightElbow'];
        let shoulderLength = 0;
        console.log('Keypoints:', keypoints);

        if (
          leftShoulder?.score >= minConfidence &&
          rightShoulder?.score >= minConfidence
        ) {
          shoulderLength = Math.hypot(
            leftShoulder.position.x - rightShoulder.position.x,
            leftShoulder.position.y - rightShoulder.position.y
          );
        }

        if (step === MeasuringStep.ARM_MEASURE) {
          if (
            leftElbow?.score >= minConfidence &&
            leftShoulder?.score >= minConfidence &&
            rightElbow?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence
          ) {
            const leftArmVector = [
              leftElbow.position.x - leftShoulder.position.x,
              leftElbow.position.y - leftShoulder.position.y,
            ];
            const leftArmLength = Math.hypot(
              leftArmVector[0],
              leftArmVector[1]
            );
            const rightArmVector = [
              rightElbow.position.x - rightShoulder.position.x,
              rightElbow.position.y - rightShoulder.position.y,
            ];
            const rightArmLength = Math.hypot(
              rightArmVector[0],
              rightArmVector[1]
            );

            const refVector = [0, 1];

            const leftDotProd = dotProduct(leftArmVector, refVector);
            const leftArmAngle =
              (Math.acos(leftDotProd / leftArmLength) * 180) / Math.PI;
            const rightDotProd = dotProduct(rightArmVector, refVector);
            const rightArmAngle =
              (Math.acos(rightDotProd / rightArmLength) * 180) / Math.PI;

            // Store the angles
            measuredDataRef.current.push(leftArmAngle);
            measuredSecondRef.current.push(rightArmAngle);
            validDataCount += 1;

            // Log the angles
            console.log(
              `ARM_MEASURE - Left Arm Angle: ${leftArmAngle.toFixed(2)} degrees`
            );
            console.log(
              `ARM_MEASURE - Right Arm Angle: ${rightArmAngle.toFixed(2)} degrees`
            );
          } else {
            console.log(
              'ARM_MEASURE - Keypoints not detected or confidence too low.'
            );
          }
        } else if (step === MeasuringStep.ROTATE_MEASURE_FRONT) {
          if (
            leftShoulder?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence
          ) {
            measuredDataRef.current.push(shoulderLength);
            validDataCount += 1;
            console.log(
              `ROTATE_MEASURE_FRONT - Shoulder Length: ${shoulderLength.toFixed(2)} pixels`
            );
          } else {
            console.log('ROTATE_MEASURE_FRONT - Wrist keypoints not detected.');
          }
        } else if (
          step === MeasuringStep.ROTATE_MEASURE_LEFT ||
          step === MeasuringStep.ROTATE_MEASURE_RIGHT
        ) {
          if (
            leftShoulder?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence
          ) {
            if (originalShoulderLength) {
              measuredDataRef.current.push(
                (Math.acos(shoulderLength / originalShoulderLength) * 180) /
                  Math.PI
              );
              validDataCount += 1;
            } else {
              console.log('Original Wrist Length not set. ');
            }
          } else {
            console.log(
              `ROTATE_MEASURE_${
                step === MeasuringStep.ROTATE_MEASURE_LEFT ? 'LEFT' : 'RIGHT'
              } - Shoulder keypoints not detected.`
            );
          }
        } else if (
          step === MeasuringStep.TILT_MEASURE_LEFT ||
          step === MeasuringStep.TILT_MEASURE_RIGHT
        ) {
          if (
            leftShoulder?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence
          ) {
            const refVec = [1, 0];

            const shoulderVector = [
              rightShoulder.position.x - leftShoulder.position.x,
              -rightShoulder.position.y + leftShoulder.position.y,
            ];
            const shoulderDotProd = dotProduct(shoulderVector, refVec);
            const shoulderAngle =
              (Math.acos(
                shoulderDotProd /
                  Math.hypot(shoulderVector[0], shoulderVector[1])
              ) *
                180) /
              Math.PI;
            measuredDataRef.current.push(shoulderAngle);

            validDataCount += 1;

            console.log(
              `TILT_MEASURE_${
                step === MeasuringStep.TILT_MEASURE_LEFT ? 'LEFT' : 'RIGHT'
              } - Shoulder Angle: ${shoulderAngle.toFixed(2)} degrees`
            );
          } else {
            console.log(
              `TILT_MEASURE_${
                step === MeasuringStep.TILT_MEASURE_LEFT ? 'LEFT' : 'RIGHT'
              } - Wrist keypoints not detected.`
            );
          }
        }
        checkCounter += 1;

        // After collecting 10 measurements or reaching max attempts, calculate averages
        if (
          step === MeasuringStep.MOVE_MEASURE ||
          validDataCount >= 10 ||
          checkCounter >= MAX_ATTEMPTS
        ) {
          console.log(
            'Reached 10 measurements or max attempts. Calculating averages...'
          );
          if (intervalId) {
            clearInterval(intervalId);
          }
          setIsChecking(false);

          const handleMeasure = (): number => {
            let data = 0;
            if (step === MeasuringStep.ARM_MEASURE) {
              const validLeftArmAngles = measuredDataRef.current.filter(
                (angle) => !isNaN(angle)
              );
              const validRightArmAngles = measuredSecondRef.current.filter(
                (angle) => !isNaN(angle)
              );

              let avgLeftArmAngle = 0,
                avgRightArmAngle = 0;

              if (validLeftArmAngles.length > 0 && setLeftArmRotationValue) {
                avgLeftArmAngle =
                  validLeftArmAngles.reduce((a, b) => a + b, 0) /
                  validLeftArmAngles.length;
                setLeftArmRotationValue(avgLeftArmAngle);
              } else {
                console.log('No valid left arm angles recorded.');
              }

              if (validRightArmAngles.length > 0 && setRightArmRotationValue) {
                avgRightArmAngle =
                  validRightArmAngles.reduce((a, b) => a + b, 0) /
                  validRightArmAngles.length;
                setRightArmRotationValue(avgRightArmAngle);
              } else {
                console.log('No valid right arm angles recorded.');
              }

              if (avgLeftArmAngle > 0 && avgRightArmAngle > 0) {
                data = (avgLeftArmAngle + avgRightArmAngle) / 2;
                setArmRotationValue((avgLeftArmAngle + avgRightArmAngle) / 2);
              } else {
                console.log('No valid arm angles recorded.');
              }
            } else if (isCameraMeasureStep(step)) {
              const validData = measuredDataRef.current.filter(
                (len) => !isNaN(len)
              );
              if (validData.length > 0) {
                const avgData =
                  validData.reduce((a, b) => a + b, 0) / validData.length;
                data = avgData;
                switch (step) {
                  case MeasuringStep.ROTATE_MEASURE_FRONT:
                    if (setOriginalShoulderLength) {
                      setOriginalShoulderLength(avgData);
                    }
                    break;
                  case MeasuringStep.ROTATE_MEASURE_LEFT:
                    if (setLeftRotationValue) {
                      setLeftRotationValue(avgData);
                    }
                    break;
                  case MeasuringStep.ROTATE_MEASURE_RIGHT:
                    if (setRightRotationValue) {
                      setRightRotationValue(avgData);
                    }
                    break;
                  case MeasuringStep.TILT_MEASURE_LEFT:
                    if (setLeftTiltValue) {
                      setLeftTiltValue(avgData);
                    }
                    break;
                  case MeasuringStep.TILT_MEASURE_RIGHT:
                    if (setRightTiltValue) {
                      setRightTiltValue(avgData);
                    }
                    break;
                  default:
                    break;
                }
              } else {
                console.log(
                  'No valid wrist lengths recorded for ROTATE_MEASURE_FRONT.'
                );
              }
            }
            return data;
          };
          const data = handleMeasure();
          console.log('Measurement complete for step:', MeasuringStep[step]);
          console.log('Average Value ', data);
          onComplete(data);
        }
      }
    }, 200);

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
    setLeftRotationValue,
    setRightRotationValue,
    setLeftTiltValue,
    setRightTiltValue,
  ]);

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <VideoElement
        ref={videoRef}
        style={{
          top: 0,
          position: 'relative',
          display: 'block',
          width: '393px',
          height: '852px',
          filter: 'brightness(60%)',
          opacity: '100%',
          zIndex: 1,
        }}
      />
      <CameraMeasureText>
        <NoticeText step={step} />
        <div
          style={{
            position: 'absolute',
            top: '337px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {step === MeasuringStep.MOVE_MEASURE && (
            <Icon icon="MoveMeasureVector" transform="scale(1.3)" />
          )}
          {step === MeasuringStep.ARM_MEASURE && (
            <Icon icon="ArmMeasureVector" transform="scale(1.3)" />
          )}
          {step === MeasuringStep.ROTATE_MEASURE_LEFT && (
            <Icon icon="RotateLeftVector" transform="scale(1.3)" />
          )}
          {step === MeasuringStep.ROTATE_MEASURE_RIGHT && (
            <Icon icon="RotateRightVector" transform="scale(1.3)" />
          )}
          {step === MeasuringStep.TILT_MEASURE_LEFT && (
            <Icon icon="TiltLeftVector" transform="scale(1.3)" />
          )}
          {step === MeasuringStep.TILT_MEASURE_RIGHT && (
            <Icon icon="TiltRightVector" transform="scale(1.3)" />
          )}
        </div>
        <TimerText>{timerCount}</TimerText>
      </CameraMeasureText>
    </div>
  );
}

export default PoseMeasuring;

export const getNotice = (step: MeasuringStep) => {
  switch (step) {
    case MeasuringStep.MOVE_MEASURE:
      return `선에 맞춰\n뒤로 이동하세요`;
    case MeasuringStep.ARM_MEASURE:
      return `어깨와 팔꿈치가 보이도록\n팔을 양 옆으로\n최대한 드세요`;
    case MeasuringStep.ROTATE_MEASURE_FRONT:
      return `양 손을 어깨에 올리고\n정면을 바라보세요`;
    case MeasuringStep.ROTATE_MEASURE_LEFT:
      return `양 손을 어깨에 올리고\n허리를 왼쪽으로\n돌리세요`;
    case MeasuringStep.ROTATE_MEASURE_RIGHT:
      return `양 손을 어깨에 올리고\n허리를 오른쪽으로\n돌리세요`;
    case MeasuringStep.TILT_MEASURE_LEFT:
      return `상체를 왼쪽으로\n기울이세요`;
    case MeasuringStep.TILT_MEASURE_RIGHT:
      return `상체를 오른쪽으로\n기울이세요`;
    default:
      return `지시에 따라 주세요`;
  }
};

const dotProduct = (vec1: number[], vec2: number[]): number => {
  return vec1.reduce((sum, value, index) => sum + value * vec2[index], 0);
};
