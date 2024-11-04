import { Subject, Level, DisabilityType } from 'types';

export const exerciseNames = [
  '유산소',
  '빙상 스포츠',
  '수상 스포츠',
  '레저 스포츠',
  '구기 스포츠',
  '웨이트 트레이닝',
];

export interface ExerciseItem {
  title: string;
  count: number;
}

export const exerciseItems: { [key: string]: ExerciseItem[] } = {
  유산소: [
    { title: '스크린 승마', count: 10 },
    { title: '휠리엑스', count: 8 },
    { title: '로잉머신', count: 12 },
    { title: '마라톤', count: 15 },
  ],
  '빙상 스포츠': [
    { title: '스케이팅', count: 5 },
    { title: '하키', count: 7 },
    { title: '컬링', count: 3 },
  ],
  '수상 스포츠': [
    { title: '수영', count: 20 },
    { title: '카약', count: 6 },
    { title: '서핑', count: 9 },
  ],
  '레저 스포츠': [
    { title: '암벽등반', count: 4 },
    { title: '스카이다이빙', count: 2 },
    { title: '하이킹', count: 10 },
  ],
  '구기 스포츠': [
    { title: '축구', count: 18 },
    { title: '농구', count: 14 },
    { title: '야구', count: 11 },
  ],
  '웨이트 트레이닝': [
    { title: '벤치프레스', count: 12 },
    { title: '스쿼트', count: 15 },
    { title: '데드리프트', count: 9 },
  ],
};

export const levels: Level[] = [
  { id: 1, name: '초급' },
  { id: 2, name: '중급' },
  { id: 3, name: '상급' },
  { id: 4, name: '마스터' },
];

export const disabilities: DisabilityType[] = [
  { id: 1, name: '장애종류 1' },
  { id: 2, name: '장애종류 2' },
  { id: 3, name: '장애종류 3' },
  { id: 4, name: '장애종류 4' },
  { id: 5, name: '장애종류 5' },
  { id: 6, name: '장애종류 6' },
  { id: 7, name: '장애종류 7' },
  { id: 8, name: '장애종류 8' },
];
