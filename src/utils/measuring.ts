import { MeasureStorageData, MeasuringStep } from 'types';

const getSteps = (stepName: string) => {
  return Object.entries(MeasuringStep).reduce((acc, cur) => {
    if (cur[0].includes(stepName)) acc.push(cur[1] as MeasuringStep);
    return acc;
  }, [] as MeasuringStep[]);
};

const readySteps = getSteps('READY');
const cameraMeasureSteps = getSteps('MEASURE');
const timerMeasureSteps = getSteps('TIMER');

export const isReadyStep = (step: MeasuringStep) => readySteps.includes(step);
export const isCameraMeasureStep = (step: MeasuringStep) =>
  cameraMeasureSteps.includes(step);
export const isTimerMeasureStep = (step: MeasuringStep) =>
  timerMeasureSteps.includes(step);

export const isTimerReadyStep = (step: MeasuringStep) =>
  [MeasuringStep.CORE_STRENGTH_READY, MeasuringStep.PUNCH_READY].includes(step);

const MAX_ARM_ROTATION = 180;

const getArmRotationPercentage = (value: number) => {
  return (
    ((value > MAX_ARM_ROTATION ? MAX_ARM_ROTATION : value) / MAX_ARM_ROTATION) *
    100
  ).toFixed(0);
};

const MAX_ROTATION = 50;

const getWaistRotationPercentage = (value: number) => {
  return (
    ((value > MAX_ROTATION ? MAX_ROTATION : value) / MAX_ROTATION) *
    100
  ).toFixed(0);
};

const MAX_TILT = 45;

const getWaistTiltPercentage = (value: number) => {
  return (((value > MAX_TILT ? MAX_TILT : value) / MAX_TILT) * 100).toFixed(0);
};

const getCorePercentage = (value: number) => {
  return ((value / 60) * 100).toFixed(0);
};

const MAX_PUNCH = 40;
const getPunchPercentage = (value: number) => {
  return (((value > MAX_PUNCH ? MAX_PUNCH : value) / MAX_PUNCH) * 100).toFixed(
    0
  );
};

export const generateMeasureDataList = (data: MeasureStorageData) => [
  {
    leftText: '팔  ',
    topLeftText: '좌',
    topRightText: `${getArmRotationPercentage(data.leftArmRotationValue)}%`,
    bottomLeftText: '우',
    bottomRightText: `${getArmRotationPercentage(data.rightArmRotationValue)}%`,
  },
  {
    leftText: '허리',
    topLeftText: '좌',
    topRightText: `${getWaistRotationPercentage(data.leftRotationValue)}%`,
    bottomLeftText: '우',
    bottomRightText: `${getWaistRotationPercentage(data.rightRotationValue)}%`,
  },
  {
    leftText: '상체',
    topLeftText: '좌',
    topRightText: `${getWaistTiltPercentage(data.leftTiltValue)}%`,
    bottomLeftText: '우',
    bottomRightText: `${getWaistTiltPercentage(data.rightTiltValue)}%`,
  },
  {
    leftText: '근력',
    topLeftText: '코어',
    topRightText: `${getCorePercentage(data.coreDuration)}%`,
    bottomLeftText: '팔',
    bottomRightText: `${getPunchPercentage(data.punchCount)}%`,
  },
];
