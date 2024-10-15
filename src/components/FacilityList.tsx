import { Facility } from 'types';
import FacilityCard from './FacilityCard';

export interface FacilityListProps {}

const facilityName: Facility[] = [
  {
    id: 1,
    x: 36,
    y: 130,
    name: '깡총 체육관',
    phone: '042-111-1111',
    roadAddressName: '대전광역시 유성구 대학로 291',
    subjectIds: [1, 2],
    levelIds: [1, 2],
    disabilityTypeIds: [1],
    imgUrls: [
      'https://cdn.daejonilbo.com/news/photo/201411/1144857_168245_3653.jpg',
    ],
  },
  {
    id: 2,
    x: 36.1,
    y: 130.1,
    name: '깡총 복지관',
    phone: '042-222-2222',
    roadAddressName: '대전광역시 유성구 대학로 292',
    subjectIds: [2],
    levelIds: [2, 3],
    disabilityTypeIds: [2],
    imgUrls: [],
  },
];

function FacilityList({}: FacilityListProps) {
  return (
    <div>
      {facilityName.map((facility) => (
        <FacilityCard key={facility.id} facility={facility} />
      ))}
    </div>
  );
}

export default FacilityList;
