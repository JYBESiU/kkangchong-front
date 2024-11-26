import styled from '@emotion/styled';
import axios from 'axios';
import MeasureResult from 'components/MeasureResult';
import RecommendSport from 'components/RecommendSport';
import { Text } from 'components/shared';
import { useEffect, useState } from 'react';
import { RecommendResult, RecommendSports } from 'types';
import { colors } from 'utils/color';
import { getFromLocalStorage, measureKey } from 'utils/storage';

export interface ResultPageProps {}

function ResultPage({}: ResultPageProps) {
  const [isLoadingByTimer, setIsLoadingByTimer] = useState(true);
  const [isLoadingByReq, setIsLoadingByReq] = useState(false);
  const [selectedSports, setSelectedSports] = useState<RecommendSports | null>(
    null
  );
  const isLoading = isLoadingByTimer || isLoadingByReq;

  const [recommendResult, setRecommendResult] =
    useState<RecommendResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingByTimer(false);
    }, 5000);

    const fetchRecommend = async () => {
      setIsLoadingByReq(true);

      const {
        leftArmRotationValue,
        rightArmRotationValue,
        leftWaistRotationValue,
        rightWaistRotationValue,
        leftWaistTiltValue,
        rightWaistTiltValue,
        coreDuration,
        punchCount,
      } = getFromLocalStorage(measureKey);
      const { data } = await axios.post<RecommendResult>('/recommend', {
        arm_angle: (leftArmRotationValue + rightArmRotationValue) / 2,
        torso_left_angle: leftWaistRotationValue,
        torso_right_angle: rightWaistRotationValue,
        body_left_tilt: leftWaistTiltValue,
        body_right_tilt: rightWaistTiltValue,
        core_strength_time: coreDuration,
        punch_count: punchCount,
      });

      setRecommendResult(data);
      setIsLoadingByReq(false);
    };

    fetchRecommend();

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (name: RecommendSports) => () => {
    setSelectedSports(name);
  };

  return (
    <Root>
      {isLoading ? (
        <Loading>
          <img src="/images/wheelchair.png" width={130} height={130} />
          <Text textAlign="center">
            신체 데이터를 바탕으로
            <br /> 운동을 선정하고 있어요
            <br /> 잠시만 기다려주세요
          </Text>
        </Loading>
      ) : selectedSports ? (
        <RecommendSport
          sports={selectedSports}
          score={getScore(recommendResult, selectedSports)}
          reason={getReason(recommendResult, selectedSports)}
          explanation={explanations[selectedSports]}
          youtubeLink={youtubeLinks[selectedSports]}
          handleBackClick={() => setSelectedSports(null)}
        />
      ) : (
        <MeasureResult
          recommend={recommendResult!}
          handleCardClick={handleCardClick}
        />
      )}
    </Root>
  );
}

export default ResultPage;

const Root = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 400px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.blue1};
  gap: 30px;
`;

const explanations = {
  [RecommendSports.ATHLETICS]:
    '휠체어 육상은 특수 설계된 레이싱 휠체어를 이용해 트랙이나 도로에서 스피드와 체력을 겨루는 스포츠입니다.',
  [RecommendSports.BASKETBALL]:
    '휠체어 농구는 휠체어를 이용해 빠른 움직임과 전략적인 플레이로 진행되는 팀 스포츠로, 장애인과 비장애인이 함께 즐길 수 있는 경기입니다.',
  [RecommendSports.DANCING_SPORTS]:
    '휠체어 댄스스포츠는 휠체어를 이용한 창의적이고 우아한 춤 동작으로, 비장애인 파트너와 함께하거나 휠체어 이용자끼리 춤을 추며 표현력과 체력을 동시에 향상시키는 스포츠입니다.',
  [RecommendSports.FENCING]:
    '휠체어 펜싱은 고정된 휠체어에서 상체 움직임과 전략을 활용해 진행되는 스포츠로, 반사 신경과 기술을 겨루는 역동적인 경기입니다.',
  [RecommendSports.RUGBY]:
    '휠체어 럭비는 사각형 코트에서 특별히 설계된 휠체어를 사용해 공을 골라인으로 운반하며 팀워크, 전략, 강렬한 몸싸움이 결합된 스포츠입니다.',
  [RecommendSports.TABLE_TENNIS]:
    '휠체어 탁구는 휠체어를 이용해 테이블 위에서 정교한 기술과 빠른 반사 신경으로 진행되는 역동적인 스포츠입니다.',
};

const youtubeLinks = {
  [RecommendSports.ATHLETICS]: 'J5wh8dyl1Vg',
  [RecommendSports.BASKETBALL]: 'LLK3AJQXnZw',
  [RecommendSports.DANCING_SPORTS]: 'EEZ-7emCGCo',
  [RecommendSports.FENCING]: 'JgHbuhI_TCE',
  [RecommendSports.RUGBY]: 'Q52WtlK-qqg',
  [RecommendSports.TABLE_TENNIS]: 'd7CMGfsObBk',
};

const getScore = (
  recommend: RecommendResult | null,
  sports: RecommendSports
) => {
  switch (sports) {
    case null:
      return 0;
    case RecommendSports.ATHLETICS:
      return recommend?.athletics_score;
    case RecommendSports.BASKETBALL:
      return recommend?.basketball_score;
    case RecommendSports.DANCING_SPORTS:
      return recommend?.dance_sports_score;
    case RecommendSports.FENCING:
      return recommend?.fencing_score;
    case RecommendSports.RUGBY:
      return recommend?.rugby_score;
    case RecommendSports.TABLE_TENNIS:
      return recommend?.table_tennis_score;
  }
};

const getReason = (
  recommend: RecommendResult | null,
  sports: RecommendSports
) => {
  switch (sports) {
    case null:
      return '';
    case RecommendSports.ATHLETICS:
      return recommend?.athletics_reason;
    case RecommendSports.BASKETBALL:
      return recommend?.basketball_reason;
    case RecommendSports.DANCING_SPORTS:
      return recommend?.dance_sports_reason;
    case RecommendSports.FENCING:
      return recommend?.fencing_reason;
    case RecommendSports.RUGBY:
      return recommend?.rugby_reason;
    case RecommendSports.TABLE_TENNIS:
      return recommend?.table_tennis_reason;
  }
};
