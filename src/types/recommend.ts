export type RecommendResult = {
  basketball_score: number;
  basketball_reason: string;
  table_tennis_score: number;
  table_tennis_reason: string;
  rugby_score: number;
  rugby_reason: string;
  fencing_score: number;
  fencing_reason: string;
  dance_sports_score: number;
  dance_sports_reason: string;
  athletics_score: number;
  athletics_reason: string;
};

export enum RecommendSports {
  BASKETBALL = '휠체어 농구',
  TABLE_TENNIS = '휠체어 탁구',
  RUGBY = '휠체어 럭비',
  FENCING = '휠체어 펜싱',
  DANCING_SPORTS = '댄스스포츠',
  ATHLETICS = '육상',
}

export const changeSportName = (originName: RecommendSports) => {
  switch (originName) {
    case RecommendSports.BASKETBALL:
      return '농구';
    case RecommendSports.TABLE_TENNIS:
      return '탁구';
    case RecommendSports.RUGBY:
      return '럭비';
    case RecommendSports.FENCING:
      return '펜싱';
    case RecommendSports.DANCING_SPORTS:
      return '댄스 스포츠';
    case RecommendSports.ATHLETICS:
      return '육상';
    default:
      return '';
  }
};
