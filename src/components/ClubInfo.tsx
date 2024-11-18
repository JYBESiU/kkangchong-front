import styled from '@emotion/styled';

export interface ClubInfoProps {
  name: string;
  location?: string;
  time?: string;
  imageUrl?: string;
}

function ClubInfo({ name, location, time, imageUrl }: ClubInfoProps) {
  return (
    <ClubContainer>
      <ClubImage src={imageUrl} alt={name} />
      <ClubDetails>
        <ClubName>{name}</ClubName>
        <ClubDescription>{time}</ClubDescription>
        <ClubInfoText>{location} ·</ClubInfoText>
      </ClubDetails>
    </ClubContainer>
  );
}

export default ClubInfo;

const ClubContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const ClubImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 16px;
`;

const ClubDetails = styled.div``;

const ClubName = styled.h3`
  font-size: 16px;
  margin: 0 0 4px 0;
`;

const ClubDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 8px 0;
`;

const ClubInfoText = styled.p`
  font-size: 12px;
  color: #777;
  margin: 0;
`;
