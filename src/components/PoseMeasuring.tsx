import { useContext, useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Text } from './shared';
import { isCameraMeasureStep, MeasuringStep } from 'utils/measuringStep';
import styled from '@emotion/styled';
import * as posenet from '@tensorflow-models/posenet';
import { MeasurementContext } from './MeasurementContext';

const Root = styled.div`
  position: relative;
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

  useEffect(() => {
    setTimerCount(step === MeasuringStep.MOVE_MEASURE ? 15 : 5);
    setIsChecking(false);
    setValidDataCount(0);
    measuredDataRef.current = [];
    measuredSecondRef.current = [];
  }, [step]);

  const [isChecking, setIsChecking] = useState(false);
  const [validDataCount, setValidDataCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const latestPoseRef = useRef<posenet.Pose | null>(null);

  const measuredDataRef = useRef<number[]>([]);
  const measuredSecondRef = useRef<number[]>([]);

  // Maximum number of attempts to prevent infinite loops
  const MAX_ATTEMPTS = 30;

  useEffect(() => {
    setTimerCount(step === MeasuringStep.MOVE_MEASURE ? 15 : 5);
    setIsChecking(false);
    setValidDataCount(0);
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
    let net: posenet.PoseNet | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!isChecking) {
      return;
    }

    let checkCounter = 0;
    measuredDataRef.current = [];
    measuredSecondRef.current = [];

    // Start webcam stream
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
        onComplete(0); // Exit if webcam access fails
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

        let anyMeasurementTaken = false;
        if (
          isCameraMeasureStep(step) &&
          measuredDataRef.current.length > validDataCount
        ) {
          if (
            step === MeasuringStep.ARM_MEASURE &&
            measuredSecondRef.current.length > validDataCount
          ) {
            anyMeasurementTaken = true;
          } else {
            anyMeasurementTaken = true;
          }
        }

        if (anyMeasurementTaken) {
          checkCounter += 1;
          setValidDataCount((prev) => prev + 1);
          console.log(`Measurement count: ${checkCounter}`);
        } else {
          console.log('No valid measurements taken in this interval.');
        }

        // After collecting 10 measurements or reaching max attempts, calculate averages
        if (checkCounter >= 10 || validDataCount >= MAX_ATTEMPTS) {
          console.log(
            'Reached 10 measurements or max attempts. Calculating averages...'
          );
          if (intervalId) {
            clearInterval(intervalId);
          }
          setIsChecking(false);
          setValidDataCount(0);

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
    <Root>
      <Text fontWeight={700}>{getNotice(step)}</Text>
      <Text fontSize={80} fontWeight={700}>
        {timerCount}
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
      return `어깨와 팔꿈치가 보이도록 팔을 양 옆으로 최대한 드세요`;
    case MeasuringStep.ROTATE_MEASURE_FRONT:
      return `양 손을 어깨에 올리고 정면을 바라보세요`;
    case MeasuringStep.ROTATE_MEASURE_LEFT:
      return `양 손을 어깨에 올리고 허리를 왼쪽으로 돌리세요`;
    case MeasuringStep.ROTATE_MEASURE_RIGHT:
      return `양 손을 어깨에 올리고 허리를 오른쪽으로 돌리세요`;
    case MeasuringStep.TILT_MEASURE_LEFT:
      return `상체를 왼쪽으로 기울이세요`;
    case MeasuringStep.TILT_MEASURE_RIGHT:
      return `상체를 오른쪽으로 기울이세요`;
    default:
      return `지시에 따라 주세요`;
  }
};
