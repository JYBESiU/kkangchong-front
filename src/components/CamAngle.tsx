import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';

const App = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(
    null
  );
  const [angle, setAngle] = useState<string | null>(null);

  useEffect(() => {
    const loadDetector = async () => {
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const loadedDetector = await poseDetection.createDetector(
        model,
        detectorConfig
      );
      setDetector(loadedDetector);
    };

    tf.ready().then(loadDetector);
  }, []);

  useEffect(() => {
    if (detector) {
      const interval = setInterval(() => {
        detectPose();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [detector]);

  const detectPose = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      detector
    ) {
      const video = webcamRef.current.video;
      const poses = await detector.estimatePoses(video);

      if (poses.length > 0) {
        const pose = poses[0];
        calculateUpperBodyAngle(pose);
      }
    }
  };

  // 상체 기울기 각도를 계산하는 함수
  const calculateUpperBodyAngle = (pose: poseDetection.Pose) => {
    const keypoints = pose.keypoints;

    const leftShoulder = keypoints.find(
      (point) => point.name === 'left_shoulder'
    );
    const rightShoulder = keypoints.find(
      (point) => point.name === 'right_shoulder'
    );
    const leftHip = keypoints.find((point) => point.name === 'left_hip');
    const rightHip = keypoints.find((point) => point.name === 'right_hip');

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      // 어깨와 엉덩이의 중심을 계산
      const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
      const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
      const hipCenterX = (leftHip.x + rightHip.x) / 2;
      const hipCenterY = (leftHip.y + rightHip.y) / 2;

      // 상체 기울기 각도 계산 (라디안에서 각도로 변환)
      const angle = Math.atan2(
        hipCenterY - shoulderCenterY,
        hipCenterX - shoulderCenterX
      );
      const degree = Math.abs((angle * 180.0) / Math.PI); // 절댓값을 사용하여 기울기 각도를 양수로 만듦
      setAngle(degree.toFixed(2));
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Webcam Upper Body Tilt Detection</h1>
      <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
      {angle && <h2>Upper Body Tilt Angle: {angle}°</h2>}
    </div>
  );
};

export default App;
