import React, { createContext, useRef, useEffect, ReactNode } from 'react';

interface CameraContextProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const CameraContext = createContext<CameraContextProps | undefined>(
  undefined
);

interface CameraProviderProps {
  children: ReactNode;
}

export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          console.log('Webcam stream started.');
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
        // Optionally, handle camera access errors here (e.g., show a message to the user)
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        console.log('Webcam stream stopped.');
      }
    };
  }, []);

  return (
    <CameraContext.Provider value={{ videoRef }}>
      {children}
    </CameraContext.Provider>
  );
};
