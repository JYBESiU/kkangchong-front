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
  CORE_STRENGTH_MEASURE = 11,
  ARM_STRENGTH_READY = 12,
  ARM_STRENGTH_MEASURE = 13,
  FINISH = 14,
}

const readySteps = [
  MeasuringStep.MOVE_READY,
  MeasuringStep.ARM_READY,
  MeasuringStep.ROTATE_READY,
  MeasuringStep.TILT_READY,
  MeasuringStep.CORE_STRENGTH_READY,
  MeasuringStep.ARM_STRENGTH_READY,
];

const cameraMeasureSteps = [
  MeasuringStep.MOVE_MEASURE,
  MeasuringStep.ARM_MEASURE,
  MeasuringStep.ROTATE_MEASURE_LEFT,
  MeasuringStep.ROTATE_MEASURE_RIGHT,
  MeasuringStep.TILT_MEASURE_LEFT,
  MeasuringStep.TILT_MEASURE_RIGHT,
];

const timerMeasureSteps = [
  MeasuringStep.CORE_STRENGTH_MEASURE,
  MeasuringStep.ARM_STRENGTH_MEASURE,
];

export const isReadyStep = (step: MeasuringStep) => readySteps.includes(step);
export const isCameraMeasureStep = (step: MeasuringStep) =>
  cameraMeasureSteps.includes(step);
export const isTimerMeasureStep = (step: MeasuringStep) =>
  timerMeasureSteps.includes(step);
