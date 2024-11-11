import React, { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { useInverseCosine } from './UseInverseCosine'; // Import the custom hook

const ShoulderFront: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shoulderWidth, setShoulderWidth] = useState<number | null>(null);
  const [secondShoulderWidth, setSecondShoulderWidth] = useState<number | null>(
    null
  );
  const { result: rotationAngle, calculateInverseCosine } = useInverseCosine(); // Using the hook to calculate inverse cosine

  // Function to start webcam stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Start playing once the stream is set
        }
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  // Function to stop the webcam stream
  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop all video tracks
    }
  };

  // Set TensorFlow.js backend before loading the model
  const setBackend = async () => {
    try {
      await tf.setBackend('webgl');
      console.log('WebGL backend initialized successfully.');
    } catch (error) {
      console.warn('WebGL failed, falling back to CPU.');
      await tf.setBackend('cpu');
    }
    await tf.ready(); // Ensure TensorFlow.js is ready to use
    loadPosenetModel(); // After setting the backend, load the PoseNet model
  };

  // Load PoseNet model and start shoulder detection
  const loadPosenetModel = async () => {
    const net = await posenet.load();
    if (videoRef.current) {
      videoRef.current.width = 640;
      videoRef.current.height = 480;
      await startWebcam(); // Start webcam stream
      detectShoulders(net); // Start shoulder detection
    }
  };

  // Detect shoulders and calculate shoulder widths
  const detectShoulders = async (net: posenet.PoseNet) => {
    let widthUpdated = false;
    let secondWidthUpdated = false;

    if (videoRef.current) {
      const detectPose = async () => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
          const pose = await net.estimateSinglePose(videoRef.current, {
            flipHorizontal: false,
          });

          const leftShoulder = pose.keypoints.find(
            (point) => point.part === 'leftShoulder'
          );
          const rightShoulder = pose.keypoints.find(
            (point) => point.part === 'rightShoulder'
          );

          if (leftShoulder && rightShoulder) {
            const dx = rightShoulder.position.x - leftShoulder.position.x;
            const dy = rightShoulder.position.y - leftShoulder.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Update first shoulder width after 5 seconds
            if (!widthUpdated) {
              setTimeout(() => {
                setShoulderWidth(distance);
                widthUpdated = true;
              }, 5000);
            }

            // Update second shoulder width after another 5 seconds
            if (!secondWidthUpdated) {
              setTimeout(() => {
                setSecondShoulderWidth(distance);
                secondWidthUpdated = true;
              }, 10000);
            }
          }
        }
        requestAnimationFrame(detectPose);
      };

      detectPose();
    }
  };

  // Calculate inverse cosine of the ratio between secondShoulderWidth and shoulderWidth after both are set and stable
  useEffect(() => {
    if (shoulderWidth !== null && secondShoulderWidth !== null) {
      // Wait 10 seconds after both widths are set (for a total of about 20 seconds since start)
      const timer = setTimeout(() => {
        const ratio = secondShoulderWidth / shoulderWidth;
        calculateInverseCosine(ratio); // Calculate the angle based on the ratio
      }, 10000); // 10-second delay after widths are set

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [shoulderWidth, secondShoulderWidth, calculateInverseCosine]);

  // Initialize the backend and PoseNet model when the component mounts
  useEffect(() => {
    setBackend(); // Set the backend before loading the model

    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} autoPlay muted style={{ maxWidth: '100%' }} />
      {shoulderWidth !== null && (
        <div>
          <h3>Shoulder Width: {shoulderWidth.toFixed(2)} pixels</h3>
        </div>
      )}
      {secondShoulderWidth !== null && (
        <div>
          <h4>
            Second Shoulder Width: {secondShoulderWidth.toFixed(2)} pixels
          </h4>
        </div>
      )}
      {rotationAngle !== null && (
        <div>
          <h5>Rotation Angle: {rotationAngle.toFixed(2)}°</h5>
        </div>
      )}
    </div>
  );
};

export default ShoulderFront;
