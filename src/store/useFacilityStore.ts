import { Facility } from 'types';
import { create } from 'zustand';

interface FacilityState {
  facilities: Facility[];
  selectedFacility: Facility | null;
}

export const useFacilityStore = create<FacilityState>()((set) => ({
  facilities: [],
  selectedFacility: null,

  setFacilities: (data: Facility[]) => set(() => ({ facilities: data })),
  setSelectedFacility: (data: Facility) =>
    set(() => ({ selectedFacility: data })),
}));
