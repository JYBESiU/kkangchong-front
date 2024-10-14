import styled from '@emotion/styled';
import React from 'react';
//import { subjects, levels, disabilities } from './types-for-FacilitySearch';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
`;

const Section = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const Header = styled.div`
  width: 600px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  color: #222325;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
`;

const Subtitle = styled.div`
  color: #4a77ea;
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const ItemContainer = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
`;

const Item = styled.div`
  height: 59px;
  padding: 18px 29px;
  background: white;
  border-radius: 8px;
  border: 1px #e9e9e9 solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ItemText = styled.div`
  text-align: center;
  color: #222325;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const SummaryContainer = styled.div`
  align-self: stretch;
  height: 140px;
  padding: 30px;
  background: #f7f8fc;
  border-radius: 8px;
  overflow: hidden;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
`;

const SummaryText = styled.div`
  color: #222325;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const ButtonContainer = styled.div`
  width: 600px;
  height: 90px;
  padding: 30px 120px;
  box-shadow: 0px 4px 4px rgba(185, 192, 211, 0.08);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.div`
  width: 600px;
  height: 90px;
  background: #4a77ea;
  border-radius: 8px;
`;

const ButtonText = styled.div`
  width: 359px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <Section>
        <Header>
          <Title>운동 종목</Title>
          <Subtitle>동호회를 만들 운동 종목을 선택하세요</Subtitle>
        </Header>
        <ItemContainer>
          {[
            '유산소',
            '빙상 스포츠',
            '수상 스포츠',
            '레저 스포츠',
            '구기 스포츠',
            '웨이트 트레이닝',
          ].map((sport) => (
            <Item key={sport}>
              <ItemText>{sport}</ItemText>
            </Item>
          ))}
        </ItemContainer>
        <SummaryContainer>
          {['스크린 승마', '휠리엑스', '로잉머신', '마라톤'].map(
            (activity, index) => (
              <div key={index}>
                <SummaryText>{activity} </SummaryText>
                <Subtitle>(10)</Subtitle>
              </div>
            )
          )}
        </SummaryContainer>
      </Section>
      <Section>
        <Header>
          <Title>운동 등급</Title>
          <Subtitle>운동의 난이도를 선택하세요</Subtitle>
        </Header>
        <ItemContainer>
          {['초급', '중급', '상급', '마스터'].map((level, index) => (
            <Item key={index}>
              <ItemText>{level}</ItemText>
              <SummaryText>
                {level === '초급'
                  ? '운동을 거의 해본 적이 없는 사람'
                  : level === '중급'
                    ? '3개월 이상의 경험이 있는 사람'
                    : level === '상급'
                      ? '1년 이상의 경험이 있는 사람'
                      : '대회를 준비하는 선수'}
              </SummaryText>
            </Item>
          ))}
        </ItemContainer>
      </Section>
      <Section>
        <Header>
          <Title>모집 동호인 분류</Title>
          <Subtitle>최소 1개 이상 선택하세요</Subtitle>
        </Header>
        <ItemContainer>
          {[
            '20대 이하',
            '상지장애 전체',
            '하지장애 전체',
            '30대',
            '상지장애 심각',
            '하지장애 심각',
            '40대',
            '상지장애 보통',
            '하지장애 보통',
            '50대 이상',
            '상지장애 양호',
            '하지장애 양호',
          ].map((category, index) => (
            <Item key={index}>
              <ItemText>{category}</ItemText>
            </Item>
          ))}
        </ItemContainer>
      </Section>
      <ButtonContainer>
        <Button />
        <ButtonText>장소 검색</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default MainPage;
