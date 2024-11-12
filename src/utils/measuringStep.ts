export enum MeasuringStep {
  MOVE_READY = 0,
  MOVE_MEASURE = 1,
  ARM_READY = 2,
  ARM_MEASURE = 3,
  ROTATE_READY = 4,
  ROTATE_MEASURE_LEFT = 5,
  ROTATE_MEASURE_RIGHT = 6,
  TILT_READY = 7,
  TILT_MEASURE_LEFT = 8,
  TILT_MEASURE_RIGHT = 9,
  CORE_STRENGTH_READY = 10,
  CORE_STRENGTH_TIMER = 11,
  ARM_STRENGTH_READY = 12,
  ARM_STRENGTH_TIMER = 13,
  FINISH = 14,
}

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
