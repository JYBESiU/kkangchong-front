import React from 'react';
import styled from '@emotion/styled';
import RecommendHeader from './recommend/RecommendHeader';
import RecommendMid, { RecommendMidProps } from './recommend/RecommendMid';
import RecommendBottom from './recommend/RecommendBottom';
import { useNavigate } from 'react-router-dom';

// type RecommendMidProps = {
//   title: string;
//   summary: string;
//   descriptionTitle: string;
//   descriptionContent: string;
//   effectsTitle: string;
//   effectsContent: string;
//   stars: number | null;
// };
// 전체 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 위, 중간, 아래 컴포넌트 배치 */
  width: 393px;
  height: 852px;
  gap: 20px;
  border: 1px solid black;
  box-sizing: border-box;

  overflow-y: auto; /* 세로 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 비활성화 */

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const RecommendSport = ({ recommendId }: { recommendId: string }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/result');
  };

  const handleBottomButtonClick = () => {
    navigate('/clubs');
  };

  return (
    <Container>
      {/* Header */}
      <RecommendHeader onBackClick={handleBackClick} />
      {/* Mid */}
      <RecommendMid {...helperFunction(recommendId)} />
      {/* Bottom */}
      <RecommendBottom onClick={handleBottomButtonClick} />
    </Container>
  );
};

export default RecommendSport;

const helperFunction = (recommendId: string) => {
  if (recommendId === 'basketball') {
    return {
      title: '휠체어 농구',
      summary:
        '휠체어 농구는 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 농구는 휠체어를 이용해 빠른 움직임과 전략적인 플레이로 진행되는 팀 스포츠로, 장애인과 비장애인이 함께 즐길 수 있는 경기입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '휠체어 농구에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else if (recommendId === 'dance') {
    return {
      title: '댄스 스포츠',
      summary:
        '댄스 스포츠는 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 댄스스포츠는 휠체어를 이용한 창의적이고 우아한 춤 동작으로, 비장애인 파트너와 함께하거나 휠체어 이용자끼리 춤을 추며 표현력과 체력을 동시에 향상시키는 스포츠입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '댄스 스포츠에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else if (recommendId === 'fencing') {
    return {
      title: '휠체어 펜싱',
      summary:
        '휠체어 펜싱은 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 펜싱은 고정된 휠체어에서 상체 움직임과 전략을 활용해 진행되는 스포츠로, 반사 신경과 기술을 겨루는 역동적인 경기입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '휠체어 펜싱에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else if (recommendId === 'rugby') {
    return {
      title: '휠체어 럭비',
      summary:
        '휠체어 럭비는 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 럭비는 사각형 코트에서 특별히 설계된 휠체어를 사용해 공을 골라인으로 운반하며 팀워크, 전략, 강렬한 몸싸움이 결합된 스포츠입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '휠체어 럭비에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else if (recommendId === 'pingpong') {
    return {
      title: '휠체어 탁구',
      summary:
        '휠체어 탁구는 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 탁구는 휠체어를 이용해 테이블 위에서 정교한 기술과 빠른 반사 신경으로 진행되는 역동적인 스포츠입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '휠체어 럭비에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else if (recommendId === 'athletics') {
    return {
      title: '육상',
      summary: '육상은 회원님의 부족한 점을 보완해줄 수 있는 맞춤운동이에요.',
      descriptionTitle: '운동 설명',
      descriptionContent:
        '휠체어 육상은 특수 설계된 레이싱 휠체어를 이용해 트랙이나 도로에서 스피드와 체력을 겨루는 스포츠입니다.',
      effectsTitle: '운동 효과',
      effectsContent: '휠체어 육상에 대한 운동 효과 (이미지 제작 예정)',
      stars: 5,
    } as RecommendMidProps;
  } else {
    return {
      title: '운동 제목',
      summary: '운동 요약',
      descriptionTitle: '운동 설명',
      descriptionContent: '운동 설명 내용',
      effectsTitle: '운동 효과',
      effectsContent: '운동 효과 내용',
      stars: 5,
    } as RecommendMidProps;
  }
};
