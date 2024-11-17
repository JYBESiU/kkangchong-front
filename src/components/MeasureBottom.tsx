import React from 'react';
import styled from '@emotion/styled';

// 전체 컨테이너 스타일
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 31px;
  gap: 10px;
  align-self: stretch;
  margin-bottom: 60px; /* 하단 여백 추가 */
`;

// 공통 박스 스타일
const Box = styled.div`
  width: 313px;
  height: 59px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

// 위쪽 박스 스타일
const TopBox = styled(Box)`
  background: var(--blue-3, #4a77ea);
`;

// 아래쪽 박스 스타일
const BottomBox = styled(Box)`
  background: var(--grey-2, #797982);
`;

// 박스 내부 텍스트 스타일
const BoxText = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MeasureBottom: React.FC = () => {
  return (
    <BottomContainer>
      <TopBox>
        <BoxText>추천 동호회 구경하기</BoxText>
      </TopBox>
      <BottomBox>
        <BoxText>재측정</BoxText>
      </BottomBox>
    </BottomContainer>
  );
};

export default MeasureBottom;
