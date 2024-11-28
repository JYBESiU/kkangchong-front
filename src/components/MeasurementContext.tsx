import React, { createContext, useState, ReactNode } from 'react';

interface MeasurementContextProps {
  leftArmRotationValue: number | null;
  setLeftArmRotationValue: (value: number | null) => void;
  rightArmRotationValue: number | null;
  setRightArmRotationValue: (value: number | null) => void;
  armRotationValue: number | null;
  setArmRotationValue: (value: number | null) => void;
  originalShoulderLength: number | null;
  setOriginalShoulderLength: (value: number | null) => void;
  leftRotationValue: number | null;
  setLeftRotationValue: (value: number | null) => void;
  rightRotationValue: number | null;
  setRightRotationValue: (value: number | null) => void;
  leftTiltValue: number | null;
  setLeftTiltValue: (value: number | null) => void;
  rightTiltValue: number | null;
  setRightTiltValue: (value: number | null) => void;
  coreDuration: number | null;
  setCoreDuration: (value: number | null) => void;
  punchCount: number | null;
  setPunchCount: (value: number | null) => void;
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
  const [coreDuration, setCoreDuration] = useState<number | null>(null);
  const [punchCount, setPunchCount] = useState<number | null>(null);

  return (
    <MeasurementContext.Provider
      value={{
        leftArmRotationValue,
        setLeftArmRotationValue,
        rightArmRotationValue,
        setRightArmRotationValue,
        armRotationValue,
        setArmRotationValue,
        originalShoulderLength: originalWristLength,
        setOriginalShoulderLength: setOriginalWristLength,
        leftRotationValue: leftWaistRotationValue,
        setLeftRotationValue: setLeftWaistRotationValue,
        rightRotationValue: rightWaistRotationValue,
        setRightRotationValue: setRightWaistRotationValue,
        leftTiltValue: leftWaistTiltValue,
        setLeftTiltValue: setLeftWaistTiltValue,
        rightTiltValue: rightWaistTiltValue,
        setRightTiltValue: setRightWaistTiltValue,
        coreDuration,
        setCoreDuration,
        punchCount,
        setPunchCount,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
};
