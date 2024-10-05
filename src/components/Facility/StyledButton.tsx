import React, { useState } from 'react';
import styled from '@emotion/styled';
import { subjects, levels, disabilities } from './types-for-FacilitySearch';
import KakaoMap from 'components/KakaoMap';

const ButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled.div<{ isActive: boolean }>`
  width: 150px;
  height: 100%;
  background: ${({ isActive }) => (isActive ? '#1B1B1B' : '#626262')};
  cursor: pointer;
`;

const UnderBox = styled.div`
  width: 100%;
  height: 50px;
  background: #626262;
  margin-top: 10px;
`;
const GridContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr); /* For four boxes */
  margin-top: 20px;
`;

const EightGridContainer = styled(GridContainer)`
  grid-template-columns: repeat(8, 1fr); /* For eight boxes */
  margin-top: 10px;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  background: #626262;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  word-wrap: break-word;
`;
const DescriptionText = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 8px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 12px;
  word-wrap: break-word;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const LeftPanel = styled.div`
  width: 50%;
  height: 100%;
  background: #d9d9d9;
  padding: 20px;
`;

const RightPanel = styled.div`
  width: 50%;
  height: 100%;
`;

const PageContent = ({ activeKey }: { activeKey: number | null }) => {
  switch (activeKey) {
    case 1:
      return <div>Page 1 Content</div>;
    case 2:
      return <div>Page 2 Content</div>;
    case 3:
      return <div>Page 3 Content</div>;
    default:
      return <div>Select a page</div>;
  }
};
const NextPage = ({
  selectedItems,
  onBack,
}: {
  selectedItems: number[];
  onBack: () => void;
}) => {
  return (
    <div>
      <h2>Next Page</h2>
      <p>Selected Items: {selectedItems.join(', ')}</p>
      <button onClick={onBack}>Go Back</button>
    </div>
  );
};
const MainPage: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  const handleItemClick = (id: number) => {
    setSelectedItems((prev) => [...prev, id]);
  };

  const handleNextPage = () => {
    setIsNextPage(true);
  };

  const handleBack = () => {
    setIsNextPage(false);
  };

  if (isNextPage) {
    return <NextPage selectedItems={selectedItems} onBack={handleBack} />;
  }

  return (
    <MainContainer>
      <LeftPanel>
        {/* Button Section */}
        <ButtonContainer>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <StyledButton
              key={id}
              isActive={activeButton === id}
              onClick={() => handleButtonClick(id)}
            />
          ))}
        </ButtonContainer>

        {/* Conditionally render the box under */}
        {activeButton !== null && <UnderBox />}

        {/* Render dynamic content based on active button */}
        <PageContent activeKey={activeButton} />

        {/* Four boxes under */}
        <GridContainer>
          {levels.map((level) => (
            <ContentBox
              key={level.id}
              onClick={() => handleItemClick(level.id + subjects.length)}
            >
              {level.name}
              <DescriptionText>
                {level.id === 1 && '운동을 거의<br/>해본 적이 없는 사람'}
                {level.id === 2 &&
                  '기초적인 운동 방법을<br/>숙지하고 있고 3개월<br/>이상의 경력이 있는 사람'}
                {level.id === 3 &&
                  '1년 이상 해본 운동을<br/>한 경험이 있으며 실내 내용<br/>또한 숙지하고 있음'}
                {level.id === 4 &&
                  '대회 준비 / 선수 준비를 위해<br/>전문적으로 운동을 하는 사람'}
              </DescriptionText>
            </ContentBox>
          ))}
        </GridContainer>

        {/* Eight boxes under */}
        <EightGridContainer>
          {disabilities.map((disability) => (
            <ContentBox
              key={disability.id}
              onClick={() =>
                handleItemClick(disability.id + subjects.length + levels.length)
              }
            >
              {disability.name}
            </ContentBox>
          ))}
        </EightGridContainer>

        {/* Very last box for navigating */}
        <ContentBox onClick={handleNextPage}>장소 검색</ContentBox>
      </LeftPanel>
      <RightPanel>
        <KakaoMap /> {/* For kakomap implementation*/}
      </RightPanel>
    </MainContainer>
  );
};

export default MainPage;
