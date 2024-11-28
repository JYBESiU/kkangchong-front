export interface MeasureStorageData {
  leftArmRotationValue: number;
  rightArmRotationValue: number;
  leftWaistRotationValue: number;
  rightWaistRotationValue: number;
  leftWaistTiltValue: number;
  rightWaistTiltValue: number;
  coreDuration: number;
  punchCount: number;
}

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
  PUNCH_READY = 13,
  PUNCH_TIMER = 14,
  FINISH = 15,
}
