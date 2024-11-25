import React, { createContext, useState, ReactNode } from 'react';

interface MeasurementContextProps {
  leftArmRotationValue: number | null;
  setLeftArmRotationValue: (value: number | null) => void;
  rightArmRotationValue: number | null;
  setRightArmRotationValue: (value: number | null) => void;
  armRotationValue: number | null;
  setArmRotationValue: (value: number | null) => void;
  originalWristLength: number | null;
  setOriginalWristLength: (value: number | null) => void;
  leftWaistRotationValue: number | null;
  setLeftWaistRotationValue: (value: number | null) => void;
  rightWaistRotationValue: number | null;
  setRightWaistRotationValue: (value: number | null) => void;
  leftWaistTiltValue: number | null;
  setLeftWaistTiltValue: (value: number | null) => void;
  rightWaistTiltValue: number | null;
  setRightWaistTiltValue: (value: number | null) => void;
}

export const MeasurementContext = createContext<
  MeasurementContextProps | undefined
>(undefined);

export const MeasurementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [leftArmRotationValue, setLeftArmRotationValue] = useState<
    number | null
  >(null);
  const [rightArmRotationValue, setRightArmRotationValue] = useState<
    number | null
  >(null);
  const [armRotationValue, setArmRotationValue] = useState<number | null>(null);
  const [originalWristLength, setOriginalWristLength] = useState<number | null>(
    null
  );
  const [leftWaistRotationValue, setLeftWaistRotationValue] = useState<
    number | null
  >(null);
  const [rightWaistRotationValue, setRightWaistRotationValue] = useState<
    number | null
  >(null);
  const [leftWaistTiltValue, setLeftWaistTiltValue] = useState<number | null>(
    null
  );
  const [rightWaistTiltValue, setRightWaistTiltValue] = useState<number | null>(
    null
  );

  return (
    <MeasurementContext.Provider
      value={{
        leftArmRotationValue,
        setLeftArmRotationValue,
        rightArmRotationValue,
        setRightArmRotationValue,
        armRotationValue,
        setArmRotationValue,
        originalWristLength,
        setOriginalWristLength,
        leftWaistRotationValue,
        setLeftWaistRotationValue,
        rightWaistRotationValue,
        setRightWaistRotationValue,
        leftWaistTiltValue,
        setLeftWaistTiltValue,
        rightWaistTiltValue,
        setRightWaistTiltValue,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};
