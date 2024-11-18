import styled from '@emotion/styled';
import axios from 'axios';
import ClubInfo from 'components/ClubInfo';
import Tag from 'components/Tag';
import { useEffect, useState } from 'react';
import { Club } from 'types';

export interface ClubsPageProps {}

function ClubsPage({}: ClubsPageProps) {
  const [selectedSports, setSelectedSports] = useState('농구');
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const response = await axios.get<Club[]>(`/club/${selectedSports}`);

      setClubs(response.data);
    };

    fetchClubs();
  }, [selectedSports]);

  return (
    <Root>
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
            key={club.club_name}
            name={club.club_name}
            location={club.location}
            time={club.active_time}
            imageUrl={club.imageUrl}
          />
        ))}
      </ClubList>
    </Root>
  );
}

export default ClubsPage;

const sportsList = ['농구', '럭비', '탁구', '펜싱', '육상', '댄스스포츠'];

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ClubList = styled.div`
  flex: 1;
  overflow: hidden;
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
