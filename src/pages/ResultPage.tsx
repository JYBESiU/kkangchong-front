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
          score={getScore(recommendDummy, selectedSports)}
          reason={getReason(recommendDummy, selectedSports)}
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

const recommendDummy = {
  basketball_score: 5,
  basketball_reason:
    '사용자의 팔을 양옆으로 드는 능력이 약간 제한적이지만, 팔 근력이 양호하고 코어 힘이 안정적입니다. 허리 회전이 균형적이나 각도가 조금 낮아 몸통의 회전 속도에 약간의 제한이 있을 수 있습니다.',
  table_tennis_score: 4,
  table_tennis_reason:
    '몸통 회전 각도와 기울임이 적절하나, 빠른 회전 동작에서 다소 부족할 수 있습니다. 코어 힘이 비교적 안정적이어서 기본적인 탁구 동작 수행에는 문제가 없습니다.',
  rugby_score: 3,
  rugby_reason:
    '강한 몸통 조절과 다방향 움직임이 필요한 럭비에 비해 허리 회전 각도가 낮고 코어 힘이 다소 부족합니다. 상체의 안정성은 어느 정도 유지되지만, 격한 움직임에서 어려움이 예상됩니다.',
  fencing_score: 2,
  fencing_reason:
    '팔 근력은 적절하고 허리 회전도 가능하지만, 앉은 자세에서의 빠른 균형 조절 능력이 약간 부족할 수 있습니다. 방향 전환 시 안정성을 유지하는 데 약간의 제한이 있을 것입니다.',
  dance_sports_score: 1,
  dance_sports_reason:
    '골반과 몸통의 움직임이 적절하며, 기본적인 코어 힘이 안정적입니다. 빠른 회전 동작에서 약간의 제한이 있을 수 있지만, 대부분의 동작을 수행하는 데 무리가 없습니다.',
  athletics_score: 0,
  athletics_reason:
    '상지 기능과 코어 힘이 적절하여 휠체어 조작에 유리합니다. 직선 주행에서 안정성이 있으며, 몸통의 회전이 자유롭지는 않지만 기본적인 추진력 생성에 무리가 없습니다.',
};

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

const getScore = (recommend: RecommendResult, sports: RecommendSports) => {
  switch (sports) {
    case RecommendSports.ATHLETICS:
      return recommend.athletics_score;
    case RecommendSports.BASKETBALL:
      return recommend.basketball_score;
    case RecommendSports.DANCING_SPORTS:
      return recommend.dance_sports_score;
    case RecommendSports.FENCING:
      return recommend.fencing_score;
    case RecommendSports.RUGBY:
      return recommend.rugby_score;
    case RecommendSports.TABLE_TENNIS:
      return recommend.table_tennis_score;
  }
};

const getReason = (recommend: RecommendResult, sports: RecommendSports) => {
  switch (sports) {
    case RecommendSports.ATHLETICS:
      return recommend.athletics_reason;
    case RecommendSports.BASKETBALL:
      return recommend.basketball_reason;
    case RecommendSports.DANCING_SPORTS:
      return recommend.dance_sports_reason;
    case RecommendSports.FENCING:
      return recommend.fencing_reason;
    case RecommendSports.RUGBY:
      return recommend.rugby_reason;
    case RecommendSports.TABLE_TENNIS:
      return recommend.table_tennis_reason;
  }
};
