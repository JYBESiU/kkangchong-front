import { useContext, useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { isCameraMeasureStep, MeasuringStep } from 'utils/measuringStep';
import styled from '@emotion/styled';
import * as posenet from '@tensorflow-models/posenet';
import { MeasurementContext } from './MeasurementContext';
import NoticeText from './NoticeLineBreak';
import { Icon } from './IconContext';
import { transform } from 'typescript';

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
    originalWristLength,
    setOriginalWristLength,
    setLeftWaistRotationValue,
    setRightWaistRotationValue,
    setLeftWaistTiltValue,
    setRightWaistTiltValue,
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
        const leftWrist = keypoints['leftWrist'];
        const rightWrist = keypoints['rightWrist'];
        let wristLength = 0;
        let wristVector;
        console.log('Keypoints:', keypoints);

        if (
          leftWrist?.score >= minConfidence &&
          rightWrist?.score >= minConfidence
        ) {
          wristLength = Math.hypot(
            leftWrist.position.x - rightWrist.position.x,
            leftWrist.position.y - rightWrist.position.y
          );
          wristVector = {
            x: leftWrist.position.x - rightWrist.position.x,
            y: leftWrist.position.y - rightWrist.position.y,
          };
        }

        if (step === MeasuringStep.ARM_MEASURE) {
          if (
            leftElbow?.score >= minConfidence &&
            leftShoulder?.score >= minConfidence &&
            rightElbow?.score >= minConfidence &&
            rightShoulder?.score >= minConfidence
          ) {
            // Left arm vector (shoulder to elbow)
            const leftArmVector = {
              x: leftElbow.position.x - leftShoulder.position.x,
              y: leftElbow.position.y - leftShoulder.position.y,
            };
            const leftArmLength = Math.hypot(leftArmVector.x, leftArmVector.y);

            // Right arm vector (shoulder to elbow)
            const rightArmVector = {
              x: rightElbow.position.x - rightShoulder.position.x,
              y: rightElbow.position.y - rightShoulder.position.y,
            };
            const rightArmLength = Math.hypot(
              rightArmVector.x,
              rightArmVector.y
            );
            // Reference vector (positive y-axis)
            const refVector = { x: 0, y: 1 };
            const refLength = 1; // Since the reference vector is (0, 1)
            /** the y is smaller value when it is higher */

            let leftArmAngle = 0;
            let rightArmAngle = 0;

            if (leftArmLength > 0) {
              const dotProduct =
                leftArmVector.x * refVector.x + leftArmVector.y * refVector.y;
              const cosTheta = dotProduct / (leftArmLength * refLength);
              const angleRad = Math.acos(cosTheta);
              leftArmAngle = (angleRad * 180) / Math.PI;
            } else {
              console.log('Left arm vector length is zero.');
            }
            if (rightArmLength > 0) {
              const dotProduct =
                rightArmVector.x * refVector.x + rightArmVector.y * refVector.y;
              const cosTheta = dotProduct / (rightArmLength * refLength);
              const angleRad = Math.acos(cosTheta);
              rightArmAngle = (angleRad * 180) / Math.PI;
            } else {
              console.log('Right arm vector length is zero.');
            }

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
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            measuredDataRef.current.push(wristLength);
            validDataCount += 1;
            console.log(
              `ROTATE_MEASURE_FRONT - Wrist Length: ${wristLength.toFixed(2)} pixels`
            );
          } else {
            console.log('ROTATE_MEASURE_FRONT - Wrist keypoints not detected.');
          }
        } else if (
          step === MeasuringStep.ROTATE_MEASURE_LEFT ||
          step === MeasuringStep.ROTATE_MEASURE_RIGHT
        ) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence
          ) {
            if (originalWristLength) {
              measuredDataRef.current.push(
                (Math.acos(wristLength / originalWristLength) * 180) / Math.PI
              );
              validDataCount += 1;
            } else {
              console.log('Original Wrist Length not set. ');
            }
          } else {
            console.log('ROTATE_MEASURE_LEFT - Wrist keypoints not detected.');
          }
        } else if (
          step === MeasuringStep.TILT_MEASURE_LEFT ||
          step === MeasuringStep.TILT_MEASURE_RIGHT
        ) {
          if (
            leftWrist?.score >= minConfidence &&
            rightWrist?.score >= minConfidence &&
            wristVector
          ) {
            const dx = rightWrist.position.x - leftWrist.position.x;
            const invertedDy = -rightWrist.position.y + leftWrist.position.y; // y increases downward in image coordinates
            let angle = Math.atan2(invertedDy, dx) * (180 / Math.PI);
            angle = Math.abs(angle);
            if (angle > 90) {
              angle = 180 - angle;
            }
            measuredDataRef.current.push(angle);
            validDataCount += 1;

            // Log the angle
            console.log(
              `TILT_MEASURE_${
                step === MeasuringStep.TILT_MEASURE_LEFT ? 'LEFT' : 'RIGHT'
              } - Wrist Angle: ${angle.toFixed(2)} degrees`
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
                    if (setOriginalWristLength) {
                      setOriginalWristLength(avgData);
                    }
                    break;
                  case MeasuringStep.ROTATE_MEASURE_LEFT:
                    if (setLeftWaistRotationValue) {
                      setLeftWaistRotationValue(avgData);
                    }
                    break;
                  case MeasuringStep.ROTATE_MEASURE_RIGHT:
                    if (setRightWaistRotationValue) {
                      setRightWaistRotationValue(avgData);
                    }
                    break;
                  case MeasuringStep.TILT_MEASURE_LEFT:
                    if (setLeftWaistTiltValue) {
                      setLeftWaistTiltValue(avgData);
                    }
                    break;
                  case MeasuringStep.TILT_MEASURE_RIGHT:
                    if (setRightWaistTiltValue) {
                      setRightWaistTiltValue(avgData);
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
    setOriginalWristLength,
    setLeftWaistRotationValue,
    setRightWaistRotationValue,
    setLeftWaistTiltValue,
    setRightWaistTiltValue,
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
