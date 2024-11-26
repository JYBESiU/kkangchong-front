import styled from '@emotion/styled';
import { colors } from 'utils/color';
import { Text } from './shared';

export interface ClubInfoProps {
  name: string;
  location?: string;
  time?: string;
  imageUrl?: string;
}

function ClubInfo({ name, location, time, imageUrl }: ClubInfoProps) {
  return (
    <ClubContainer>
      <ClubDetails>
        <ClubName>{name}</ClubName>
        <Text fontSize={14} color="grey2">
          {time}
        </Text>
        <Text fontSize={14} color="grey2">
          {location}
        </Text>
      </ClubDetails>
    </ClubContainer>
  );
}

export default ClubInfo;

const ClubContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 32px;
  margin-bottom: 20px;
  width: 100%;
  height: 74px;
`;

const ClubImage = styled.img`
  width: 84px;
  height: 74px;
  border-radius: 8px;
  margin-right: 12px;
  object-fit: cover;
`;

const ClubDetails = styled.div`
  height: 100%;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ClubName = styled.h3`
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin: 0;
`;
