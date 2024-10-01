import { PanelHeader } from 'components/shared';

export interface FacilityInfoProps {}

function FacilityInfo({}: FacilityInfoProps) {
  return (
    <div>
      <PanelHeader title={'장소 정보'} />
      FacilityInfo
    </div>
  );
}

export default FacilityInfo;
