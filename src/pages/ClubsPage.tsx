import styled from '@emotion/styled';
import axios from 'axios';
import ClubInfo from 'components/ClubInfo';
import { Text } from 'components/shared';
import Tag from 'components/Tag';
import { useEffect, useState } from 'react';
import { Club, RecommendSports } from 'types';
import { getFromLocalStorage, recommendKey } from 'utils/storage';

export interface ClubsPageProps {}

function ClubsPage({}: ClubsPageProps) {
  const sportsList = getFromLocalStorage<RecommendSports[]>(recommendKey) || [];
  const [selectedSports, setSelectedSports] = useState(sportsList[0]);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const response = await axios.get<Club[]>(`/club/${selectedSports}`);

      setClubs(response.data);
    };

    fetchClubs();
  }, [selectedSports]);

  return (
    <Root isCenter={sportsList.length === 0}>
      {sportsList.length > 0 ? (
        <>
          <TagContainer>
            {sportsList.map((sports) => (
              <Tag
                key={sports}
                label={sports}
                isActive={selectedSports === sports}
                onClick={() => setSelectedSports(sports)}
              />
            ))}
          </TagContainer>
          <ClubList>
            {clubs.map((club) => (
              <ClubInfo
                key={club.id}
                name={club.club_name}
                location={club.location}
                time={club.active_time}
                imageUrl={club.imageUrl}
              />
            ))}
          </ClubList>
        </>
      ) : (
        <Text>먼저 신체 능력 측정이 필요합니다.</Text>
      )}
    </Root>
  );
}

export default ClubsPage;

const Root = styled.div<{ isCenter: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 393px;
  ${({ isCenter }) =>
    isCenter && 'justify-content: center; align-items: center; height: 100%;'}
`;

const ClubList = styled.div`
  flex: 1;
  overflow: hidden;
  padding-top: 8px;
`;

const TagContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px 32px;
  background-color: white;
`;
