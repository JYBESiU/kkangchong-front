export enum MeasuringStep {
  MOVE_READY = 0,
  MOVE_MEASURE = 1,
  ARM_READY = 2,
  ARM_MEASURE = 3,
  ROTATE_READY = 4,
  ROTATE_MEASURE_FRONT = 5, //어깨에 손목을 올리고 정면을 바라보는 상태에서 손목 사이 각도 측정
  ROTATE_MEASURE_LEFT = 6,
  ROTATE_MEASURE_RIGHT = 7,
  TILT_READY = 8,
  TILT_MEASURE_LEFT = 9,
  TILT_MEASURE_RIGHT = 10,
  CORE_STRENGTH_READY = 11,
  CORE_STRENGTH_TIMER = 12,
  ARM_STRENGTH_READY = 13,
  ARM_STRENGTH_TIMER = 14,
  FINISH = 15,
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
