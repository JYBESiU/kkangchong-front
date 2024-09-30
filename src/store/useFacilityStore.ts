import { Facility } from 'types';
import { create } from 'zustand';

/**
 * facilities: 맵에 표시될 장소 목록
 * selectedFacility: 맵 또는 목록에서 선택된 장소
 */
type FacilityState = {
  facilities: Facility[];
  selectedFacility: Facility | null;
};

/**
 * setFacilities: 장소 검색 api 호출 후 업데이트
 * setSelectedFacility: 맵 마커 클릭 or 목록 클릭 시 업데이트
 */
type FacilityAction = {
  setFacilities: (facilities: Facility[]) => void;
  setSelectedFacility: (facility: Facility) => void;
};

export const useFacilityStore = create<FacilityState & FacilityAction>()(
  (set) => ({
    facilities: [],
    selectedFacility: null,

    setFacilities: (facilities) => set(() => ({ facilities })),
    setSelectedFacility: (selectedFacility) =>
      set(() => ({ selectedFacility })),
  })
);
