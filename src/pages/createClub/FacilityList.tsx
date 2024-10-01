import { PanelHeader } from 'components/shared';

export interface FacilityListProps {}

function FacilityList({}: FacilityListProps) {
  return (
    <div>
      <PanelHeader title={'장소 목록'} />
      FacilityList
    </div>
  );
}

export default FacilityList;
